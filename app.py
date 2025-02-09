import asyncio
import threading
import time
from flask import Flask, request, jsonify
from hexbytes import HexBytes
import pandas as pd
from fetch_data import fetch_price_history
from swap import we3
from orderbook import approveTx, SwapTokens
import torch
import torch.nn as nn
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
# ----------------- LSTM MODEL SETUP ----------------- #
class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=50, output_size=1):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        return self.fc(lstm_out[:, -1])

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = LSTMModel()
model.load_state_dict(torch.load("lstm_model.pth", map_location=device))
model.to(device)
model.eval()

# ✅ Ensure `scaler.pkl` is Loaded Properly
scaler = None
try:
    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)  # Load StandardScaler

    if not isinstance(scaler, StandardScaler):
        raise ValueError("Error: Loaded object is not a StandardScaler instance!")

    print("✅ Scaler loaded successfully.")

except FileNotFoundError:
    print("❌ Error: scaler.pkl not found! Make sure the file exists in your working directory.")
    exit(1)  # Stop execution since the model won't work

except Exception as e:
    print(f"❌ Error loading scaler: {e}")
    exit(1)  # Stop execution

# Check before using `scaler.transform()`
if scaler is None:
    print("❌ Error: Scaler is None. Exiting...")
    exit(1)

latest_prediction = {"predicted_price": None}
transaction_queue = []  # Store transactions to be processed
VOLATILITY_THRESHOLD = -0.05 
# Global dictionary to store transaction receipts
transaction_receipts = {}


# ----------------- BACKGROUND TASKS ----------------- #

def update_predictions():
    """Continuously update LSTM model predictions."""
    while True:
        try:
            #price_history = [100, 102, 104, 103, 105, 107, 108, 110, 112, 115]
            data = fetch_price_history()
            prices = [price for timestamp, price in data['prices']]
            df = pd.DataFrame(prices, columns=['prices'])
            # last_prices= df.values[-10:]
            # last_seq = np.array(last_prices).reshape(1, -1)
            # last_seq = scaler.transform(last_seq)
            # last_seq = torch.tensor(last_seq, dtype=torch.float32).unsqueeze(0).unsqueeze(-1).to(device)
            last_prices= df.values[-10:]
            last_prices_scaled = scaler.transform(last_prices.reshape(-1, 1))
            last_prices_tensor = torch.tensor([last_prices_scaled], dtype=torch.float32)
            prediction_volatility = model(last_prices_tensor).item()

            with torch.no_grad():
                # prediction_volatility = model(last_seq).item()

            #predicted_price = scaler.inverse_transform([[prediction_volatility]])[0][0]
             latest_prediction["predicted_price"] = prediction_volatility

            print(f"Updated Prediction: {prediction_volatility}")

            time.sleep(60)

        except Exception as e:
            print(f"Prediction update error: {str(e)}")


# def process_transactions():
#     """Continuously process transactions in a loop."""
#     while True:
#         if transaction_queue:
#             try:
#                 transaction = transaction_queue.pop(0)  # Get next transaction
#                 print(f"Processing transaction: {transaction}")

#                 private_key = transaction["private_key"]
#                 amount_wei = int(float(transaction["amount"]) * (10 ** 18))
#                 sell_token = transaction["sell_token"]
#                 buy_token = transaction["buy_token"]

#                 account = we3.eth.account.from_key(private_key)
#                 balance_wei = we3.eth.get_balance(account.address)
#                 balance_ether = we3.from_wei(balance_wei, 'ether')

#                 loop = asyncio.new_event_loop()
#                 asyncio.set_event_loop(loop)
#                 #check for predicted price
#                 if latest_prediction["predicted_price"] < VOLATILITY_THRESHOLD:
#                     receipt, swaptx = loop.run_until_complete(
#                           SwapTokens(amountt=amount_wei, private_key=private_key, sell_token=sell_token, buy_token=buy_token)
#                        )

#                 def serialize_receipt(receipt):
#                     return {k: (v.hex() if isinstance(v, HexBytes) else str(v)) for k, v in dict(receipt).items()}

#                 receipt_json = serialize_receipt(receipt)

#                 transaction["status"] = "completed"
#                 transaction["receipt"] = receipt_json
#                 transaction["swaptx_cow_order_url"] = str(swaptx.url)

#                 print(f"Transaction completed: {transaction}")

#             except Exception as e:
#                 print(f"Transaction processing error: {str(e)}")

#         time.sleep(5)  # Wait before checking for new transactions

def process_transactions():
    """Continuously process transactions in a loop."""
    while True:
        if transaction_queue:
            try:
                transaction = transaction_queue.pop(0)  # Get next transaction
                print(f"Processing transaction: {transaction}")

                private_key = transaction["private_key"]
                amount_wei = int(float(transaction["amount"]) * (10 ** 18))
                sell_token = transaction["sell_token"]
                buy_token = transaction["buy_token"]

                account = we3.eth.account.from_key(private_key)
                balance_wei = we3.eth.get_balance(account.address)
                balance_ether = we3.from_wei(balance_wei, 'ether')

                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                # Check for predicted price
                if latest_prediction["predicted_price"] < VOLATILITY_THRESHOLD:
                    receipt, swaptx = loop.run_until_complete(
                        SwapTokens(amountt=amount_wei, private_key=private_key, sell_token=sell_token, buy_token=buy_token)
                    )

                def serialize_receipt(receipt):
                    return {k: (v.hex() if isinstance(v, HexBytes) else str(v)) for k, v in dict(receipt).items()}

                receipt_json = serialize_receipt(receipt)

                # Store the receipt in the global dictionary
                transaction_hash = receipt["transactionHash"].hex()  # Use transaction hash as the key
                transaction_receipts[transaction_hash] = {
                    "receipt": receipt_json,
                    "swaptx_cow_order_url": str(swaptx.url),
                    "status": "completed"
                }

                # Update the transaction with the receipt and status
                transaction["status"] = "completed"
                transaction["receipt"] = receipt_json
                transaction["swaptx_cow_order_url"] = str(swaptx.url)

                print(f"Transaction completed: {transaction}")

            except Exception as e:
                print(f"Transaction processing error: {str(e)}")

        time.sleep(5)  # Wait before checking for new transactions

# Start background threads
threading.Thread(target=update_predictions, daemon=True).start()
threading.Thread(target=process_transactions, daemon=True).start()


# ----------------- API ROUTES ----------------- #

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    """API to add a new transaction to the queue."""
    try:
        data = request.get_json()
        required_fields = ["private_key", "amount", "buy_token", "sell_token"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        transaction_queue.append(data)  # Add to queue
        return jsonify({"message": "Transaction added successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_latest_prediction', methods=['GET'])
def get_latest_prediction():
    """Returns the latest LSTM price prediction."""
    return jsonify({"predicted_price": latest_prediction["predicted_price"]})

@app.route('/get_address', methods=['POST'])
def get_address():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        private_key = data.get("private_key")
        amount = data.get("amount")
        #buy_token
        buy_token = data.get("buy_token")
        #sell_token
        sell_token = data.get("sell_token")

        if not private_key:
            return jsonify({"error": "Private key is required"}), 400
        if not amount:
            return jsonify({"error": "Amount is required"}), 400
        if not buy_token:
            return jsonify({"error": "Buy token is required"}), 400
        if not sell_token:
            return jsonify({"error": "Sell token is required"}), 400
        
        
        # Convert private key to account
        account = we3.eth.account.from_key(private_key)
        
        # Convert amount to Wei (Solidity expects uint256)
        amount_wei = int(float(amount) * (10 ** 18))

        # Get balance in Ether
        balance_wei = we3.eth.get_balance(account.address)
        balance_ether = we3.from_wei(balance_wei, 'ether')

        # Properly run async approveTx function
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        #receipt = loop.run_until_complete(approveTx(amount=amount_wei, private_key=private_key))
        receipt,swaptx = loop.run_until_complete(SwapTokens(amountt=amount_wei, private_key=private_key,sell_token=sell_token,buy_token=buy_token))

        def serialize_receipt(receipt):
            return {k: (v.hex() if isinstance(v, HexBytes) else str(v)) for k, v in dict(receipt).items()}

        receipt_json = serialize_receipt(receipt)

        return jsonify({
            "address": account.address,
            "public_key": account._key_obj.public_key.to_hex(),
            "balance": str(balance_ether),
            "receipt": receipt_json,
            "swaptx_cow_order_url": str(swaptx.url)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
