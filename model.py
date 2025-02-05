# import torch
# import torch.nn as nn
# import numpy as np
# import pandas as pd
# from fetch_data import fetch_price_history
# from sklearn.preprocessing import MinMaxScaler

# class LSTMModel(nn.Module):
#     def __init__(self, input_size=1, hidden_size=50, output_size=1):
#         super(LSTMModel, self).__init__()
#         self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
#         self.fc = nn.Linear(hidden_size, output_size)

#     def forward(self, x):
#         lstm_out, _ = self.lstm(x)
#         return self.fc(lstm_out[:, -1])

# def train_lstm():
#     df = fetch_price_history()
#     if df is None:
#         return None
    
    
#     scaler = MinMaxScaler()
#     df["scaled_price"] = scaler.fit_transform(df["prices"].values.reshape(-1, 1))

#     X, y = [], []
#     seq_length = 10
#     for i in range(len(df) - seq_length):
#         X.append(df["scaled_price"].iloc[i:i+seq_length].values)
#         y.append(df["scaled_price"].iloc[i+seq_length])

#     X, y = np.array(X), np.array(y)
#     X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1)
#     y = torch.tensor(y, dtype=torch.float32).unsqueeze(-1)

#     model = LSTMModel()
#     optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
#     loss_fn = nn.MSELoss()

#     for epoch in range(100):
#         optimizer.zero_grad()
#         output = model(X)
#         loss = loss_fn(output, y)
#         loss.backward()
#         optimizer.step()
    
#     return model, scaler

# import torch
# import torch.nn as nn
# import numpy as np
# import pandas as pd
# from fetch_data import fetch_price_history
# from sklearn.preprocessing import MinMaxScaler

# class LSTMModel(nn.Module):
#     def __init__(self, input_size=1, hidden_size=50, output_size=1):
#         super(LSTMModel, self).__init__()
#         self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
#         self.fc = nn.Linear(hidden_size, output_size)

#     def forward(self, x):
#         lstm_out, _ = self.lstm(x)
#         return self.fc(lstm_out[:, -1])

# def train_lstm():
#     df = fetch_price_history()
    
#     if df is None:
#         print("No data found.")
#         return None

#     # Ensure df is a pandas DataFrame with the expected structure
#     if isinstance(df, list):  # If df is a list, convert it to DataFrame
#         print("Instance of list")
#         df = pd.DataFrame(df)
#     if isinstance(df, dict):
#          print("instance of dict")
#          df = pd.DataFrame(df)
#     # Check if the 'prices' column exists
#     if 'prices' not in df.columns:
#         print("Prices column not found in data.")
#         return None
    
#     # Scale prices using MinMaxScaler
#     scaler = MinMaxScaler()
#     #df["scaled_price"] = scaler.fit_transform(df["prices"].values.reshape(-1, 1))
#     df['scaled_price'] = scaler.fit_transform(np.array(df['prices']).reshape(-1, 1))


#     # Prepare input (X) and target (y) sequences
#     X, y = [], []
#     seq_length = 10
#     for i in range(len(df) - seq_length):
#         X.append(df["scaled_price"].iloc[i:i+seq_length].values)
#         y.append(df["scaled_price"].iloc[i+seq_length])

#     # Convert to numpy arrays and then torch tensors
#     X, y = np.array(X), np.array(y)
#     X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1)  # Add the feature dimension
#     y = torch.tensor(y, dtype=torch.float32).unsqueeze(-1)  # Add the feature dimension

#     # Instantiate the model, optimizer, and loss function
#     model = LSTMModel()
#     optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
#     loss_fn = nn.MSELoss()

#     # Train the model
#     for epoch in range(100):
#         model.train()  # Ensure the model is in training mode
#         optimizer.zero_grad()  # Zero the gradients
#         output = model(X)  # Forward pass
#         loss = loss_fn(output, y)  # Compute the loss
#         loss.backward()  # Backpropagation
#         optimizer.step()  # Update model weights

#         # Print the loss for monitoring (optional)
#         if epoch % 10 == 0:  # Print loss every 10 epochs
#             print(f"Epoch [{epoch+1}/100], Loss: {loss.item():.4f}")

#     return model, scaler

#######ONLY POSITIVE PREDICTION
# import torch
# import torch.nn as nn
# import numpy as np
# import pandas as pd
# from sklearn.preprocessing import MinMaxScaler
# from fetch_data import fetch_price_history

# class LSTMModel(nn.Module):
#     def __init__(self, input_size=1, hidden_size=50, output_size=1):
#         super(LSTMModel, self).__init__()
#         self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
#         self.fc = nn.Linear(hidden_size, output_size)

#     def forward(self, x):
#         lstm_out, _ = self.lstm(x)
#         return self.fc(lstm_out[:, -1])

# def train_lstm():
#     # Fetch the price history
#     data = fetch_price_history()  # Replace with your actual function call

#     # Extract prices
#     prices = [price for timestamp, price in data['prices']]

#     # Convert to DataFrame
#     df = pd.DataFrame(prices, columns=['prices'])

#     # Scale prices using MinMaxScaler
#     scaler = MinMaxScaler()
#     df['scaled_price'] = scaler.fit_transform(df[['prices']])

#     # Prepare the input (X) and target (y) sequences for training
#     seq_length = 10
#     X, y = [], []

#     for i in range(len(df) - seq_length):
#         X.append(df['scaled_price'].iloc[i:i+seq_length].values)
#         y.append(df['scaled_price'].iloc[i+seq_length])

#     # Convert to numpy arrays and then to torch tensors
#     X, y = np.array(X), np.array(y)
#     X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1)  # Add feature dimension
#     y = torch.tensor(y, dtype=torch.float32).unsqueeze(-1)  # Add feature dimension

#     # Instantiate the LSTM model, optimizer, and loss function
#     model = LSTMModel()
#     optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
#     loss_fn = nn.MSELoss()

#     # Train the model
#     for epoch in range(100):
#         model.train()  # Ensure the model is in training mode
#         optimizer.zero_grad()  # Zero the gradients
#         output = model(X)  # Forward pass
#         loss = loss_fn(output, y)  # Compute the loss
#         loss.backward()  # Backpropagation
#         optimizer.step()  # Update the model weights

#         # Print the loss for monitoring
#         if epoch % 10 == 0:  # Print loss every 10 epochs
#             print(f"Epoch [{epoch+1}/100], Loss: {loss.item():.4f}")

#     return model, scaler


#########BOTH NEGATIVE AND POSITIVE
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

    return model, scaler