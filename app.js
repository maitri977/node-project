const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// 🔥 VERY IMPORTANT FOR RENDER
const PORT = process.env.PORT || 8080;

// read form data
app.use(express.urlencoded({ extended: true }));

// serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// small currency list
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

  let html = fs.readFileSync(
    path.join(__dirname, "views", "index.html"),
    "utf8"
  );

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

    if (
      !currencies.includes(from) ||
      !currencies.includes(to) ||
      Number.isNaN(amount) ||
      amount <= 0
    ) {
      return res.status(400).send("Invalid input. Go back and try again.");
    }

    const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(
      from
    )}&symbols=${encodeURIComponent(to)}`;

    const apiRes = await fetch(url);
    if (!apiRes.ok) throw new Error("API request failed");

    const data = await apiRes.json();
    const rate = data?.rates?.[to];
    if (!rate) throw new Error("Rate not found");

    const converted = (amount * rate).toFixed(2);

    let html = fs.readFileSync(
      path.join(__dirname, "views", "result.html"),
      "utf8"
    );

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
    res.status(500).send("Something went wrong fetching live rates.");
  }
});

// ✅ Must use process.env.PORT for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
