const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

// read form data
app.use(express.urlencoded({ extended: true }));

// serve CSS
app.use(express.static(path.join(__dirname, "public")));

// very small currency list (easy for first-year)
const currencies = ["CAD", "USD", "EUR", "GBP", "INR", "AUD", "JPY"];

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderIndexHTML() {
  const options = currencies
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  // Load HTML file and inject dropdown options
  const fs = require("fs");
  let html = fs.readFileSync(path.join(__dirname, "views", "index.html"), "utf8");
  html = html.replace("{{FROM_OPTIONS}}", options);
  html = html.replace("{{TO_OPTIONS}}", options);
  return html;
}

app.get("/", (req, res) => {
  res.send(renderIndexHTML());
});

app.post("/convert", async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const amount = Number(req.body.amount);

    // basic validation
    if (!currencies.includes(from) || !currencies.includes(to) || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).send("Invalid input. Go back and try again.");
    }

    // Frankfurter latest rates endpoint:
    // https://api.frankfurter.dev/v1/latest?base=USD&symbols=CAD
    // Docs: base + symbols :contentReference[oaicite:1]{index=1}
    const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`;

    const apiRes = await fetch(url);
    if (!apiRes.ok) throw new Error("API request failed");

    const data = await apiRes.json();
    const rate = data?.rates?.[to];

    if (!rate) throw new Error("Rate not found");

    const converted = (amount * rate).toFixed(2);

    // render result.html and inject values
    const fs = require("fs");
    let html = fs.readFileSync(path.join(__dirname, "views", "result.html"), "utf8");

    html = html
      .replaceAll("{{FROM}}", escapeHtml(from))
      .replaceAll("{{TO}}", escapeHtml(to))
      .replaceAll("{{AMOUNT}}", escapeHtml(amount.toFixed(2)))
      .replaceAll("{{RATE}}", escapeHtml(Number(rate).toFixed(6)))
      .replaceAll("{{CONVERTED}}", escapeHtml(converted))
      .replaceAll("{{DATE}}", escapeHtml(data.date || "N/A"));

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong fetching live rates. Please try again.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
