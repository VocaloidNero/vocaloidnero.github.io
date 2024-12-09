from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 假设你有一个函数处理生成的模型
# def generate_handwritten_text(template_path, input_text):
#     # 模型生成代码放这里
#     return output_image_path

@app.route('/generate', methods=['POST'])
def generate():
    if 'template' not in request.files or 'text' not in request.form:
        return jsonify({'error': 'Invalid request!'}), 400

    # 获取上传的图片文件
    template = request.files['template']
    input_text = request.form['text']

    # 保存模板图片到本地
    template_path = os.path.join('uploads', template.filename)
    template.save(template_path)

    # 调用模型生成
    try:
        # 输出路径
        output_path = os.path.join('outputs', f"output_{template.filename}")
        
        # 在这里调用你的模型代码，例如：
        # output_path = generate_handwritten_text(template_path, input_text)

        # 为了演示，这里直接将模板图作为输出图（实际应为生成的结果图）
        output_image = Image.open(template_path)
        output_image.save(output_path)

        return jsonify({'output': output_path})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('outputs', exist_ok=True)
    app.run(host='0.0.0.0', port=5000)

from flask import send_from_directory

@app.route('/outputs/<filename>')
def get_output(filename):
    return send_from_directory('outputs', filename)

#返回路径
return jsonify({'output': f'http://localhost:5000/outputs/{os.path.basename(output_path)}'})