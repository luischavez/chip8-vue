import { Keyboard } from './input'
import { RAM } from './memory'
import { Register } from './register'
import { Stack } from './stack'
import { VRAM } from './video'
import { resolveInstruction } from './instructions'

const TIMER_HZ = 60
const UPDATE_HZ = 500

class Chip {
  #keyboard
  #ram
  #register
  #stack
  #vram
  #running
  #renderIntervalId
  #updateIntervalId
  #timerIntervalId

  constructor() {
    this.reset()
  }

  get keyboard() {
    return this.#keyboard
  }

  get ram() {
    return this.#ram
  }

  get register() {
    return this.#register
  }

  get stack() {
    return this.#stack
  }

  get vram() {
    return this.#vram
  }

  get running() {
    return this.#running
  }

  #beep() {
    // TODO: beep
    console.log('beep')
  }

  #step() {
    if (!this.#keyboard.waiting) {
      let opcode = this.#ram.opcode(this.#register.pc)

      this.#register.pc += 2

      let instruction = resolveInstruction(opcode)

      if (instruction) {
        instruction(opcode, this)
      } else {
        console.error(`Instruction not found: ${opcode.value.hex}`)
      }
    }

    if (this.#register.st > 0) {
      this.#beep()
    }
  }

  #decrementCounters() {
    this.#register.dt > 0 && this.#register.dt--
    this.#register.st > 0 && this.#register.st--
  }

  start(draw, log) {
    this.#running = true

    this.#register.pc = this.#ram.programIndex

    const RENDER_FREQUENCY = 1_000.0 / TIMER_HZ
    const UPDATE_FREQUENCY = 1_000.0 / UPDATE_HZ

    var lastRenderTime = (new Date()).getTime()
    var lastUpdateTime = (new Date()).getTime()
    var lastTimerTime = (new Date()).getTime()

    var pendingRenderTime = 0
    var pendingUpdateTime = 0
    var pendingTimerTime = 0

    var updates = 0
    var renders = 0

    var drawing = false
    var updating = false

    this.#renderIntervalId = setInterval(() => {
      if (drawing) return

      let currentTime = (new Date).getTime()
      pendingRenderTime += currentTime - lastRenderTime

      drawing = true
      while (pendingRenderTime >= RENDER_FREQUENCY) {
        renders++
        pendingRenderTime -= RENDER_FREQUENCY

        draw(this.#vram)
        this.#decrementCounters()
      }

      lastRenderTime = (new Date).getTime()

      drawing = false
    }, RENDER_FREQUENCY)

    this.#updateIntervalId = setInterval(() => {
      if (updating) return

      let currentTime = (new Date).getTime()
      pendingUpdateTime += currentTime - lastUpdateTime

      updating = true
      while (pendingUpdateTime >= UPDATE_FREQUENCY) {
        updates++
        pendingUpdateTime -= UPDATE_FREQUENCY

        this.#step()
      }

      lastUpdateTime = (new Date).getTime()

      updating = false
    }, UPDATE_FREQUENCY)

    this.#timerIntervalId = setInterval(() => {
      let currentTime = (new Date).getTime()
      pendingTimerTime = currentTime - lastTimerTime
      lastTimerTime = (new Date).getTime()

      if (pendingTimerTime >= 1000) {
        pendingTimerTime = 0

        log(updates, renders)

        updates = 0
        renders = 0
      }
    }, 1000)
  }

  stop() {
    this.#running = false

    clearInterval(this.#renderIntervalId)
    clearInterval(this.#updateIntervalId)
    clearInterval(this.#timerIntervalId)
  }

  reset() {
    this.#keyboard = new Keyboard()
    this.#ram = new RAM()
    this.#register = new Register()
    this.#stack = new Stack()
    this.#vram = new VRAM()
  }
}

const chip = new Chip()

export { chip }
