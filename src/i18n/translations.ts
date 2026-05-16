export type Lang = 'th' | 'en'

export interface Translations {
  appSubtitle: string
  footer: string
  step: { capture: string; crop: string; download: string }
  capture: { heading: string; fromDevice: string; fromCamera: string; shoot: string; cancel: string; error: string }
  crop: { heading: string; hint: string; back: string; confirm: string; alt: string }
  size: { heading: string; unit: string; perSheet: string }
  layout: { heading: string; hint: string; recrop: string; download: string; reset: string }
}

const translations: Record<Lang, Translations> = {
  th: {
    appSubtitle: 'ถ่ายรูปติดบัตร',
    footer: 'ถ่ายรูปติดบัตรออนไลน์ ฟรี ไม่เก็บรูปของคุณ ทุกอย่างทำงานใน browser',
    step: { capture: '1. เลือกรูป', crop: '2. Crop', download: '3. Download' },
    capture: {
      heading: 'เลือกรูปถ่าย',
      fromDevice: 'เลือกรูปจาก device',
      fromCamera: 'ถ่ายจากกล้อง',
      shoot: '📸 ถ่าย',
      cancel: 'ยกเลิก',
      error: 'ไม่สามารถเปิดกล้องได้ กรุณาอนุญาต permission ก่อนนะคะ',
    },
    crop: {
      heading: 'ปรับขอบรูป',
      hint: 'ลากเพื่อปรับตำแหน่งและขนาด',
      back: '← กลับ',
      confirm: 'ยืนยัน Crop →',
      alt: 'รูปที่เลือก',
    },
    size: { heading: 'เลือกขนาดรูป', unit: 'นิ้ว', perSheet: 'รูป/แผ่น' },
    layout: {
      heading: 'Layout รูปติดบัตร',
      hint: 'กระดาษ 4×6 นิ้ว @ 300 DPI — พร้อม print ที่ร้านถ่ายรูป',
      recrop: '← Crop ใหม่',
      download: '⬇ ดาวน์โหลด',
      reset: '🔄 เริ่มใหม่',
    },
  },
  en: {
    appSubtitle: 'ID Photo',
    footer: 'Free online ID photo tool. No upload, runs entirely in browser.',
    step: { capture: '1. Select', crop: '2. Crop', download: '3. Download' },
    capture: {
      heading: 'Select Photo',
      fromDevice: 'Choose from device',
      fromCamera: 'Use camera',
      shoot: '📸 Capture',
      cancel: 'Cancel',
      error: 'Cannot access camera. Please allow camera permission.',
    },
    crop: {
      heading: 'Adjust Crop',
      hint: 'Drag to adjust position and size',
      back: '← Back',
      confirm: 'Confirm Crop →',
      alt: 'Selected photo',
    },
    size: { heading: 'Select Size', unit: 'inch', perSheet: 'photos/sheet' },
    layout: {
      heading: 'ID Photo Layout',
      hint: '4×6" paper @ 300 DPI — ready to print at any photo shop',
      recrop: '← Re-crop',
      download: '⬇ Download',
      reset: '🔄 Start over',
    },
  },
}

export default translations
