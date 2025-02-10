import torch
import joblib  # For saving the scaler

def save_model(model, scaler, model_path="lstm_model.pth", scaler_path="scaler.pkl"):
    # Save the trained model
    torch.save(model.state_dict(), model_path)
    
    # Save the scaler
    joblib.dump(scaler, scaler_path)

    print(f"Model saved to {model_path}")
    print(f"Scaler saved to {scaler_path}")
