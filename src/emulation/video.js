const STANDARD_SCREEN_WIDTH = 64
const STANDARD_SCREEN_HEIGHT = 32
const STANDARD_SPRITE_WIDTH = 8
const STANDARD_SPRITE_HEIGHT = 16
const EXTENDED_SCREEN_WIDTH = 128
const EXTENDED_SCREEN_HEIGHT = 64
const EXTENDED_SPRITE_WIDTH = 16
const EXTENDED_SPRITE_HEIGHT = 16

class VRAM {
  #screenWidth
  #screenHeight
  #spriteWidth
  #spriteHeight
  #bufferSize
  #buffer
  #mode

  constructor() {
    this.#buffer = []
    this.mode = 'standard';
  }

  set mode(value) {
    this.#mode = value
    if (value === 'extended') {
      this.#screenWidth = EXTENDED_SCREEN_WIDTH
      this.#screenHeight = EXTENDED_SCREEN_HEIGHT
      this.#spriteWidth = EXTENDED_SPRITE_WIDTH
      this.#spriteHeight = EXTENDED_SPRITE_HEIGHT
    } else {
      this.#screenWidth = STANDARD_SCREEN_WIDTH
      this.#screenHeight = STANDARD_SCREEN_HEIGHT
      this.#spriteWidth = STANDARD_SPRITE_WIDTH
      this.#spriteHeight = STANDARD_SPRITE_HEIGHT
    }

    this.#bufferSize = this.#screenWidth * this.#screenHeight
    this.clear()
  }

  get mode() {
    return this.#mode
  }

  get screenWidth() {
    return this.#screenWidth
  }

  get screenHeight() {
    return this.#screenHeight
  }

  get spriteWidth() {
    return this.#spriteWidth
  }

  get spriteHeight() {
    return this.#spriteHeight
  }

  get bufferSize() {
    return this.#bufferSize
  }

  get buffer() {
    return this.#buffer
  }

  toIndex(x, y) {
    return this.#screenWidth * y + x
  }

  toX(index) {
    return index % this.#screenWidth
  }

  toY(index) {
    return index / this.#screenHeight
  }

  get(x, y) {
    if ((x < 0 || x > this.#screenWidth) || (y < 0 || y > this.#screenHeight)) {
      throw new Error(`Invalid coordinates: ${x} and ${y}`)
    }

    let index = this.toIndex(x, y)
    return this.#buffer[index]
  }

  set(x, y, pixel) {
    if ((x < 0 || x > this.#screenWidth) || (y < 0 || y > this.#screenHeight)) {
      throw new Error(`Invalid coordinates: ${x} and ${y}`)
    }

    let index = this.toIndex(x, y)
    this.#buffer[index] = pixel
  }

  xor(x, y, pixel) {
    if ((x < 0 || x > this.#screenWidth) || (y < 0 || y > this.#screenHeight)) {
      throw new Error(`Invalid coordinates: ${x} and ${y}`)
    }

    let index = this.toIndex(x, y)
    let unset = this.#buffer[index] & pixel

    this.#buffer[index] ^= pixel

    return unset
  }

  clear() {
    for (let i = 0; i < this.#bufferSize; i++) {
      this.#buffer[i] = 0
    }
  }
}

export {
  VRAM,
  STANDARD_SCREEN_WIDTH,
  STANDARD_SCREEN_HEIGHT,
  STANDARD_SPRITE_WIDTH,
  STANDARD_SPRITE_HEIGHT,
  EXTENDED_SCREEN_WIDTH,
  EXTENDED_SCREEN_HEIGHT,
  EXTENDED_SPRITE_WIDTH,
  EXTENDED_SPRITE_HEIGHT
}
