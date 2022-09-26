import { chip } from './chip'
import { FONT_INIT } from './memory'
import { REGISTER_FLAG, CARRY, NOT_CARRY, BORROW, NOT_BORROW, COLLISION, NOT_COLLISION } from './register'

const instructions = {
  '^00E0$': (opcode, chip) => {
    chip.vram.clear()
  },
  '^00EE$': (opcode, chip) => {
    chip.register.pc = chip.stack.pop()
  },
  '^1[0-9a-fA-F]{3}$': (opcode, chip) => {
    chip.register.pc = opcode.address.int
  },
  '^2[0-9a-fA-F]{3}$': (opcode, chip) => {
    chip.stack.push(chip.register.pc)
    chip.register.pc = opcode.address.int
  },
  '^3[0-9a-fA-F]{3}$': (opcode, chip) => {
    let x = opcode.x.int
    let kk = opcode.kk.int
    let vx = chip.register.get(x)

    if (vx === kk) {
      chip.register.pc += 2
    }
  },
  '^4[0-9a-fA-F]{3}$': (opcode, chip) => {
    let x = opcode.x.int
    let kk = opcode.kk.int
    let vx = chip.register.get(x)

    if (vx !== kk) {
      chip.register.pc += 2
    }
  },
  '^5[0-9a-fA-F]{2}0$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    if (vx === vy) {
      chip.register.pc += 2
    }
  },
  '^6[0-9a-fA-F]{3}$': (opcode) => {
    let x = opcode.x.int
    let kk = opcode.kk.int

    chip.register.set(x, kk)
  },
  '^7[0-9a-fA-F]{3}$': (opcode, chip) => {
    let x = opcode.x.int
    let kk = opcode.kk.int
    let vx = chip.register.get(x)

    vx += kk

    chip.register.set(x, vx)
  },
  '^8[0-9a-fA-F]{2}0$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vy = chip.register.get(y)

    chip.register.set(x, vy)
  },
  '^8[0-9a-fA-F]{2}1$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    chip.register.set(x, vx | vy)
  },
  '^8[0-9a-fA-F]{2}2$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    chip.register.set(x, vx & vy)
  },
  '^8[0-9a-fA-F]{2}3$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    chip.register.set(x, vx ^ vy)
  },
  '^8[0-9a-fA-F]{2}4$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    vx += vy

    let carry = vx > 0xFF ? CARRY : NOT_CARRY

    chip.register.set(x, vx)
    chip.register.set(REGISTER_FLAG, carry)
  },
  '^8[0-9a-fA-F]{2}5$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    let borrow = vy > vx ? BORROW : NOT_BORROW

    vx -= vy

    chip.register.set(x, vx)
    chip.register.set(REGISTER_FLAG, borrow)
  },
  '^8[0-9a-fA-F]{2}6$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)
    let bit1 = vx & 0x1

    vx >>= 1

    chip.register.set(REGISTER_FLAG, bit1)
    chip.register.set(x, vx)
  },
  '^8[0-9a-fA-F]{2}7$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)
    let borrow = vy > vx ? NOT_BORROW : BORROW

    vy -= vx

    chip.register.set(REGISTER_FLAG, borrow)
    chip.register.set(x, vy)
  },
  '^8[0-9a-fA-F]{2}E$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)
    let bit1 = vx & 0x1

    vx <<= 1

    chip.register.set(REGISTER_FLAG, bit1)
    chip.register.set(x, vx)
  },
  '^9[0-9a-fA-F]{2}0$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let vx = chip.register.get(x)
    let vy = chip.register.get(y)

    if (vx !== vy) {
      chip.register.pc += 2
    }
  },
  '^A[0-9a-fA-F]{3}$': (opcode, chip) => {
    let address = opcode.address.int

    chip.register.i = address
  },
  '^B[0-9a-fA-F]{3}$': (opcode, chip) => {
    let address = opcode.address.int
    let v0 = chip.register.get(0)

    chip.register.i = address + v0
  },
  '^C[0-9a-fA-F]{3}$': (opcode, chip) => {
    let x = opcode.x.int
    let kk = opcode.kk.int
    let random = Math.random() * 256

    random &= kk

    chip.register.set(x, random)
  },
  '^D[0-9a-fA-F]{3}$': (opcode, chip) => {
    let x = opcode.x.int
    let y = opcode.y.int
    let nibble = opcode.nibble.int
    let i = chip.register.i

    let screenWidth = chip.vram.screenWidth
    let screenHeight = chip.vram.screenHeight
    let spriteWidth = chip.vram.spriteWidth

    let collision = NOT_COLLISION

    for (let row = 0; row < nibble; row++) {
      let sprite = chip.ram.read(i + row)

      for (let column = 0; column < spriteWidth; column++) {
        let px = (chip.register.get(x) + column) & (screenWidth - 1)
        let py = (chip.register.get(y) + row) & (screenHeight - 1)

        let pixel = (sprite & (1 << (7 - column))) !== 0 ? 1 : 0
        collision |= chip.vram.xor(px, py, pixel) ? COLLISION : NOT_COLLISION
      }
    }

    chip.register.set(REGISTER_FLAG, collision)
  },
  '^E[0-9a-fA-F]{1}9E$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    if (chip.keyboard.isDown(vx)) {
      chip.register.pc += 2
    }
  },
  '^E[0-9a-fA-F]{1}A1$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    if (chip.keyboard.isUp(vx)) {
      chip.register.pc += 2
    }
  },
  '^F[0-9a-fA-F]{1}07$': (opcode, chip) => {
    let x = opcode.x.int
    let dt = chip.register.dt

    chip.register.set(x, dt)
  },
  '^F[0-9a-fA-F]{1}0A$': (opcode, chip) => {
    let x = opcode.x.int

    console.log(`wait key and store in v${x}`)

    chip.keyboard.wait()
      .then(key => chip.register.set(x, key))
      .catch(() => console.error('keyboard key waiting interrupted'));
  },
  '^F[0-9a-fA-F]{1}15$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    chip.register.dt = vx
  },
  '^F[0-9a-fA-F]{1}18$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    chip.register.st = vx
  },
  '^F[0-9a-fA-F]{1}1E$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    chip.register.i += vx
  },
  '^F[0-9a-fA-F]{1}29$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    vx = FONT_INIT + vx * 5;

    chip.register.i = vx
  },
  '^F[0-9a-fA-F]{1}33$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)
    let i = chip.register.i

    chip.ram.set(i, vx / 100)
    chip.ram.set(i + 1, (vx / 10) % 10)
    chip.ram.set(i + 2, vx % 10)
  },
  '^F[0-9a-fA-F]{1}55$': (opcode, chip) => {
    let x = opcode.x.int
    let i = chip.register.i

    for (let index = 0; index <= x; index++) {
      let vx = chip.register.get(index)

      chip.ram.set(i + index, vx)
    }
  },
  '^F[0-9a-fA-F]{1}65$': (opcode, chip) => {
    let x = opcode.x.int
    let i = chip.register.i

    for (let index = 0; index <= x; index++) {
      let v = chip.ram.read(i + index)

      chip.register.set(index, v)
    }
  },
  '^00FE$': (opcode, chip) => {
    chip.vram.mode = 'standard'
  },
  '^00FF$': (opcode, chip) => {
    chip.vram.mode = 'extended'
  },
  '^00FD$': (opcode, chip) => {
    chip.stop()
  },
  '^00C[0-9a-fA-F]{1}$': (opcode, chip) => {
    let nibble = opcode.nibble.int

    while (nibble-- > 0) {
      for (let row = chip.vram.screenHeight - 2; row >= 0; row--) {
        for (let column = 0; column < chip.vram.screenWidth; column++) {
          let pixel = chip.vram.get(column, row)
          chip.vram.set(column, row, 0)
          chip.vram.set(column, row + 1, pixel)
        }
      }
    }
  },
  '^00FB$': (opcode, chip) => {
    let nibble = 4

    while (nibble-- > 0) {
      for (let column = chip.vram.screenWidth - 2; column >= 0; column--) {
        for (let row = 0; row < chip.vram.screenHeight; row++) {
          let pixel = chip.vram.get(column, row)
          chip.vram.set(column, row, 0)
          chip.vram.set(column + 1, row, pixel)
        }
      }
    }
  },
  '^00FC$': (opcode, chip) => {
    let nibble = 4

    while (nibble-- > 0) {
      for (let column = 1; column < chip.vram.screenWidth; column++) {
        for (let row = 0; row < chip.vram.screenHeight; row++) {
          let pixel = chip.vram.get(column, row)
          chip.vram.set(column, row, 0)
          chip.vram.set(column - 1, row, pixel)
        }
      }
    }
  },
  '^F[0-9a-fA-F]{1}30$': (opcode, chip) => {
    let x = opcode.x.int
    let vx = chip.register.get(x)

    vx = FONT_INIT + vx * 10

    chip.register.i = vx
  }
}

const resolveInstruction = function (opcode) {
  let patterns = Object.keys(instructions)

  for (let pattern of patterns) {
    if (opcode.value.hex.match(pattern)) {
      return instructions[pattern]
    }
  }

  return null
}

export { instructions, resolveInstruction }
