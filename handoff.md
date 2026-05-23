# Picard Web — Handoff

**Project:** ถ่ายรูปติดบัตรออนไลน์
**Production:** https://picard.thana.in.th
**Git:** https://github.com/thana19/picard
**Deploy:** Cloudflare Pages (`picard-web`) — UAT branch: `uat`, PRD branch: `main`

---

## สถานะล่าสุด

Project พร้อมใช้งาน Production แล้วค่ะ ไม่มี bug ค้างอยู่

### Features ที่ ship แล้ว
- อัปโหลดรูป + ถ่ายจากกล้อง (webcam / mobile)
- Crop หน้า สัดส่วน 3:4
- เลือกขนาด 1" / 1.5" / 2"
- Layout อัตโนมัติบนกระดาษ 4×6" @ 300 DPI (12 / 6 / 4 รูป ตามลำดับ)
- Download JPEG
- 2 ภาษา ไทย / อังกฤษ (localStorage `picard_lang`)
- Google Analytics G-20JWM067YT

### Commits สำคัญล่าสุด
- `d7bc904` — fix 1.5in layout เป็น 3 แถว (6 รูป/แผ่น)
- `1584fa8` — เพิ่มฟีเจอร์ 2 ภาษา ไทย/อังกฤษ
- `337a23d` — fix crop mobile + iOS camera black screen

---

## Bug Fixes ที่ confirm แล้ว
ดูรายละเอียดใน [`fix.md`](./fix.md)
- Crop ไม่ตรงบน mobile → `src/components/PhotoCrop.tsx`
- กล้องดำบน iOS Safari → `src/components/PhotoCapture.tsx`

---

## Tech Stack
- React + Vite (TypeScript), Tailwind CSS
- `react-image-crop` สำหรับ crop
- Canvas API สำหรับ layout
- `src/utils/canvas.ts` — logic หลักทั้งหมด (LAYOUT config per-size, distributed spacing)
- `src/i18n/` — LanguageContext + translations

---

## Deploy Workflow (ห้ามข้าม)
1. ขอยืนยันพี่หนุ่มก่อนทุกครั้ง
2. `npm run build` → deploy UAT → test
3. deploy PRD → push git

```bash
npm run build
npx wrangler pages deploy ./dist --project-name picard-web --branch uat
npx wrangler pages deploy ./dist --project-name picard-web --branch main
```

---

## Suggested Skills for Next Session
- `handoff` — อัปเดตไฟล์นี้ก่อน push ทุกครั้ง
- `grill-with-docs` — ก่อน implement feature ใหม่ใดๆ
