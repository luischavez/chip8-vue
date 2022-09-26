import { describe, it, expect } from 'vitest'
import { Stack } from '../stack'

describe('Stack', () => {
  it('throw an error on pop when stack is empty', () => {
    let stack = new Stack()

    expect(() => stack.pop()).toThrowError()
  })

  it('throw an error on push when stack is full', () => {
    let stack = new Stack()

    for (let i = 0; i < 16; i++) {
      expect(() => stack.push(i)).not.toThrowError()
    }

    expect(() => stack.push(17)).toThrowError()
  })

  it('pop in same order as pushed', () => {
    let stack = new Stack()

    for (let i = 0; i < 16; i++) {
      expect(() => stack.push(i)).not.toThrowError()
    }

    for (let i = 15; i >= 0; i--) {
      expect(stack.pop()).toEqual(i)
    }
  })
})
