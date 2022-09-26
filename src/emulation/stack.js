const STACK_SIZE = 16

class Stack {
  #addresses
  #pointer

  constructor() {
    this.#initialize()
  }

  #initialize() {
    this.#addresses = []
    this.#pointer = 0x0

    for (let i = 0; i < STACK_SIZE; i++) {
      this.#addresses[i] = 0x0
    }
  }

  pop() {
    if (this.#pointer === 0) {
      throw new Error('stack overflow')
    }

    return this.#addresses[--this.#pointer]
  }

  push(address) {
    if (this.#pointer == STACK_SIZE) {
      throw new Error('stack overflow')
    }

    this.#addresses[this.#pointer++] = address
  }
}

export { Stack, STACK_SIZE }
