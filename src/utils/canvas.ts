// Photo size specs at 300 DPI on 4x6" paper (1200x1800px)
export const PAPER_W = 1200
export const PAPER_H = 1800
export const PADDING = 20

export type PhotoSize = '1in' | '1.5in' | '2in'

const SIZE_PX: Record<PhotoSize, { w: number; h: number }> = {
  '1in':   { w: 300, h: 400 },
  '1.5in': { w: 450, h: 600 },
  '2in':   { w: 600, h: 800 },
}

export function getPhotoSize(size: PhotoSize) {
  return SIZE_PX[size]
}

export function buildPrintLayout(
  img: HTMLImageElement | HTMLCanvasElement,
  size: PhotoSize,
): HTMLCanvasElement {
  const { w, h } = SIZE_PX[size]
  const canvas = document.createElement('canvas')
  canvas.width = PAPER_W
  canvas.height = PAPER_H
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, PAPER_W, PAPER_H)

  const cols = Math.floor((PAPER_W - PADDING) / (w + PADDING))
  const rows = Math.floor((PAPER_H - PADDING) / (h + PADDING))

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = PADDING + c * (w + PADDING)
      const y = PADDING + r * (h + PADDING)
      ctx.drawImage(img, x, y, w, h)
    }
  }
  return canvas
}

export function photoCount(size: PhotoSize): number {
  const { w, h } = SIZE_PX[size]
  const cols = Math.floor((PAPER_W - PADDING) / (w + PADDING))
  const rows = Math.floor((PAPER_H - PADDING) / (h + PADDING))
  return cols * rows
}
