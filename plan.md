# Plan — Picard Web App

## วัตถุประสงค์
Web version ของ Android app "Picard" สำหรับถ่ายรูปติดบัตร ใช้งานได้บนทุก device ผ่าน browser

## Tech Stack
- **Framework**: React + Vite (TypeScript)
- **Styling**: Tailwind CSS
- **Crop**: react-image-crop
- **Image Composite**: Canvas API
- **Deploy**: Cloudflare Pages
- **Domain**: picard.thana.in.th
- **Git**: https://github.com/thana19/picard

## ขั้นตอน

| # | งาน | สถานะ | วันที่ |
|---|-----|-------|--------|
| 1 | สร้าง plan.md และ features.md | ✅ done | 2026-05-15 |
| 2 | Scaffold React + Vite + Tailwind | ✅ done | 2026-05-15 |
| 3 | Build PhotoCapture component | ✅ done | 2026-05-15 |
| 4 | Build PhotoCrop component | ✅ done | 2026-05-15 |
| 5 | Build SizeSelector + PrintLayout | ✅ done | 2026-05-15 |
| 6 | Setup wrangler.jsonc + Git | ✅ done | 2026-05-15 |

## Deploy Workflow
1. ถามพี่หนุ่มก่อน
2. Deploy UAT (preview branch)
3. Test
4. Deploy PRD (main branch → picard.thana.in.th)
5. Push Git

---
## ถัดไป
- Deploy UAT บน Cloudflare Pages
- Test บน UAT URL
- Connect custom domain picard.thana.in.th
- Deploy PRD

_อัปเดตล่าสุด: 2026-05-15_
