from model import train_lstm
from fetch_data import fetch_price_history
from swap import transferToken
#from swap import swap_tokens
import numpy as np
import pandas as pd
import torch
from save import save_model

VOLATILITY_THRESHOLD = -0.05  # Swap if price change >5%

model, scaler = train_lstm()
#save_model(model, scaler)

def check_market_and_swap():
    data = fetch_price_history()
    if data is None:
        return
         # Extract prices
    prices = [price for timestamp, price in data['prices']]

    # Convert to DataFrame
    df = pd.DataFrame(prices, columns=['prices'])

    # last_prices = df["prices"].values[-10:]
    last_prices= df.values[-10:]
    last_prices_scaled = scaler.transform(last_prices.reshape(-1, 1))
    last_prices_tensor = torch.tensor([last_prices_scaled], dtype=torch.float32)

    predicted_volatility = model(last_prices_tensor).item()
    print("Prdicted is",predicted_volatility)
    actual_volatility = np.std(last_prices) / np.mean(last_prices)
    print("actual volatility",actual_volatility)

    if predicted_volatility < VOLATILITY_THRESHOLD:
        print("Market is volatile, swapping to stablecoin.")
       # swap_tokens(0.1)  # Swap 0.1 ETH worth of token to USDC
        txhash,receipt = transferToken("0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4","private_key")
        print("Transaction hash:", txhash ,"And Receipt",receipt)
    else:
        print("Market is stable, no swap needed.")

if __name__ == "__main__":
    while True:
     check_market_and_swap()
