import { describe, it, expect } from 'vitest'
import { Keyboard } from '../input'

describe('VRam', () => {
  it('initializes keys', () => {
    let keyboard = new Keyboard()

    expect(keyboard.keys).toEqual([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
  })

  it('hold key pressed', () => {
    let keyboard = new Keyboard()

    keyboard.down(4)
    expect(keyboard.isDown(4)).toBeTruthy()
    keyboard.up(4)
    expect(keyboard.isDown(4)).toBeFalsy()
  })

  it('wait for key press', async () => {
    let keyboard = new Keyboard()

    setTimeout(() => keyboard.down(5), 1000)

    let key = await keyboard.wait()
    expect(keyboard.waiting).toBeFalsy()
    expect(key).toEqual(5)
  })

  it('throw an error on invalid key', () => {
    let keyboard = new Keyboard()

    expect(() => keyboard.down(-1)).toThrowError()
    expect(() => keyboard.down(16)).toThrowError()
  })
})
