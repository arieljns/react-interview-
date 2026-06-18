
## Teknologi yang Kita Pakai

Biar aplikasi ini kencang, aman dari bug tipe data, dan gampang dikembangin, ini *tech stack* utama yang kita gunakan:

*   **React (v19.2)**: Library utama buat bikin antarmuka pengguna berbasis komponen yang deklaratif dan dinamis.
*   **Vite (v8.0)**: Tool build dan local dev server yang super cepat biar proses develop kita mulus tanpa nunggu lama.
*   **TypeScript (v6.0)**: Dipakai secara ketat biar kode kita punya *type safety* yang kuat dan meminimalisasi error pas runtime.
*   **Tailwind CSS (v4.0)**: Buat styling yang cepat, responsif, dan gampang di-custom langsung lewat class utilitas.
*   **React Router DOM (v7.1)**: Buat ngatur navigasi antarhalaman dan proteksi rute berdasarkan status booking.
*   **React Hook Form (v7.79) & Zod (v4.4)**: Penanganan form yang enteng tanpa re-render berlebih, lengkap dengan validasi skema input.
*   **React Konva (v19.2)**: Library berbasis HTML5 2D Canvas buat ngegambar peta parkir yang interaktif secara fleksibel.

---

##  Fitur-Fitur Utama

1.  **Peta Parkir Interaktif**: Peta area parkir berbasis canvas yang otomatis terupdate kalau ada slot yang kosong, terisi, atau lagi dalam perbaikan (*maintenance*).
2.  **Filter Ukuran Mobil**: Membantu pengguna mencari slot parkir yang pas sesuai dengan ukuran kendaraan mereka (Kecil, Sedang, atau Besar).
3.  **Reservasi Kiosk Mandiri**: Formulir pendaftaran reservasi parkir yang aman dengan validasi nomor plat, nama driver, dan estimasi durasi parkir.
4.  **Live Session Timer**: Timer hitung mundur real-time buat memantau sisa waktu parkir lengkap dengan peringatan kalau waktu sesi sudah habis (overtime).
5.  **Biaya dalam Rupiah (Rp)**: Semua tarif parkir dan denda overtime sudah menggunakan format mata uang Rupiah secara rapi (contoh: `Rp 9.000` atau `Rp 21.500`).
6.  **Dialog Konfirmasi**: Modal konfirmasi tambahan buat mencegah salah klik saat memilih slot atau ketika mau mengakhiri sesi parkir (*checkout*).
7.  **Theme Engine Gelap & Terang**: Toggle tema global yang otomatis menyesuaikan visual di seluruh bagian layout aplikasi secara seragam.

---

##  Cara Mulai Menjalankan Proyek

Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/) di komputermu ya. Kalau sudah, ikuti langkah berikut:

### 1. Persiapan Awal
Buka terminal di folder proyek ini, lalu pasang semua dependensi yang dibutuhkan:
```bash
npm install
```

### 2. Jalankan Mode Pengembangan (Development)
Untuk menyalakan server lokal Vite, jalankan perintah ini:
```bash
npm run dev
```
Setelah itu, silakan buka alamat [http://localhost:5173](http://localhost:5173) di browser kesayanganmu.

### 3. Cek Kualitas Kode & Build Produksi
Sebelum kamu melakukan push atau merge code, pastikan untuk selalu memeriksa dua hal ini:

*   **Pemeriksaan Linter (ESLint)**:
    ```bash
    npm run lint
    ```
*   **Build Versi Produksi**:
    ```bash
    npm run build
    ```

---

## Aturan Main buat Developer (Guidelines)

*   **Pakai Komponen Bersama**: Jangan tulis class Tailwind yang panjang secara manual untuk membuat tombol atau box baru. Gunakan komponen `<Button />` dan `<Card />` yang sudah tersedia di folder `components/` biar tampilan UI kita seragam.
*   **Pemisahan Logika**: Jangan taruh logika penghitungan waktu (*timer*) langsung di dalam halaman UI. Manfaatkan custom hook yang sudah dibuat (seperti `useBookingSession`) untuk menghindari bug *stale closure*.
*   **Jangan Tulis Komentar**: Semua komentar di dalam kode sumber telah dibersihkan demi keterbacaan yang optimal. Tulis saja penjelasan fitur barumu di berkas dokumentasi atau `README.md` ini, bukan di dalam kode pemrograman.
