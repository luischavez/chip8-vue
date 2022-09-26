import { describe, it, expect } from 'vitest'
import { Register } from '../register'

describe('Register', () => {
  it('throw an error on i overflow', () => {
    let register = new Register()

    expect(() => register.i = -1).toThrowError()
  })

  it('set and get i', () => {
    let register = new Register()

    expect(() => register.i = 0xFFFF).not.toThrowError()
    expect(register.i).toEqual(0xFFFF)
  })

  it('throw an error on dt overflow', () => {
    let register = new Register()

    expect(() => register.dt = -1).toThrowError()
  })

  it('set and get dt', () => {
    let register = new Register()

    expect(() => register.dt = 0xFF).not.toThrowError()
    expect(register.dt).toEqual(0xFF)
  })

  it('decrement dt', () => {
    let register = new Register()

    expect(() => register.dt = 10).not.toThrowError()
    expect(register.dt).toEqual(10)
    expect(() => register.dt--).not.toThrowError()
    expect(register.dt).toEqual(9)
  })

  it('throw an error on st overflow', () => {
    let register = new Register()

    expect(() => register.st = -1).toThrowError()
  })

  it('set and get st', () => {
    let register = new Register()

    expect(() => register.st = 0xFF).not.toThrowError()
    expect(register.st).toEqual(0xFF)
  })

  it('decrement st', () => {
    let register = new Register()

    expect(() => register.st = 10).not.toThrowError()
    expect(register.st).toEqual(10)
    expect(() => register.st--).not.toThrowError()
    expect(register.st).toEqual(9)
  })

  it('throw an error on pc overflow', () => {
    let register = new Register()

    expect(() => register.pc = -1).toThrowError()
  })

  it('set and get pc', () => {
    let register = new Register()

    expect(() => register.pc = 0xFFFF).not.toThrowError()
    expect(register.pc).toEqual(0xFFFF)
  })

  it('increment pc', () => {
    let register = new Register()

    expect(() => register.pc = 10).not.toThrowError()
    expect(register.pc).toEqual(10)
    expect(() => register.pc++).not.toThrowError()
    expect(register.pc).toEqual(11)
  })

  it('throw an error on data overflow', () => {
    let register = new Register()

    expect(() => register.set(-1, 1)).toThrowError()
    expect(() => register.set(16, 1)).toThrowError()
  })

  it('set and get data', () => {
    let register = new Register()

    expect(() => register.set(3, 2)).not.toThrowError()
    expect(register.get(3)).toEqual(2)
  })

  it('copy data', () => {
    let register = new Register()

    expect(() => register.set(3, 2)).not.toThrowError()
    expect(() => register.set(5, 6)).not.toThrowError()
    expect(() => register.copy(3, 5)).not.toThrowError()
    expect(register.get(5)).toEqual(2)
  })
})
