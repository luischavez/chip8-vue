const REGISTER_SIZE = 16
const REGISTER_FLAG = 0xF
const BIT_OFF = 0x0
const BIT_ON = 0x1
const NOT_CARRY = BIT_OFF
const CARRY = BIT_ON
const NOT_BORROW = BIT_ON
const BORROW = BIT_OFF
const NOT_COLLISION = BIT_OFF
const COLLISION = BIT_ON

class Register {
  #i
  #dt
  #st
  #pc
  #data

  constructor() {
    this.#initialize()
  }

  #initialize() {
    this.#data = []

    for (let i = 0; i < REGISTER_SIZE; i++) {
      this.#data[i] = 0x0
    }
  }

  get i() {
    return this.#i
  }

  set i(value) {
    if (value < 0x0) {
      throw new Error(`i out of range: ${value}`)
    }

    this.#i = value & 0xFFFF
  }

  get dt() {
    return this.#dt
  }

  set dt(value) {
    if (value < 0x0) {
      throw new Error(`dt out of range: ${value}`)
    }

    this.#dt = value & 0xFF
  }

  get st() {
    return this.#st
  }

  set st(value) {
    if (value < 0x0) {
      throw new Error(`st out of range: ${value}`)
    }

    this.#st = value & 0xFF
  }

  get pc() {
    return this.#pc
  }

  set pc(value) {
    if (value < 0x0) {
      throw new Error(`pc out of range: ${value}`)
    }

    this.#pc = value & 0xFFFF
  }

  get data() {
    return this.#data
  }

  get(index) {
    if (index < 0 || index > REGISTER_SIZE - 1) {
      throw new Error(`index out of range: ${index}`)
    }

    return this.#data[index]
  }

  set(index, value) {
    if (index < 0 || index > REGISTER_SIZE - 1) {
      throw new Error(`index out of range: ${index}`)
    }

    this.#data[index] = value & 0xFF
  }

  copy(from, to) {
    this.set(to, this.get(from))
  }
}

export {
  Register,
  REGISTER_FLAG,
  BIT_OFF,
  BIT_ON,
  NOT_CARRY,
  CARRY,
  NOT_BORROW,
  BORROW,
  NOT_COLLISION,
  COLLISION
}
