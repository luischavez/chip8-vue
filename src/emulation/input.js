class Keyboard {
  #keys
  #waiting
  #waitedKeys

  constructor() {
    this.#keys = [...Array(0xF).keys()].map(() => false)
    this.#waitedKeys = []
  }

  get keys() {
    return this.#keys
  }

  get waiting() {
    return this.#waiting
  }

  #setKeyStatus(key, status) {
    if (key < 0 || key > 0xF) {
      throw new Error(`Invalid key ${key}`)
    }

    let down = status === 'down' ? true : false

    this.#keys[key] = down

    if (down && this.#waiting) {
      this.#waiting = false
      this.#waitedKeys.push(key)
    }
  }

  wait() {
    this.#waiting = true

    return new Promise((resolve, reject) => {
      let intervalId = setInterval(() => {
        if (!this.#waiting) {
          clearInterval(intervalId)

          let key = this.#waitedKeys.pop()

          if (key) {
            resolve(key)
          } else {
            reject()
          }
        }
      }, 100)
    })
  }

  up(key) {
    this.#setKeyStatus(key, 'up')
  }

  down(key) {
    this.#setKeyStatus(key, 'down')
  }

  upAll() {
    for (let key = 0x0; key <= 0xF; key++) {
      this.up(key)
    }
  }

  isUp(key) {
    if (key < 0 || key > 0xF) {
      throw new Error(`Invalid key ${key}`)
    }

    return !this.#keys[key]
  }

  isDown(key) {
    if (key < 0 || key > 0xF) {
      throw new Error(`Invalid key ${key}`)
    }

    return this.#keys[key]
  }
}

export { Keyboard }
