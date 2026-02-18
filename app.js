const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SwiftSend | Money Transfer</title>
    <style>
      :root{
        --bg1:#0b1220;
        --bg2:#0f1b3a;
        --card:#0e1730cc;
        --text:#eaf0ff;
        --muted:#a9b7e6;
        --accent:#7c3aed;
        --accent2:#22c55e;
        --warn:#f59e0b;
        --shadow: 0 12px 40px rgba(0,0,0,.35);
        --radius: 18px;
      }
      *{box-sizing:border-box}
      body{
        margin:0; color:var(--text);
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        background:
          radial-gradient(1200px 700px at 20% 10%, rgba(124,58,237,.35), transparent 60%),
          radial-gradient(900px 600px at 80% 0%, rgba(34,197,94,.28), transparent 55%),
          linear-gradient(180deg, var(--bg1), var(--bg2));
      }
      a{color:#b9c7ff}
      header{
        padding: 28px 18px 8px;
      }
      .wrap{max-width: 980px; margin: 0 auto; padding: 0 14px 34px;}
      .topbar{
        display:flex; align-items:center; justify-content:space-between; gap:12px;
      }
      .brand{
        display:flex; align-items:center; gap:10px; font-weight:800; letter-spacing:.2px;
      }
      .logo{
        width:40px; height:40px; border-radius:14px;
        background: linear-gradient(135deg, var(--accent), #60a5fa);
        display:grid; place-items:center;
        box-shadow: 0 10px 30px rgba(124,58,237,.35);
      }
      .logo span{font-weight:900}
      nav a{
        text-decoration:none; margin-left:14px; color:var(--muted);
        padding:10px 12px; border-radius:12px;
      }
      nav a:hover{background: rgba(255,255,255,.06); color:var(--text)}
      .hero{
        margin-top: 18px;
        display:grid; grid-template-columns: 1.1fr .9fr; gap:16px;
        align-items:stretch;
      }
      @media (max-width: 860px){
        .hero{grid-template-columns:1fr}
      }
      .card{
        background: var(--card);
        border: 1px solid rgba(255,255,255,.10);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 18px;
        backdrop-filter: blur(10px);
      }
      h1{
        margin:0 0 10px;
        font-size: 36px; line-height: 1.1;
      }
      .sub{
        color: var(--muted);
        margin: 0 0 14px;
        font-size: 15px;
      }
      .pillrow{display:flex; gap:10px; flex-wrap:wrap; margin-top:12px}
      .pill{
        padding: 10px 12px;
        border-radius: 999px;
        background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.10);
        font-size: 13px;
        color: var(--muted);
      }
      .pill b{color:var(--text)}
      .grid2{display:grid; grid-template-columns:1fr 1fr; gap:12px}
      @media (max-width: 520px){ .grid2{grid-template-columns:1fr} }
      label{display:block; font-size: 13px; color: var(--muted); margin-bottom:6px}
      input, select{
        width:100%;
        padding: 12px 12px;
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,.12);
        background: rgba(10,16,34,.55);
        color: var(--text);
        outline: none;
      }
      input::placeholder{color:#94a3b8}
      .btnrow{display:flex; gap:10px; margin-top:12px; flex-wrap:wrap}
      button{
        border:none;
        padding: 12px 14px;
        border-radius: 14px;
        cursor:pointer;
        font-weight: 700;
      }
      .primary{
        background: linear-gradient(135deg, var(--accent), #60a5fa);
        color:white;
        box-shadow: 0 12px 30px rgba(96,165,250,.25);
      }
      .primary:hover{filter: brightness(1.07)}
      .ghost{
        background: rgba(255,255,255,.06);
        color: var(--text);
        border: 1px solid rgba(255,255,255,.12);
      }
      .ghost:hover{background: rgba(255,255,255,.09)}
      .mini{
        display:flex; justify-content:space-between; gap:10px;
        padding: 12px;
        border-radius: 16px;
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.10);
        margin-top: 12px;
      }
      .mini .k{color: var(--muted); font-size: 12px}
      .mini .v{font-size: 15px; font-weight: 800}
      .hint{
        margin-top:10px;
        font-size: 12px;
        color: var(--muted);
      }
      .section{
        margin-top: 16px;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 12px;
      }
      @media (max-width: 860px){ .section{grid-template-columns:1fr} }
      .badge{
        display:inline-block;
        padding:6px 10px;
        border-radius: 999px;
        font-size: 12px;
        background: rgba(34,197,94,.12);
        border: 1px solid rgba(34,197,94,.30);
        color: #b6f7c9;
        margin-bottom: 8px;
      }
      .warn{
        background: rgba(245,158,11,.12);
        border-color: rgba(245,158,11,.30);
        color:#ffe2b4;
      }
      footer{
        text-align:center;
        color: var(--muted);
        padding: 22px 0 10px;
        font-size: 13px;
      }
      .api{
        margin-top: 10px;
        font-size: 13px;
        color: var(--muted);
      }
      .api a{color:#c7d2fe}
      .note{
        margin-top: 10px;
        font-size: 12px;
        color: var(--muted);
        line-height: 1.45;
      }
      .spark{
        font-weight:900;
        background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399);
        -webkit-background-clip:text;
        background-clip:text;
        color: transparent;
      }
    </style>
  </head>
  <body>
    <header class="wrap">
      <div class="topbar">
        <div class="brand">
          <div class="logo"><span>$</span></div>
          <div>
            <div style="font-size:16px">SwiftSend</div>
            <div style="font-size:12px;color:var(--muted)">Money Transfer Demo</div>
          </div>
        </div>
        <nav>
          <a href="#send">Send</a>
          <a href="#rates">Rates</a>
          <a href="#security">Security</a>
        </nav>
      </div>

      <div class="hero">
        <div class="card">
          <div class="badge">Fast • Secure • Simple</div>
          <h1>Send money worldwide with <span class="spark">low fees</span>.</h1>
          <p class="sub">
            This is a 1-page Express app that looks like a fintech product.
            You can calculate a fee + total, and submit a transfer (no database).
          </p>

          <div class="pillrow">
            <div class="pill">💸 Fee: <b>1.5%</b></div>
            <div class="pill">⚡ Instant demo receipt</div>
            <div class="pill">🔒 Basic validation</div>
          </div>

          <div class="api">
            Try API: <a href="/api/rates">/api/rates</a> • <a href="/api/time">/api/time</a>
          </div>

          <div class="note">
           
          </div>
        </div>

        <div class="card" id="send">
          <h2 style="margin:0 0 10px">Send a Transfer</h2>

          <form method="POST" action="/transfer">
            <div class="grid2">
              <div>
                <label>From</label>
                <select name="from" required>
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label>To</label>
                <select name="to" required>
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div class="grid2" style="margin-top:10px">
              <div>
                <label>Recipient Name</label>
                <input name="recipient" placeholder="e.g., John Patel" required />
              </div>
              <div>
                <label>Amount</label>
                <input name="amount" type="number" step="0.01" min="1" placeholder="e.g., 250" required />
              </div>
            </div>

            <div class="btnrow">
              <button class="primary" type="submit">Send Now</button>
              <a class="ghost" href="#rates" style="display:inline-block;text-decoration:none;padding:12px 14px;border-radius:14px;">
                View Rates
              </a>
            </div>

            <div class="hint">Demo fee is calculated on the server (1.5%). No DB, just returns a receipt page.</div>
          </form>

          <div class="mini">
            <div>
              <div class="k">Processing</div>
              <div class="v">Instant</div>
            </div>
            <div>
              <div class="k">Transfer Type</div>
              <div class="v">Bank / Wallet</div>
            </div>
            <div>
              <div class="k">Status</div>
              <div class="v">Ready</div>
            </div>
          </div>
        </div>
      </div>

    
          
      <footer>
        © ${new Date().getFullYear()} SwiftSend • Demo fintech landing page (Node.js + Express)
      </footer>
    </header>
  </body>
  </html>
  `);
});

// API: current time
app.get("/api/time", (req, res) => {
  res.json({ now: new Date().toISOString() });
});

// API: demo rates (hardcoded)
app.get("/api/rates", (req, res) => {
  // demo rates (not real)
  res.json({
    base: "CAD",
    rates: {
      USD: 0.74,
      INR: 61.9,
      EUR: 0.68,
      CAD: 1.0,
    },
    updatedAt: new Date().toISOString(),
  });
});

// Transfer submit
app.post("/transfer", (req, res) => {
  const { from, to, recipient, amount } = req.body;

  const amt = Number(amount);

  // basic validation
  if (!from || !to || !recipient || !amount || Number.isNaN(amt) || amt <= 0) {
    return res.status(400).send(`
      <h2>Invalid transfer ❌</h2>
      <p>Please go back and enter valid details.</p>
      <a href="/">Back</a>
    `);
  }

  // demo fee: 1.5%
  const feeRate = 0.015;
  const fee = +(amt * feeRate).toFixed(2);
  const total = +(amt + fee).toFixed(2);

  console.log("TRANSFER:", { from, to, recipient, amount: amt, fee, total });

  res.send(`
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Transfer Receipt</title>
      <style>
        body{font-family:Arial;margin:0;background:#0b1220;color:#eaf0ff}
        .wrap{max-width:720px;margin:40px auto;padding:18px}
        .card{background:#0e1730cc;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:18px}
        .ok{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#b6f7c9}
        .row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.08)}
        .row:last-child{border-bottom:none}
        .k{color:#a9b7e6}
        a{color:#c7d2fe}
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <div class="ok">Transfer Submitted ✅</div>
          <h2 style="margin:12px 0 6px">Receipt</h2>
          <p style="color:#a9b7e6;margin-top:0">Demo only — no real money is moved.</p>

          <div class="row"><div class="k">Recipient</div><div><b>${escapeHtml(recipient)}</b></div></div>
          <div class="row"><div class="k">From → To</div><div><b>${escapeHtml(from)} → ${escapeHtml(to)}</b></div></div>
          <div class="row"><div class="k">Amount</div><div><b>${amt.toFixed(2)} ${escapeHtml(from)}</b></div></div>
          <div class="row"><div class="k">Fee (1.5%)</div><div><b>${fee.toFixed(2)} ${escapeHtml(from)}</b></div></div>
          <div class="row"><div class="k">Total Charged</div><div><b>${total.toFixed(2)} ${escapeHtml(from)}</b></div></div>

          <p style="margin-top:14px"><a href="/">← Back to Home</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// small helper to prevent HTML injection in receipt
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
