// 1. Buat array angka dari 1 sampai 10. Gunakan map untuk mengalikan setiap angka dengan 2.

let angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let hasil = angka.map((x) => x * 2);
console.log(hasil, "ini soal 1"); // [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20  ]

//
// 2. Buat array nama buah dan gunakan filter untuk hanya mengambil buah dengan panjang nama > 5 karakter.

let fruits = ["apel", "mangga", "jeruk", "strawberry", "anggur"];

let fruitsFilter = fruits.filter((fruit) => fruit.length > 5);
console.log(fruitsFilter, "ini soal 2"); // [ 'mangga', 'strawberry', 'anggur' ]

//
// 3. Gunakan reduce untuk menjumlahkan semua angka dalam array [5, 10, 15, 20].

let angka1 = [5, 10, 15, 20];
let angkaAwal = 0;

let jumlah = angka1.reduce((a, b) => a + b, angkaAwal);
console.log(jumlah, "ini soal 3"); //50

//
// 4. Buat array string lalu ubah menjadi huruf kapital semua menggunakan map.

let nama = ["sulis", "caca", "kayes", "zizi"];

let namaBaru = nama.map((e) => e.toUpperCase());
console.log(namaBaru, "ini soal 4"); // [ 'SULIS', 'CACA', 'KAYES', 'ZIZI' ]

//
// 5. Gunakan splice untuk mengganti elemen ke-2 dalam array dengan nilai baru.

let hari = ["senin", "selasa", "kamis", "jumat"];
hari.splice(2, 1, "rabu");

console.log(hari, "ini soal 5"); // [ 'senin', 'selasa', 'rabu', 'jumat' ]
