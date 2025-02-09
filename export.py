import torch
import onnx

from model import LSTMModel

model = LSTMModel()
model.load_state_dict(torch.load("lstm_model.pth"))
model.eval()

dummy_input = torch.randn(1, 10, 1)  # Batch size 1, sequence length 10, input size 1
onnx_path = "lstm_model.onnx"

torch.onnx.export(
    model, 
    dummy_input, 
    onnx_path, 
    input_names=["input"], 
    output_names=["output"], 
    dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}}
)
print(f"Model converted to ONNX and saved at {onnx_path}")
