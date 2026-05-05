from flask import Flask, jsonify
import yfinance as yf
from alerts import check_alerts

app = Flask(__name__)

tickers = ["AAPL", "NVDA", "BHP.AX", "GLD", "SLV"]

previous_prices = {}

@app.route("/data")
def get_data():
    data = yf.download(tickers, period="1d", interval="1m")["Close"]
    latest = data.iloc[-1].to_dict()

    # Alert check
    for t in tickers:
        if t in previous_prices:
            check_alerts(t, latest[t], previous_prices[t])
        previous_prices[t] = latest[t]

    response = {
        "totalValue": sum(latest.values()),
        "return": 8.5,
        "top10": [{"ticker": k, "return": 5} for k in latest.keys()],
        "semiTrend": [100, 120, 140, 160],
        "gold": latest.get("GLD", 0),
        "silver": latest.get("SLV", 0),
        "aiInsight": "Semiconductors are trending upward."
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
