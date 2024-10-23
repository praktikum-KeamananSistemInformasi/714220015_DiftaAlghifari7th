const DeskripsiAlgoritma = {
  AES: "AES (Advanced Encryption Standard) adalah algoritma enkripsi simetris yang digunakan secara luas yang mendukung ukuran kunci 128, 192, dan 256 bit. Algoritma ini dianggap sangat aman dan digunakan dalam berbagai protokol keamanan.",
  DES: "DES (Data Encryption Standard) adalah sebuah algoritma enkripsi yang lebih tua yang menggunakan kunci 56-bit. Algoritma ini tidak lagi dianggap aman untuk sebagian besar aplikasi karena panjang kuncinya yang pendek.",
  TripleDES:
    "TripleDES (3DES) adalah versi DES yang lebih aman yang menerapkan proses enkripsi tiga kali dengan tiga kunci yang berbeda, memperluas ukuran kunci yang efektif menjadi 168 bit.",
  Rabbit:
    "Rabbit adalah algoritma stream cipher cepat yang dirancang untuk enkripsi berkecepatan tinggi. Algoritma ini efisien untuk aplikasi yang membutuhkan pemrosesan cepat, seperti enkripsi data waktu nyata.",
  RC4: "RC4 adalah sebuah stream cipher yang dikenal karena kesederhanaan dan kecepatannya. Namun, ia memiliki kerentanan dan tidak lagi direkomendasikan untuk komunikasi yang aman.",
};

function processText() {
  const plainText = document.getElementById("plainText").value;
  const algorithm = document.getElementById("algorithm").value;
  const Kunci = document.getElementById("Kunci").value;

  if (!Kunci) {
    alert("Masukkan Kunci Untuk Dekripsi.");
    return;
  }

  let encryptedText;

  if (algorithm === "AES") {
    encryptedText = CryptoJS.AES.encrypt(plainText, Kunci).toString();
  } else if (algorithm === "DES") {
    encryptedText = CryptoJS.DES.encrypt(plainText, Kunci).toString();
  } else if (algorithm === "TripleDES") {
    encryptedText = CryptoJS.TripleDES.encrypt(plainText, Kunci).toString();
  } else if (algorithm === "Rabbit") {
    encryptedText = CryptoJS.Rabbit.encrypt(plainText, Kunci).toString();
  } else if (algorithm === "RC4") {
    encryptedText = CryptoJS.RC4.encrypt(plainText, Kunci).toString();
  } else {
    alert("Pilih Algoritma Yang Ingin Digunakan.");
    return;
  }

  document.getElementById("encryptedText").textContent = encryptedText;
  const hashedText = CryptoJS.SHA256(plainText).toString();
  document.getElementById("hashedText").textContent = hashedText;
}

function decryptText() {
  const encryptedText = document.getElementById("encryptedText").textContent;
  const algorithm = document.getElementById("algorithm").value;
  const Kunci = document.getElementById("Kunci").value;

  if (!encryptedText || encryptedText === "Belum Dibuat!") {
    alert("Tidak da Teks Untuk Didekripsi.");
    return;
  }

  let decryptedText;

  if (algorithm === "AES") {
    decryptedText = CryptoJS.AES.decrypt(encryptedText, Kunci).toString(
      CryptoJS.enc.Utf8
    );
  } else if (algorithm === "DES") {
    decryptedText = CryptoJS.DES.decrypt(encryptedText, Kunci).toString(
      CryptoJS.enc.Utf8
    );
  } else if (algorithm === "TripleDES") {
    decryptedText = CryptoJS.TripleDES.decrypt(encryptedText, Kunci).toString(
      CryptoJS.enc.Utf8
    );
  } else if (algorithm === "Rabbit") {
    decryptedText = CryptoJS.Rabbit.decrypt(encryptedText, Kunci).toString(
      CryptoJS.enc.Utf8
    );
  } else if (algorithm === "RC4") {
    decryptedText = CryptoJS.RC4.decrypt(encryptedText, Kunci).toString(
      CryptoJS.enc.Utf8
    );
  } else {
    alert("Pilih Algoritma Yang Ingin Digunakan");
    return;
  }

  document.getElementById("decryptedText").textContent =
    decryptedText || "Dekripsi Gagal Silakan Hubungi 082334100715";
}
