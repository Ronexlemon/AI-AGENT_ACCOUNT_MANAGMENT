


#########BOTH NEGATIVE AND POSITIVE
import pickle
from sklearn.preprocessing import StandardScaler
import torch
import torch.nn as nn
import numpy as np
import pandas as pd

from fetch_data import fetch_price_history
class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=50, output_size=1):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        return self.fc(lstm_out[:, -1])
def train_lstm():
    # Fetch the price history
    data = fetch_price_history()  # Replace with your actual function call

    # Extract prices
    prices = [price for timestamp, price in data['prices']]

    # Convert to DataFrame
    df = pd.DataFrame(prices, columns=['prices'])

    # Scale prices using StandardScaler
    scaler = StandardScaler()
    df['scaled_price'] = scaler.fit_transform(df[['prices']])

    # Prepare the input (X) and target (y) sequences for training
    seq_length = 10
    X, y = [], []

    for i in range(len(df) - seq_length):
        X.append(df['scaled_price'].iloc[i:i+seq_length].values)
        y.append(df['scaled_price'].iloc[i+seq_length])

    # Convert to numpy arrays and then to torch tensors
    X, y = np.array(X), np.array(y)
    X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1)  # Add feature dimension
    y = torch.tensor(y, dtype=torch.float32).unsqueeze(-1)  # Add feature dimension

    # Instantiate the LSTM model, optimizer, and loss function
    model = LSTMModel()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    loss_fn = nn.MSELoss()

    # Train the model
    for epoch in range(400):
        model.train()  # Ensure the model is in training mode
        optimizer.zero_grad()  # Zero the gradients
        output = model(X)  # Forward pass
        loss = loss_fn(output, y)  # Compute the loss
        loss.backward()  # Backpropagation
        optimizer.step()  # Update the model weights

        # Print the loss for monitoring
        if epoch % 10 == 0:  # Print loss every 10 epochs
            print(f"Epoch [{epoch+1}/400], Loss: {loss.item():.4f}")


        # ✅ Save the trained model
    torch.save(model.state_dict(), "lstm_model.pth")
    print("✅ LSTM model saved!")

    # ✅ Save the scaler using pickle
    # Save the scaler
    with open("scaler.pkl", "wb") as f:
         pickle.dump(scaler, f)

# Verify it was saved correctly
    with open("scaler.pkl", "rb") as f:
          loaded_scaler = pickle.load(f)
          if isinstance(loaded_scaler, StandardScaler):
             print("✅ Scaler saved and verified successfully!")
          else:
              print("❌ Error: Scaler saved incorrectly!")

    return model, scaler