const caseOptions = {
  Server: [
    { name: "Overload", threat: "Denial of Service" },
    { name: "Unauthorized Access", threat: "Spoofing" },
    { name: "DDoS", threat: "Denial of Service'" },
  ],
  Database: [
    { name: "SQL Injection", threat: "Tampering" },
    { name: "Data Breach", threat: "Information Disclosure" },
    { name: "Data Corruption", threat: "Tampering'" },
  ],
  "Data Pengguna": [
    { name: "Phishing", threat: "Spoofing'" },
    { name: "Identity Theft", threat: "Information Disclosure'" },
    { name: "Data Leak", threat: "'Information Disclosure" },
  ],
  "API Eksternal": [
    { name: "Man-in-the-Middle", threat: "'Tampering" },
    { name: "API Abuse", threat: "'Denial of Service" },
    { name: "Invalid Requests", threat: "Denial' of Service" },
  ],
};

const descOptions = {
  Overload:
    "Situasi di mana server menerima lebih banyak permintaan daripada yang dapat ditangani, menyebabkan penurunan kinerja atau kegagalan layanan.",
  "Unauthorized Access":
    "Akses yang tidak sah ke sistem atau data, sering kali dilakukan oleh pengguna yang tidak memiliki izin yang sesuai.",
  "DDoS (Distributed Denial of Service)":
    "Serangan di mana banyak sistem diserang secara bersamaan untuk membanjiri sumber daya server, mengakibatkan layanan menjadi tidak tersedia.",
  "SQL Injection":
    "Teknik serangan di mana penyerang menyisipkan kode SQL berbahaya ke dalam kueri, memungkinkan akses tidak sah ke database dan data sensitif.",
  "Data Breach":
    "Situasi di mana data sensitif, seperti informasi pribadi atau finansial, diakses atau dicuri oleh pihak yang tidak berwenang.",
  "Data Corruption":
    "Kerusakan data yang terjadi akibat kesalahan perangkat lunak, kesalahan manusia, atau serangan, yang dapat membuat data tidak dapat digunakan atau salah.",
  Phishing:
    "Teknik penipuan di mana penyerang mencoba mendapatkan informasi sensitif dengan menyamar sebagai entitas tepercaya, sering melalui email atau pesan palsu.",
  "Identity Theft":
    "Pencurian identitas di mana penyerang menggunakan informasi pribadi seseorang untuk melakukan penipuan atau kejahatan lain.",
  "Data Leak":
    "Kebocoran data di mana informasi sensitif diungkapkan secara tidak sah, baik karena kesalahan manusia, celah keamanan, atau serangan.",
  "Man-in-the-Middle":
    "Serangan di mana penyerang menyusup ke dalam komunikasi antara dua pihak untuk mencuri informasi atau menyuntikkan data berbahaya.",
  "API Abuse":
    "Penggunaan berlebihan atau penyalahgunaan API yang dapat mengakibatkan kinerja buruk atau kelebihan beban pada layanan.",
  "Invalid Requests":
    "Permintaan yang tidak valid atau salah format yang dikirimkan ke API, yang dapat mengakibatkan kesalahan dalam pemrosesan dan potensi eksploitasi.",
};
const mitigationOptions = {
  "Denial of Service": "Terapkan pembatasan bandwidth.",
  "Denial of Service'":
    "Terapkan solusi mitigasi DDoS seperti pemantauan traffic dan filtering.",
  Spoofing: "Gunakan autentikasi dua faktor.",
  Tampering: "Gunakan parameterized queries dan ORM.",
  "Information Disclosure": "Enkripsi data sensitif.",
  "Tampering'": "Implementasikan sistem backup dan restore.",
  "Spoofing'": "Edukasi pengguna tentang tanda-tanda phishing.",
  "Information Disclosure'": "Gunakan monitoring identitas dan layanan alert.",
  "'Information Disclosure": "Terapkan kontrol akses ketat.",
  "'Tampering": "Gunakan HTTPS untuk memastikan data dienkripsi.",
  "'Denial of Service":
    "Batasi jumlah permintaan dan implementasikan throttling.",
  "Denial' of service": "Validasi input di sisi server.",

  // Tambahkan mitigasi lainnya sesuai ancaman
};

document.addEventListener("DOMContentLoaded", () => {
  // Event listener untuk dropdown aset
  document.getElementById("asset").addEventListener("change", function () {
    const selectedAsset = this.value;
    const caseDropdown = document.getElementById("case");

    caseDropdown.innerHTML = '<option value="">Pilih kasus</option>';

    if (selectedAsset) {
      const cases = caseOptions[selectedAsset];
      cases.forEach((caseItem) => {
        const option = document.createElement("option");
        option.value = caseItem.name;
        option.textContent = caseItem.name;
        caseDropdown.appendChild(option);
      });
    }
  });

  // Event listener untuk dropdown kasus
  document.getElementById("case").addEventListener("change", function () {
    const selectedCase = this.value;
    const selectedAsset = document.getElementById("asset").value;

    const selectedThreat =
      caseOptions[selectedAsset].find((c) => c.name === selectedCase)?.threat ||
      "";
    document.getElementById("threatDescription").textContent = selectedThreat;
  });

  // Event listener untuk tombol Hitung
  document.getElementById("submitBtn").addEventListener("click", function () {
    const asset = document.getElementById("asset").value;
    const caseValue = document.getElementById("case").value;
    const damage = document.getElementById("damage").value;
    const reproducibility = document.getElementById("reproducibility").value;
    const exploitability = document.getElementById("exploitability").value;
    const affectedUsers = document.getElementById("affectedUsers").value;
    const discoverability = document.getElementById("discoverability").value;

    // Cek apakah ada nilai yang kosong
    if (
      !asset ||
      !caseValue ||
      !damage ||
      !reproducibility ||
      !exploitability ||
      !affectedUsers ||
      !discoverability
    ) {
      alert("Semua kolom harus diisi.");
      return;
    }

    // Cek nilai maksimal
    if (
      damage > 10 ||
      reproducibility > 10 ||
      exploitability > 10 ||
      affectedUsers > 10 ||
      discoverability > 10
    ) {
      alert("Nilai yang dimasukkan tidak boleh lebih dari 10.");
      return;
    }

    const totalScore =
      parseInt(damage) +
      parseInt(reproducibility) +
      parseInt(exploitability) +
      parseInt(affectedUsers) +
      parseInt(discoverability);

    // Tentukan tingkat risiko
    let riskLevel;
    if (totalScore <= 25) {
      riskLevel = "Rendah";
    } else if (totalScore <= 35) {
      riskLevel = "Sedang";
    } else {
      riskLevel = "Tinggi";
    }

    // Tambahkan entri ke tabel
    const tableBody = document.getElementById("tableBody");
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = new Date().toLocaleString();
    row.insertCell(1).textContent = asset;
    row.insertCell(2).textContent = caseValue;
    row.insertCell(3).textContent =
      document.getElementById("threatDescription").textContent;
    row.insertCell(4).textContent = totalScore;
    row.insertCell(5).textContent = riskLevel; // Kolom baru untuk risiko

    // Tambahkan mitigasi di kolom baru
    const selectedName =
      document.getElementById("threatDescription").textContent;
    const mitigation =
      mitigationOptions[selectedName] || "Tidak ada mitigasi yang tersedia.";
    row.insertCell(6).textContent = mitigation; // Kolom mitigasi
  });

  // Event listener untuk urutkan risiko naik
  document
    .getElementById("sortUp")
    .addEventListener("click", () => sortTable(true));

  // Event listener untuk urutkan risiko turun
  document
    .getElementById("sortDown")
    .addEventListener("click", () => sortTable(false));

  // Fungsi untuk mengurutkan tabel
  function sortTable(isAscending) {
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.rows).slice(1); // Ambil semua baris kecuali header
    const sortedRows = rows.sort((a, b) => {
      const riskA = a.cells[5].textContent; // Kolom risiko
      const riskB = b.cells[5].textContent;

      const riskLevels = ["Rendah", "Sedang", "Tinggi"];
      const comparison = riskLevels.indexOf(riskA) - riskLevels.indexOf(riskB);
      return isAscending ? comparison : -comparison;
    });

    sortedRows.forEach((row) => table.appendChild(row));
  }
});