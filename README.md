# 📸 Picard — ถ่ายรูปติดบัตร

Web app สำหรับถ่ายรูปติดบัตรออนไลน์ ฟรี ไม่ต้องติดตั้ง app ทุกอย่างทำงานใน browser ไม่มีการเก็บรูปของคุณ

🔗 **https://picard.thana.in.th**

---

## ✨ Features

| Feature | รายละเอียด |
|---------|-----------|
| 📁 อัปโหลดรูป | เลือกรูปจาก device ได้ทุกชนิด |
| 📷 ถ่ายจากกล้อง | ใช้ webcam / กล้องมือถือถ่ายสดได้เลย |
| ✂️ Crop หน้า | ปรับขอบรูปสัดส่วน 3:4 (มาตรฐานรูปติดบัตร) |
| 📐 เลือกขนาด | 1 นิ้ว / 1.5 นิ้ว / 2 นิ้ว (ขนาดนิยมในไทย) |
| 🖨️ Layout อัตโนมัติ | จัดรูปลงกระดาษ 4×6 นิ้ว @ 300 DPI อัตโนมัติ |
| ⬇️ Download | บันทึกเป็น JPEG ความละเอียดสูง พร้อม print ที่ร้านได้เลย |
| 📱 Responsive | ใช้งานได้ทั้งมือถือและคอมพิวเตอร์ |

### Photo Size Specs

| ขนาด | ความละเอียด | จำนวนรูปใน 4×6" |
|------|------------|----------------|
| 1 นิ้ว | 300×400 px | 12 รูป |
| 1.5 นิ้ว | 450×600 px | 6 รูป |
| 2 นิ้ว | 600×800 px | 4 รูป |

---

## 🛠 Tech Stack

- **Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS
- **Crop:** react-image-crop
- **Image processing:** Canvas API
- **Deploy:** Cloudflare Pages

---

## 🚀 การ Deploy

### Prerequisites

- Node.js 18+
- Cloudflare account
- `CLOUDFLARE_API_TOKEN` environment variable

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. Development

```bash
npm run dev
# เปิด http://localhost:5173
```

### 3. Build

```bash
npm run build
# output ที่ dist/
```

### 4. Deploy UAT

```bash
npx wrangler pages deploy ./dist --project-name picard-web --branch uat
```

UAT URL: `https://uat.picard-web.pages.dev`

### 5. Deploy Production

```bash
npx wrangler pages deploy ./dist --project-name picard-web --branch main
```

Production URL: `https://picard.thana.in.th`

### 6. Custom Domain (ครั้งแรกครั้งเดียว)

เพิ่ม CNAME ใน Cloudflare DNS:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `picard` | `picard-web.pages.dev` | ✅ Proxied |

---

## 📁 Project Structure

```
picard/
├── src/
│   ├── components/
│   │   ├── PhotoCapture.tsx   # upload / webcam
│   │   ├── PhotoCrop.tsx      # crop ด้วย react-image-crop
│   │   ├── SizeSelector.tsx   # เลือกขนาด 1"/1.5"/2"
│   │   └── PrintLayout.tsx    # canvas layout + download
│   ├── utils/
│   │   └── canvas.ts          # logic จัดรูปลงกระดาษ 4×6"
│   ├── App.tsx
│   └── main.tsx
├── plan.md       # แผนการพัฒนา
├── features.md   # รายการ features
├── fix.md        # บันทึก bug fixes
└── wrangler.jsonc
```

---

## 📜 Deploy Workflow

1. ถามก่อนทุกครั้ง
2. Deploy UAT → test
3. Deploy PRD
4. Push Git

---

ต้นแบบจาก [Picard Android App](https://thana.in.th/post/review-picard) โดย [thana.in.th](https://thana.in.th)
