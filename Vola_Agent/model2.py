import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import MinMaxScaler
from fetch_data import fetch_price_history

# Load the data
# try:
#     df = pd.read_excel('token_price_data.xlsx')  # Replace 'your_file.xlsx' with your file name
# except FileNotFoundError:
#     print("Error: 'your_file.xlsx' not found. Please upload the file to your Colab environment or provide the correct path.")
#     exit()
def model2_lsm():
 data = fetch_price_history()


# Extract prices
# prices = [price for timestamp, price in data['prices']]
# Data preprocessing
 prices = [(entry[0], entry[1]) for entry in data["prices"]]
 df = pd.DataFrame(prices, columns=["timestamp", "prices"])
 df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
#df['timestamp'] = pd.to_datetime(df['timestamp'])
 df['prices'] = df['prices'].astype(str).str.replace('[^0-9.]', '', regex=True).astype(float) #handle non numeric price
 df = df.dropna(subset=['prices']) #remove price with na

#df['Direction'] = df['Direction'].map({'Up': 1, 'Down': 0}) # convert direction to numeric
# Calculate 'y' based on the difference between current and next price (Direction: 1 if price increases, 0 if price decreases)
#df['next_price'] = df['prices'].shift(-1)  # Get next price
#df['Direction'] = (df['next_price'] > df['prices']).astype(int)  # 1 if price goes up, 0 if price goes down

# Calculate the percentage change and store it in 'y'
# df['next_price'] = df['prices'].shift(-1)  # Get next price
# df['Direction'] = ((df['next_price'] - df['prices']) / df['prices']) * 100  # Percentage change
# Calculate price change direction (target variable y)
 df['price_change'] = df['prices'].diff()  # Price change compared to the previous price
 df['Direction'] = (df['price_change'] > 0).astype(int)  # 1 if price went up, 0 if price went down

# Feature engineering (add lagged prices and moving averages)
 df['Lagged_Price'] = df['prices'].shift(1)
 df['Moving_Avg_10'] = df['prices'].rolling(window=10).mean()
 df['Volatility_10'] = df['prices'].rolling(window=10).std()


# Feature engineering (example: adding lagged price)
#df['Lagged_Price'] = df['prices'].shift(1)
 df = df.dropna() # drop row with na

# Normalize the data
#scaler = MinMaxScaler()
#df[['prices', 'Lagged_Price']] = scaler.fit_transform(df[['prices', 'Lagged_Price']])
 scaler = MinMaxScaler()
 df[['prices', 'Lagged_Price', 'Moving_Avg_10', 'Volatility_10']] = scaler.fit_transform(df[['prices', 'Lagged_Price', 'Moving_Avg_10', 'Volatility_10']])


# Prepare data for training
#X = df[['prices', 'Lagged_Price']].values
 X = df[['prices', 'Lagged_Price', 'Moving_Avg_10', 'Volatility_10']].values  # Features
 y = df['Direction'].values

# Define the policy network (using a simple neural network)
 model = keras.Sequential([
 layers.Dense(64, activation='relu', input_shape=(X.shape[1],)),
 layers.Dense(32, activation='relu'),
 layers.Dense(1, activation='sigmoid')  # Output probability of going 'Up'
 ])

 model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
 model.fit(X, y, epochs=300, batch_size=32)  # Adjust epochs and batch_size as needed
 #return model and scaller
 return model, scaler



# Prediction example
# new_data = np.array([[0.5, 0.6]]) # Example input
# prediction = model.predict(new_data)
# print(prediction[0][0])  # Output: [0.5] (probability of going 'Up')
# predicted_direction = 1 if prediction[0][0] > 0.5 else 0
# print(f"Predicted direction: {predicted_direction}")