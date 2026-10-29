# Backend Tracking Point

Sistem RESTful API berbasis Node.js, Express, dan PostgreSQL (menggunakan Prisma ORM) untuk pelacakan dan validasi poin kegiatan mahasiswa.

---

## 🚀 Fitur Utama

- **Autentikasi & Otorisasi**:
  - Registrasi & login akun dengan hashing password menggunakan `bcrypt`.
  - Autentikasi berbasis JSON Web Token (JWT).
  - Role-based authorization (`STUDENT` dan `MODERATOR`).
- **Mahasiswa (Student)**:
  - Profil mahasiswa (NIM, Jurusan, Universitas).
  - Pengajuan permintaan poin kegiatan (`RequestPoint`).
  - Riwayat perolehan poin dan riwayat transaksi status kegiatan.
- **Moderator**:
  - Verifikasi dan validasi pengajuan poin (`approve` atau `reject`).
  - Penambahan saldo poin otomatis ke mahasiswa saat disetujui.
  - Pencatatan log otomatis ke riwayat (`History`).
- **Kegiatan & Histori**:
  - Manajemen master data kegiatan (`Activity`).
  - Log status riwayat (`History`).

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Keamanan**: bcrypt, jsonwebtoken

---

## 📂 Struktur Proyek

```
backend-tracking-point/
├── prisma/
│   ├── schema.prisma              # Skema model database & relasi
│   └── migrations/                # Riwayat migrasi Prisma
├── src/
│   ├── config/
│   │   └── prisma.js              # Instance PrismaClient
│   ├── middleware/
│   │   ├── authMiddleware.js      # Middleware autentikasi & otorisasi JWT
│   │   └── errorMiddleware.js     # Handler error terpusat & 404
│   ├── util/
│   │   └── tokenUtils.js          # Utilitas pembuatan & verifikasi JWT
│   ├── service/                   # Layer Logika Bisnis & Query Database
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── roleService.js
│   │   ├── studentService.js
│   │   ├── moderatorService.js
│   │   ├── pointService.js
│   │   ├── activityService.js
│   │   └── historyService.js
│   ├── controller/                # Layer Pengendali HTTP (Request/Response)
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── roleController.js
│   │   ├── studentController.js
│   │   ├── moderatorController.js
│   │   ├── pointController.js
│   │   ├── activityController.js
│   │   └── historyController.js
│   ├── routes/                    # Definisi Rute API & Mapping Endpoint
│   │   ├── authRouter.js
│   │   ├── userRouter.js
│   │   ├── roleRouter.js
│   │   ├── studentRouter.js
│   │   ├── moderatorRouter.js
│   │   ├── pointRouter.js
│   │   ├── activitiesRouter.js
│   │   └── historyRouter.js
│   └── index.js                   # Entry point Express Server
├── .env.example                   # Template konfigurasi environment
├── package.json
└── README.md
```

---

## ⚙️ Persiapan & Instalasi

1. **Clone repository dan masuk ke direktori**:
   ```bash
   git clone <repo-url>
   cd backend-tracking-point
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan nilai variabel lingkungan pada `.env`:
   ```env
   PORT=2000
   DATABASE_URL="postgresql://user:password@localhost:5432/tracking_point_db?schema=public"
   JWT_SECRET="your_jwt_secret_key"
   ```

4. **Migrasi Database Prisma**:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. **Menjalankan Server**:
   - Mode Development (dengan nodemon):
     ```bash
     npm run dev
     ```
   - Mode Production:
     ```bash
     npm start
     ```

---

## 📡 Dokumentasi Endpoint API

Base URL: `http://localhost:2000/api`

### 1. Autentikasi (`/api/auth`)
| Method | Endpoint | Deskripsi | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Mendaftarkan akun user baru | Tidak |
| `POST` | `/api/auth/login` | Login user & memperoleh JWT token | Tidak |
| `POST` | `/api/auth/logout` | Logout | Ya (`Bearer <token>`) |

### 2. Penetapan Peran (`/api/roles`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/roles/choose-role` | Memilih role `STUDENT` atau `MODERATOR` beserta profilnya |

### 3. Pengguna (`/api/users`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/users` | Mengambil seluruh data pengguna |
| `GET` | `/api/users/:id` | Mengambil data pengguna berdasarkan ID |
| `POST` | `/api/users` | Membuat data pengguna baru |
| `PUT` | `/api/users/:id` | Memperbarui data pengguna |
| `DELETE` | `/api/users/:id` | Menghapus data pengguna |

### 4. Mahasiswa (`/api/students`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/students` | Mengambil semua profil mahasiswa |
| `GET` | `/api/students/:id` | Mengambil profil mahasiswa berdasarkan ID |
| `GET` | `/api/students/:id/history` | Mengambil riwayat poin mahasiswa |
| `GET` | `/api/students/activity/:id` | Mengambil data kegiatan |
| `POST` | `/api/students/request-point/:studentId` | Mengajukan permohonan poin kegiatan |

### 5. Moderator (`/api/moderator`)
| Method | Endpoint | Deskripsi | Body |
|---|---|---|---|
| `POST` | `/api/moderator/handle-request/:id` | Menyetujui atau menolak request point | `{ "moderatorId": 1, "action": "approve" }` |

### 6. Permintaan Poin (`/api/request`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/request` | Mengambil daftar request point (Filter: `?status=pending`) |
| `GET` | `/api/request/:id` | Detail request point berdasarkan ID |
| `GET` | `/api/request/history/:studentId` | Riwayat poin mahasiswa |
| `GET` | `/api/request/student/:studentId/total-points` | Total akumulasi poin mahasiswa |
| `DELETE` | `/api/request/:requestId` | Menghapus pengajuan poin (khusus status pending) |

### 7. Kegiatan (`/api/activities`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/activities` | Mengambil semua daftar kegiatan |
| `GET` | `/api/activities/:id` | Mengambil detail kegiatan |
| `POST` | `/api/activities` | Menambahkan kegiatan baru |

### 8. Riwayat Poin (`/api/histories`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/histories` | Mengambil seluruh log riwayat perolehan/status poin |
| `GET` | `/api/histories/:id` | Mengambil detail riwayat tertentu |
