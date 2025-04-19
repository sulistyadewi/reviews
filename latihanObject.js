// 1. Buat object mobil dengan properti merk, warna, dan tahun. Tampilkan semua nilainya.

let mobil = {
  merk: "avanza",
  warna: "silver",
  tahun: 2020,
};

console.log(mobil, "ini soal 1"); // { merk: 'avanza', warna: 'silver', tahun: 2020 }

//
// 2. Tambahkan properti pemilik ke object mobil.

let mobil1 = {
  merk: "avanza",
  warna: "silver",
  tahun: 2020,
};

mobil1.pemilik = "sulis";

console.log(mobil1, "ini soal 2"); // { merk: 'avanza', warna: 'silver', tahun: 2020, pemilik: 'sulis' }

//
// 3. Ubah warna mobil menjadi "merah".

let mobil2 = {
  merk: "avanza",
  warna: "silver",
  tahun: 2020,
  pemilik: "sulis",
};

mobil2.warna = "merah";

console.log(mobil2, "ini soal 3"); // { merk: 'avanza', warna: 'merah', tahun: 2020, pemilik: 'sulis' }

//
// 4. Gunakan Object.keys dan Object.values untuk menampilkan semua key dan value.

let mobil3 = {
  merk: "avanza",
  warna: "merah",
  tahun: 2020,
  pemilik: "sulis",
};

let mobil3Key = Object.keys(mobil3);
let mobil3Value = Object.values(mobil3);

console.log(mobil3Key, mobil3Value, "ini soal 4"); // ["merk", "warna", "tahun", "pemilik"][("avanza", "merah", 2020, "sulis")];

//
// 5. Buat fungsi yang menerima object dan mencetak setiap properti dan nilainya satu per satu.

function showProperti(obj) {
  for (let key in obj) {
    console.log(`${key}: ${obj[key]}`);
  }
}

let mobil4 = {
  merk: "avanza",
  warna: "merah",
  tahun: 2020,
  pemilik: "sulis",
};

showProperti(mobil4);
