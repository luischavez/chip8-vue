import { describe, it, expect } from 'vitest'
import { OPCode, RAM, MAX_PROGRAM_SIZE, RAM_INIT, FONT_INIT, EXTENDED_FONT_INIT, PROGRAM_INIT, PROGRAM_END } from '../memory'
import { normalFont, extendedFont } from '../fonts'

describe('RAM', () => {
  it('font loaded correctly', () => {
    let ram = new RAM()

    let normalFontInMemory = ram.data.slice(FONT_INIT, FONT_INIT + normalFont.length)
    let extendedFontInMemory = ram.data.slice(EXTENDED_FONT_INIT, EXTENDED_FONT_INIT + extendedFont.length)

    expect(normalFontInMemory.length).toEqual(normalFont.length)
    expect(normalFontInMemory).toEqual(normalFont)
    expect(extendedFontInMemory.length).toEqual(extendedFont.length)
    expect(extendedFontInMemory).toEqual(extendedFont)
  })

  it('data loaded correctly', () => {
    let ram = new RAM()
    let data = [1, 2, 3, 4]

    ram.load(data)
    let dataInMemory = ram.data.slice(ram.programIndex, ram.programIndex + data.length);

    expect(dataInMemory.length).toEqual(data.length)
    expect(dataInMemory).toEqual(data)
  })

  it('not throws an error on memory filled', () => {
    let ram = new RAM()
    let data = [...Array(MAX_PROGRAM_SIZE).keys()]

    expect(() => ram.load(data)).not.toThrowError()
  })

  it('throws an error on memory overflow', () => {
    let ram = new RAM()
    let data = [...Array(MAX_PROGRAM_SIZE + 1).keys()]

    expect(() => ram.load(data)).toThrowError()
  })

  it('not throws an error on address on range', () => {
    let ram = new RAM()

    expect(() => ram.read(RAM_INIT)).not.toThrowError()
    expect(() => ram.read(PROGRAM_END)).not.toThrowError()
  })

  it('throws an error on address out of range', () => {
    let ram = new RAM()

    expect(() => ram.read(RAM_INIT - 1)).toThrowError()
    expect(() => ram.read(PROGRAM_END + 1)).toThrowError()
  })

  it('read correctly', () => {
    let ram = new RAM()
    let data = [1, 2, 3]

    ram.load(data)

    expect(ram.read(ram.programIndex)).toEqual(data[0])
    expect(ram.read(ram.programIndex + 1)).toEqual(data[1])
    expect(ram.read(ram.programIndex + 2)).toEqual(data[2])
  })

  it('set correctly', () => {
    let ram = new RAM()

    expect(() => ram.set(ram.programIndex, 1)).not.toThrowError()
    expect(() => ram.set(ram.programIndex + 1, 2)).not.toThrowError()
    expect(() => ram.set(ram.programIndex + 2, 3)).not.toThrowError()

    expect(ram.read(ram.programIndex)).toEqual(1)
    expect(ram.read(ram.programIndex + 1)).toEqual(2)
    expect(ram.read(ram.programIndex + 2)).toEqual(3)
  })

  it('throw an error on set out of range', () => {
    let ram = new RAM()

    expect(() => ram.set(RAM_INIT - 1, 1)).toThrowError()
    expect(() => ram.set(PROGRAM_END + 1, 1)).toThrowError()
  })

  it('store and read opcode', () => {
    let ram = new RAM()
    let opcode = new OPCode('F1E0')

    ram.load([parseInt('F1', 16), parseInt('E0', 16)])

    expect(ram.opcode(PROGRAM_INIT).value.hex).toEqual(opcode.value.hex)
  })
})
