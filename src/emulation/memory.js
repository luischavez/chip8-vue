const RAM_SIZE = 4096
const MAX_PROGRAM_SIZE = 3584
const RAM_INIT = 0x0
const FONT_INIT = 0x50
const EXTENDED_FONT_INIT = 0xA0
const INTERPRETER_END = 0x1FF
const PROGRAM_INIT = 0x200
const PROGRAM_END = 0xFFF

import { normalFont, extendedFont } from './fonts'

class HexNumber {
  #value
  #size

  constructor(value, size) {
    this.#value = value
    this.#size = size
  }

  get hex() {
    let hex = this.#value.toString(16).toUpperCase()
    let zeros = this.#size - hex.length

    for (let i = 0; i < zeros; i++) {
      hex = `0${hex}`
    }

    return hex
  }

  get int() {
    return this.#value
  }
}

class OPCode {
  #value

  constructor(value, hex = false) {
    this.#value = hex ? parseInt(value, 16) : value
  }

  get value() {
    return new HexNumber(this.#value, 4)
  }

  get instruction() {
    return new HexNumber((this.#value >> 0xc) & 0xF, 1)
  }

  get address() {
    return new HexNumber(this.#value & 0xFFF, 3)
  }

  get kk() {
    return new HexNumber(this.#value & 0xFF, 2)
  }

  get x() {
    return new HexNumber((this.#value >> 0x8) & 0xF, 1)
  }

  get y() {
    return new HexNumber((this.#value >> 0x4) & 0xF, 1)
  }

  get nibble() {
    return new HexNumber(this.#value & 0xF, 1)
  }
}

class RAM {
  #data
  #programIndex

  constructor() {
    this.#initialize()
    this.#loadFonts()
  }

  #initialize() {
    this.#data = []
    this.#programIndex = 0x0

    for (let i = 0; i < RAM_SIZE; i++) {
      this.#data[i] = 0x0
    }
  }

  #loadFonts() {
    for (let i = 0; i < normalFont.length; i++) {
      this.#data[FONT_INIT + i] = normalFont[i] & 0xFF
    }
    for (let i = 0; i < extendedFont.length; i++) {
      this.#data[EXTENDED_FONT_INIT + i] = extendedFont[i] & 0xFF
    }
  }

  get data() {
    return this.#data
  }

  get programIndex() {
    return this.#programIndex
  }

  load(data) {
    if (data.length > MAX_PROGRAM_SIZE) {
      throw new Error(`memory overflow, max program size: ${MAX_PROGRAM_SIZE}`);
    }

    this.#programIndex = PROGRAM_INIT

    var currentIndex = this.#programIndex
    for (let i = 0; i < data.length; i++) {
      this.#data[currentIndex++] = data[i] & 0xFF
    }
  }

  read(address) {
    if (address < RAM_INIT || address > PROGRAM_END) {
      throw new Error(`address out of range: ${address}`)
    }

    return this.#data[address]
  }

  set(address, value) {
    if (address < RAM_INIT || address > PROGRAM_END) {
      throw new Error(`address out of range: ${address}`)
    }

    this.#data[address] = value & 0xFF
  }

  opcode(address) {
    const leftByte = this.read(address)
    const rightByte = this.read(address + 1)

    const value = (leftByte << 0x8) | (rightByte & 0xFF)

    return new OPCode(value)
  }
}

export {
  HexNumber,
  OPCode,
  RAM,
  MAX_PROGRAM_SIZE,
  RAM_INIT,
  FONT_INIT,
  EXTENDED_FONT_INIT,
  PROGRAM_INIT,
  PROGRAM_END
}
