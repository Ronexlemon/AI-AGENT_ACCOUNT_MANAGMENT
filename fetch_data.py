import requests
import pandas as pd
import time

COINGECKO_API = "https://api.coingecko.com/api/v3"
HEADERS = {
    "accept": "application/json",
    "x-cg-demo-api-key": "CG-BkJEM7xztYoSEpqAu44mds3o"
}


def fetch_price_history(token_id ="near",currency="usd", days=1):
    url = f"{COINGECKO_API}/coins/{token_id}/market_chart?vs_currency={currency}&days={days}"
    params = {"vs_currency": currency, "days": days}
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code == 200:
        data = response.json()
        prices = [(entry[0], entry[1]) for entry in data["prices"]]
        df = pd.DataFrame(prices, columns=["timestamp", "price"])
        df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
        return data
    else:
        print(f"Error fetching price data: {response.status_code}, {response.text}")
        return None
     

print(fetch_price_history())