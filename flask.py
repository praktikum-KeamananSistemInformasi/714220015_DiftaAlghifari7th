from flask import Flask, render_template, request
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64

app = Flask(__name__)

# Fungsi untuk enkripsi
def unjebol(plain_text, key):
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(plain_text.encode('utf-8'))
    return base64.b64encode(nonce + ciphertext).decode('utf-8')

# Fungsi untuk dekripsi
def jebol(cipher_text, key):
    raw_data = base64.b64decode(cipher_text)
    nonce = raw_data[:16]
    ciphertext = raw_data[16:]
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    plain_text = cipher.decrypt(ciphertext)
    return plain_text.decode('utf-8')

# Kunci simetris (pastikan ini sama untuk enkripsi dan dekripsi)
key = get_random_bytes(32)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Ambil kalimat dari formulir
        plain_text = request.form['text']
        
        # Enkripsi kalimat
        encrypted_text = unjebol(plain_text, key)
        
        # Dekripsi kalimat
        decrypted_text = jebol(encrypted_text, key)

        return render_template('index.html', encrypted=encrypted_text, decrypted=decrypted_text)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
