import alpaca_trade_api as tradeapi
from config import *

api = tradeapi.REST(
    ALPACA_API_KEY,
    ALPACA_SECRET,
    base_url=ALPACA_BASE_URL
)

def buy_stock(ticker, qty):
    api.submit_order(
        symbol=ticker,
        qty=qty,
        side='buy',
        type='market',
        time_in_force='gtc'
    )

def sell_stock(ticker, qty):
    api.submit_order(
        symbol=ticker,
        qty=qty,
        side='sell',
        type='market',
        time_in_force='gtc'
    )