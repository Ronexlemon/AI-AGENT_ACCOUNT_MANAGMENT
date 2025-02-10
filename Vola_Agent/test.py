from collections import Counter
from model import train_lstm
from model2 import model2_lsm
from preprocesing import preprocess_data
from fetch_data import fetch_price_history
#from swap import swap_tokens
import numpy as np
import pandas as pd
import torch

VOLATILITY_THRESHOLD = 0.05  # Swap if price change >5%

model, scaler = model2_lsm()

def check_market_and_swap():
    data = fetch_price_history()
    if data is None:
        return
    X_new, _, _ = preprocess_data(data)
    predictions = model.predict(X_new)

    # predicted_volatility = model(last_prices_tensor).item()
    # print("Prdicted is",predicted_volatility)
    # actual_volatility = np.std(last_prices) / np.mean(last_prices)
    # print("actual volatility",actual_volatility)
    #print("Predictions",predictions)

    # if predictions < VOLATILITY_THRESHOLD:
    #     print("Market is volatile, swapping to stablecoin.")
    #    # swap_tokens(0.1)  # Swap 0.1 ETH worth of token to USDC
    # else:
    #     print("Market is stable, no swap needed.")
    predicted_labels = ['Up' if prob >= 0.5 else 'Down' for prob in predictions.flatten()]
    print("Predicted labels", predicted_labels)

   # Find the index of the most likely prediction (highest probability)
    # Count the occurrences of each label
    label_counts = Counter(predicted_labels)

# Get the label with the most occurrences
    most_likely_label, most_likely_count = label_counts.most_common(1)[0]

# Print results
    print(f"Predicted labels: {predicted_labels}")
    print(f"Most likely prediction: {most_likely_label} with count: {most_likely_count}")





if __name__ == "__main__":
    #run the loop for ever
    while True:
     check_market_and_swap()
