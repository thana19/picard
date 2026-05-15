# Fix Log — Picard Web

## [2026-05-15 16:08] Crop ไม่ตรงบน mobile

**อาการ:** crop area บน mobile แสดงผลไม่ตรงกับรูปที่ได้จริง ผลลัพธ์เลื่อนออกจากตำแหน่งที่เลือก

**สาเหตุ:** `react-image-crop` ใช้ `unit: '%'` — crop ค่า x/y/w/h เป็น % อยู่แล้ว ต้องแปลงเป็น natural pixels ครั้งเดียว แต่ code เดิมคูณ `scaleX/scaleY` ซ้ำอีกรอบใน `drawImage()` ทำให้ offset ผิดบน mobile ที่ displayed size ต่างจาก naturalWidth มาก

**วิธีแก้:** ลบ `* scaleX` / `* scaleY` ออกจาก `drawImage()` และ simplify การคำนวณ canvas ใน `PhotoCrop.tsx`

**ไฟล์:** `src/components/PhotoCrop.tsx`

---

## [2026-05-15 16:08] กล้องไม่แสดงภาพบน iOS Safari (หน้าจอดำ)

**อาการ:** กด "ถ่ายจากกล้อง" และ grant permission แล้ว แต่ video element เป็นสีดำ ไม่แสดง camera stream

**สาเหตุ:** iOS Safari ต้องการให้ attach `srcObject` กับ `video` element หลัง DOM mount จริงๆ และต้องรอ event `onloadedmetadata` ก่อนเรียก `play()` — การ set `srcObject` ก่อน render หรือใช้ `requestAnimationFrame` ยังเร็วเกินไปสำหรับ iOS

**วิธีแก้:**
1. แยก `setStreaming(true)` ออกจากการ attach stream
2. ใช้ `useEffect` ที่ depend บน `streaming` เพื่อ attach `srcObject` หลัง video element mount
3. รอ `onloadedmetadata` ก่อนเรียก `video.play()`
4. ลด video constraints — เอา `width/height ideal` ออก ให้ iOS เลือก resolution เอง

**ไฟล์:** `src/components/PhotoCapture.tsx`
