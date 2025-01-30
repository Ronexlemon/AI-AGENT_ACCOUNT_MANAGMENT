import torch
import torch.nn as nn
import numpy as np
import pandas as pd
from fetch_data import fetch_price_history
from sklearn.preprocessing import MinMaxScaler

class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=50, output_size=1):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        return self.fc(lstm_out[:, -1])

def train_lstm():
    df = fetch_price_history()
    if df is None:
        return None
    
    scaler = MinMaxScaler()
    df["scaled_price"] = scaler.fit_transform(df["price"].values.reshape(-1, 1))

    X, y = [], []
    seq_length = 10
    for i in range(len(df) - seq_length):
        X.append(df["scaled_price"].iloc[i:i+seq_length].values)
        y.append(df["scaled_price"].iloc[i+seq_length])

    X, y = np.array(X), np.array(y)
    X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1)
    y = torch.tensor(y, dtype=torch.float32).unsqueeze(-1)

    model = LSTMModel()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    loss_fn = nn.MSELoss()

    for epoch in range(100):
        optimizer.zero_grad()
        output = model(X)
        loss = loss_fn(output, y)
        loss.backward()
        optimizer.step()
    
    return model, scaler
