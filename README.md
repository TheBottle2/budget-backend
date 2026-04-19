# Budget Backend

> 🇹🇷 Türkçe | 🇬🇧 [English](#english)

---

## 🇹🇷 Türkçe

### Proje Tanıtımı

Budget Backend, bütçe takip uygulamasının sunucu tarafıdır. Kullanıcı kimlik doğrulama ve gelir/gider işlemlerini yöneten REST API sunar.

---

### Kullanılan Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 (App Router, saf JavaScript) |
| Veritabanı | MongoDB + Mongoose |
| Doğrulama | Zod |
| Kimlik Doğrulama | JWT + bcryptjs |

---

### Mimari — Klasör Yapısı

```
src/
├── core/
│   ├── config.js          # Ortam değişkenleri
│   ├── db.js              # MongoDB bağlantısı (cached)
│   └── withAuth.js        # JWT yetki kontrolü
│
├── base/
│   ├── BaseModel.js       # Ortak Mongoose şema alanları (DRY)
│   ├── BaseRepo.js        # Ortak CRUD işlemleri
│   └── BaseManager.js     # Ortak iş mantığı katmanı
│
├── features/
│   ├── auth/
│   │   ├── auth.model.js  # Kullanıcı şeması
│   │   ├── auth.repo.js   # Kullanıcı veritabanı işlemleri
│   │   ├── auth.manager.js # Kayıt, giriş, JWT
│   │   ├── auth.service.js # Auth servis katmanı
│   │   └── dto/auth.dto.js # Zod doğrulama şemaları
│   └── transaction/
│       ├── transaction.model.js  # İşlem şeması
│       ├── transaction.repo.js   # İşlem veritabanı işlemleri
│       ├── transaction.manager.js # İşlem iş mantığı
│       ├── transaction.service.js # İşlem servis katmanı
│       └── dto/transaction.dto.js # Zod doğrulama şemaları
│
└── app/
    ├── api/
    │   ├── auth/register/route.js
    │   ├── auth/login/route.js
    │   ├── auth/logout/route.js
    │   ├── transactions/route.js
    │   └── transactions/[id]/route.js
    ├── layout.js
    └── page.js
```

**Katman görevleri:**
- `core/` → Teknik altyapı (DB, config, yetki)
- `base/` → DRY ilkesi — tüm feature'ların miras aldığı temel sınıflar
- `features/` → Her özellik kendi klasöründe (package by feature)
- `app/api/` → Controller katmanı — sadece yönlendirme yapar, iş mantığı içermez

---

### API Uç Noktaları

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | `/api/auth/register` | Kullanıcı kaydı |
| POST | `/api/auth/login` | Kullanıcı girişi |
| POST | `/api/auth/logout` | Çıkış |
| GET | `/api/transactions` | İşlemleri listele |
| POST | `/api/transactions` | Yeni işlem ekle |
| PATCH | `/api/transactions/[id]` | İşlem güncelle |
| DELETE | `/api/transactions/[id]` | İşlem sil |

---

### Kurulum

#### Gereksinimler
- Node.js 18+
- MongoDB

#### 1. Repoyu klonla
```bash
git clone https://github.com/TheBottle2/budget-backend.git
cd budget-backend
```

#### 2. Bağımlılıkları yükle
```bash
npm install
```

#### 3. Ortam değişkenlerini ayarla
`.env.local` dosyası oluştur:
```env
MONGODB_URI=mongodb://localhost:27017/budget-app
JWT_SECRET=gizli-anahtar-degistir
```

#### 4. MongoDB'yi başlat
```bash
sudo systemctl start mongod
```

#### 5. Uygulamayı çalıştır
```bash
npm run dev
```

API `http://localhost:3000/api` üzerinde çalışır.

---

---

## 🇬🇧 English <a name="english"></a>

### About

Budget Backend is the server side of the budget tracking application. It provides a REST API for user authentication and income/expense transaction management.

---

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, plain JavaScript) |
| Database | MongoDB + Mongoose |
| Validation | Zod |
| Authentication | JWT + bcryptjs |

---

### Architecture — Folder Structure

```
src/
├── core/
│   ├── config.js          # Environment variables
│   ├── db.js              # MongoDB connection (cached)
│   └── withAuth.js        # JWT authorization check
│
├── base/
│   ├── BaseModel.js       # Shared Mongoose schema fields (DRY)
│   ├── BaseRepo.js        # Shared CRUD operations
│   └── BaseManager.js     # Shared business logic layer
│
├── features/
│   ├── auth/
│   │   ├── auth.model.js
│   │   ├── auth.repo.js
│   │   ├── auth.manager.js
│   │   ├── auth.service.js
│   │   └── dto/auth.dto.js
│   └── transaction/
│       ├── transaction.model.js
│       ├── transaction.repo.js
│       ├── transaction.manager.js
│       ├── transaction.service.js
│       └── dto/transaction.dto.js
│
└── app/
    ├── api/
    │   ├── auth/register/route.js
    │   ├── auth/login/route.js
    │   ├── auth/logout/route.js
    │   ├── transactions/route.js
    │   └── transactions/[id]/route.js
    ├── layout.js
    └── page.js
```

---

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/transactions` | List transactions |
| POST | `/api/transactions` | Create transaction |
| PATCH | `/api/transactions/[id]` | Update transaction |
| DELETE | `/api/transactions/[id]` | Delete transaction |

---

### Installation

#### Requirements
- Node.js 18+
- MongoDB

#### 1. Clone the repo
```bash
git clone https://github.com/TheBottle2/budget-backend.git
cd budget-backend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure environment variables
Create `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/budget-app
JWT_SECRET=change-this-secret
```

#### 4. Start MongoDB
```bash
sudo systemctl start mongod
```

#### 5. Run the app
```bash
npm run dev
```

API runs on `http://localhost:3000/api`.
