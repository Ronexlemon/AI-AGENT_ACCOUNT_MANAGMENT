from onnx_tf.backend import prepare
import onnx

onnx_model = onnx.load("lstm_model.onnx")
tf_model = prepare(onnx_model)
tf_model.export_graph("lstm_tf_model")
print("ONNX model converted to TensorFlow format")
