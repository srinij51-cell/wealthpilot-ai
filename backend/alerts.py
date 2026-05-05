from twilio.rest import Client
from config import *

def send_whatsapp(message):
    client = Client(TWILIO_SID, TWILIO_AUTH)

    client.messages.create(
        body=message,
        from_=WHATSAPP_FROM,
        to=WHATSAPP_TO
    )

def check_alerts(ticker, price, prev_price):
    change = ((price - prev_price) / prev_price) * 100

    if change > 5:
        send_whatsapp(f"🚀 {ticker} up {change:.2f}%")

    elif change < -5:
        send_whatsapp(f"⚠️ {ticker} down {change:.2f}%")