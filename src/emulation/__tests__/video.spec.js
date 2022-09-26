import { describe, it, expect } from 'vitest'
import { VRAM, STANDARD_SCREEN_WIDTH, STANDARD_SCREEN_HEIGHT, EXTENDED_SCREEN_WIDTH, EXTENDED_SCREEN_HEIGHT } from '../video'

describe('VRam', () => {
  it('set standard mode', () => {
    let vram = new VRAM()

    vram.mode = 'standard'
    expect(vram.bufferSize).toEqual(STANDARD_SCREEN_WIDTH * STANDARD_SCREEN_HEIGHT)
  })

  it('set extended mode', () => {
    let vram = new VRAM()

    vram.mode = 'extended'
    expect(vram.bufferSize).toEqual(EXTENDED_SCREEN_WIDTH * EXTENDED_SCREEN_HEIGHT)
  })

  it('set and get a value', () => {
    let vram = new VRAM()

    vram.set(0, 1, 5)
    expect(vram.get(0, 1)).toEqual(5)
  })

  it('clears the buffer', () => {
    let vram = new VRAM()

    vram.set(0, 0, 2)
    expect(vram.get(0, 0)).toEqual(2)
    vram.clear()
    expect(vram.get(0, 0)).toEqual(0)
  })

  it('detect a pixel change on xor', () => {
    let vram = new VRAM()

    vram.set(0, 1, 1)
    expect(vram.xor(0, 0, 1)).toEqual(0)
    expect(vram.xor(0, 1, 1)).toEqual(1)
  })

  it('not throw an error on valid coordinates', () => {
    let vram = new VRAM()

    vram.mode = 'standard'
    expect(() => vram.set(STANDARD_SCREEN_WIDTH, STANDARD_SCREEN_HEIGHT, 1)).not.toThrowError()
    vram.mode = 'extended'
    expect(() => vram.set(EXTENDED_SCREEN_WIDTH, EXTENDED_SCREEN_HEIGHT, 1)).not.toThrowError()
  })

  it('throw an error on invalid coordinates', () => {
    let vram = new VRAM()

    vram.mode = 'standard'
    expect(() => vram.set(STANDARD_SCREEN_WIDTH, STANDARD_SCREEN_HEIGHT + 1, 1)).toThrowError()
    vram.mode = 'extended'
    expect(() => vram.set(EXTENDED_SCREEN_WIDTH + 1, EXTENDED_SCREEN_HEIGHT, 1)).toThrowError()
  })
})
