# Features — Picard Web App

| # | Feature | สถานะ | หมายเหตุ |
|---|---------|-------|---------|
| 1 | Upload รูปจาก device | ✅ done | input[type=file] |
| 2 | Capture จาก webcam | ✅ done | getUserMedia API |
| 3 | Crop รูปหน้า | ✅ done | react-image-crop (ratio 3:4) |
| 4 | เลือกขนาด 1" / 1.5" / 2" | ✅ done | standard Thai ID sizes |
| 5 | Preview layout บน canvas 4x6" | ✅ done | Canvas API |
| 6 | Download JPEG ความละเอียดสูง | ✅ done | 1200×1800px @ 300dpi |
| 7 | Responsive (mobile-friendly) | ✅ done | Tailwind CSS |

## Photo Size Specs (300 DPI)
| ขนาด | px | จำนวนรูปใน 4x6" |
|------|----|----------------|
| 1 นิ้ว | 300×300 | ~12 รูป |
| 1.5 นิ้ว | 450×450 | ~6 รูป |
| 2 นิ้ว | 600×600 | ~4 รูป |

---
_อัปเดตล่าสุด: 2026-05-15_
