import base64

def get_base64_from_file(file_path):
    with open(file_path, "rb") as image_file:
        return f"data:image/png;base64,{base64.b64encode(image_file.read()).decode('utf-8')}"

# Usage
ibm_logo_base64 = get_base64_from_file('icons/help-129.png')

print(ibm_logo_base64)
