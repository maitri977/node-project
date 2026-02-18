const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Demo bus schedule
const busData = {
  "Route 1 - Downtown": ["10:05 AM", "10:20 AM", "10:35 AM"],
  "Route 2 - Mall": ["10:10 AM", "10:25 AM", "10:40 AM"],
  "Route 3 - Station": ["10:00 AM", "10:15 AM", "10:30 AM"],
};

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Form submit
app.post("/bus", (req, res) => {
  const route = req.body.route;
  const times = busData[route] || [];

  let timeList = times.map(t => `<li>${t}</li>`).join("");

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
      <title>Bus Result</title>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <h2>${route}</h2>
          <ul>${timeList}</ul>
          <a href="/">⬅ Back</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:8080");
});
