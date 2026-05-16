// Photo size specs at 300 DPI on 4x6" paper (1200x1800px)
export const PAPER_W = 1200
export const PAPER_H = 1800

export type PhotoSize = '1in' | '1.5in' | '2in'

const SIZE_PX: Record<PhotoSize, { w: number; h: number }> = {
  '1in':   { w: 300, h: 400 },
  '1.5in': { w: 450, h: 600 },
  '2in':   { w: 600, h: 800 },
}

// Explicit grid per size — remaining space distributed evenly as gutters
const LAYOUT: Record<PhotoSize, { cols: number; rows: number }> = {
  '1in':   { cols: 3, rows: 4 },
  '1.5in': { cols: 2, rows: 3 },
  '2in':   { cols: 2, rows: 2 },
}

export function getPhotoSize(size: PhotoSize) {
  return SIZE_PX[size]
}

export function buildPrintLayout(
  img: HTMLImageElement | HTMLCanvasElement,
  size: PhotoSize,
): HTMLCanvasElement {
  const { w, h } = SIZE_PX[size]
  const { cols, rows } = LAYOUT[size]
  const canvas = document.createElement('canvas')
  canvas.width = PAPER_W
  canvas.height = PAPER_H
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, PAPER_W, PAPER_H)

  const hGap = (PAPER_W - cols * w) / (cols + 1)
  const vGap = (PAPER_H - rows * h) / (rows + 1)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = hGap + c * (w + hGap)
      const y = vGap + r * (h + vGap)
      ctx.drawImage(img, x, y, w, h)
    }
  }
  return canvas
}

export function photoCount(size: PhotoSize): number {
  const { cols, rows } = LAYOUT[size]
  return cols * rows
}
