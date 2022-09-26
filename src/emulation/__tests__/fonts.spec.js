import { describe, it, expect } from 'vitest'
import { printFont, printExtendedFont } from '../fonts'

describe('normal fonts', () => {
  it('display normal 0', () => {
    let char = printFont('0')
    expect(char).toEqual(
      "  x      \n" +
      " x x     \n" +
      " x x     \n" +
      " x x     \n" +
      " xxx     \n"
    )
  })
  it('display normal 1', () => {
    let char = printFont('1')
    expect(char).toEqual(
      " x       \n" +
      " x       \n" +
      " x       \n" +
      " x       \n" +
      " x       \n"
    )
  })
  it('display normal 2', () => {
    let char = printFont('2')
    expect(char).toEqual(
      "  x      \n" +
      " x x     \n" +
      "   x     \n" +
      "  x      \n" +
      "  xx     \n"
    )
  })
  it('display normal 3', () => {
    let char = printFont('3')
    expect(char).toEqual(
      "  x      \n" +
      "   x     \n" +
      "  x      \n" +
      "   x     \n" +
      " xxx     \n"
    )
  })
  it('display normal 4', () => {
    let char = printFont('4')
    expect(char).toEqual(
      "   x     \n" +
      "  xx     \n" +
      " x x     \n" +
      " xxx     \n" +
      "   x     \n"
    )
  })
  it('display normal 5', () => {
    let char = printFont('5')
    expect(char).toEqual(
      "  xx     \n" +
      " x       \n" +
      "  xx     \n" +
      "   x     \n" +
      " xx      \n"
    )
  })
  it('display normal 6', () => {
    let char = printFont('6')
    expect(char).toEqual(
      "   x     \n" +
      " xx      \n" +
      " x x     \n" +
      " x x     \n" +
      " xxx     \n"
    )
  })
  it('display normal 7', () => {
    let char = printFont('7')
    expect(char).toEqual(
      "  xx     \n" +
      " x x     \n" +
      "   x     \n" +
      "  x      \n" +
      "  x      \n"
    )
  })
  it('display normal 8', () => {
    let char = printFont('8')
    expect(char).toEqual(
      " xxx     \n" +
      " x x     \n" +
      "  x      \n" +
      " x x     \n" +
      " xxx     \n"
    )
  })
  it('display normal 9', () => {
    let char = printFont('9')
    expect(char).toEqual(
      "  x      \n" +
      " x x     \n" +
      " x x     \n" +
      "  xx     \n" +
      "  x      \n"
    )
  })
  it('display normal A', () => {
    let char = printFont('A')
    expect(char).toEqual(
      "   x     \n" +
      "   x     \n" +
      "  x x    \n" +
      " x xx    \n" +
      " x  x    \n"
    )
  })
  it('display normal B', () => {
    let char = printFont('B')
    expect(char).toEqual(
      " xxx     \n" +
      " x  x    \n" +
      "  xxx    \n" +
      " x  x    \n" +
      " xxxx    \n"
    )
  })
  it('display normal C', () => {
    let char = printFont('C')
    expect(char).toEqual(
      "   xx    \n" +
      " xx      \n" +
      " x       \n" +
      " x       \n" +
      "  xxx    \n"
    )
  })
  it('display normal D', () => {
    let char = printFont('D')
    expect(char).toEqual(
      " xxx     \n" +
      " x  xx   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " xxxx    \n"
    )
  })
  it('display normal E', () => {
    let char = printFont('E')
    expect(char).toEqual(
      " xxxx    \n" +
      " x       \n" +
      "  xx     \n" +
      " x       \n" +
      " xxxx    \n"
    )
  })
  it('display normal F', () => {
    let char = printFont('F')
    expect(char).toEqual(
      " xxxx    \n" +
      " x       \n" +
      "  xx     \n" +
      " x       \n" +
      " x       \n"
    )
  })
})

describe('extended fonts', () => {
  it('display extended 0', () => {
    let char = printExtendedFont('0')
    expect(char).toEqual(
      "  xxx    \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      "  xxx    \n"
    )
  })
  it('display extended 1', () => {
    let char = printExtendedFont('1')
    expect(char).toEqual(
      "  x      \n" +
      " xx      \n" +
      "  x      \n" +
      "  x      \n" +
      "  x      \n" +
      "  x      \n" +
      "  x      \n" +
      "  x      \n" +
      " xxx     \n"
    )
  })
  it('display extended 2', () => {
    let char = printExtendedFont('2')
    expect(char).toEqual(
      "  xxx    \n" +
      " x   x   \n" +
      "     x   \n" +
      "     x   \n" +
      "    x    \n" +
      "    x    \n" +
      "   x     \n" +
      "  x  x   \n" +
      " xxxxx   \n"
    )
  })
  it('display extended 3', () => {
    let char = printExtendedFont('3')
    expect(char).toEqual(
      "  xxx    \n" +
      " x   x   \n" +
      "     x   \n" +
      "    x    \n" +
      "   xx    \n" +
      "     x   \n" +
      "     x   \n" +
      "     x   \n" +
      " xxxx    \n"
    )
  })
  it('display extended 4', () => {
    let char = printExtendedFont('4')
    expect(char).toEqual(
      "     x   \n" +
      "    xx   \n" +
      "   x x   \n" +
      "   x x   \n" +
      "  x  x   \n" +
      " x   x   \n" +
      " xxxxxx  \n" +
      "     x   \n" +
      "     x   \n"
    )
  })
  it('display extended 5', () => {
    let char = printExtendedFont('5')
    expect(char).toEqual(
      "   xxx   \n" +
      "   x     \n" +
      "  xx     \n" +
      "    x    \n" +
      "     x   \n" +
      "     x   \n" +
      "     x   \n" +
      "    x    \n" +
      " xxx     \n"
    )
  })
  it('display extended 6', () => {
    let char = printExtendedFont('6')
    expect(char).toEqual(
      "    xx   \n" +
      "   x     \n" +
      "  x      \n" +
      " x xx    \n" +
      " xx  x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      "  xxx    \n"
    )
  })
  it('display extended 7', () => {
    let char = printExtendedFont('7')
    expect(char).toEqual(
      " xxxxx   \n" +
      " x   x   \n" +
      "    x    \n" +
      "    x    \n" +
      "    x    \n" +
      "   x     \n" +
      "   x     \n" +
      "   x     \n" +
      "  x      \n"
    )
  })
  it('display extended 8', () => {
    let char = printExtendedFont('8')
    expect(char).toEqual(
      "  xxx    \n" +
      " x   x   \n" +
      " x   x   \n" +
      "  x x    \n" +
      "   x     \n" +
      "  x x    \n" +
      " x   x   \n" +
      " x   x   \n" +
      "  xxx    \n"
    )
  })
  it('display extended 9', () => {
    let char = printExtendedFont('9')
    expect(char).toEqual(
      "  xxx    \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      " x   x   \n" +
      "  xxxx   \n" +
      "    x    \n" +
      "   x     \n" +
      " xx      \n"
    )
  })
  it('display extended A', () => {
    let char = printExtendedFont('A')
    expect(char).toEqual(
      "     x   \n" +
      "     x   \n" +
      "    x x  \n" +
      "    x x  \n" +
      "   x   x \n" +
      "   xxxxx \n" +
      "  x     x\n" +
      "  x     x\n" +
      " xxx   xx\n"
    )
  })
  it('display extended B', () => {
    let char = printExtendedFont('B')
    expect(char).toEqual(
      " xxxxxx  \n" +
      "  x    x \n" +
      "  x    x \n" +
      "  x    x \n" +
      "  xxxxx  \n" +
      "  x    x \n" +
      "  x    x \n" +
      "  x    x \n" +
      " xxxxxx  \n"
    )
  })
  it('display extended C', () => {
    let char = printExtendedFont('C')
    expect(char).toEqual(
      "   xxx x \n" +
      "  x   xx \n" +
      " x     x \n" +
      " x       \n" +
      " x       \n" +
      " x       \n" +
      " x     x \n" +
      "  x   x  \n" +
      "   xxx   \n"
    )
  })
  it('display extended D', () => {
    let char = printExtendedFont('D')
    expect(char).toEqual(
      " xxxxxx  \n" +
      "  x    x \n" +
      "  x     x\n" +
      "  x     x\n" +
      "  x     x\n" +
      "  x     x\n" +
      "  x     x\n" +
      "  x    x \n" +
      " xxxxxx  \n"
    )
  })
  it('display extended E', () => {
    let char = printExtendedFont('E')
    expect(char).toEqual(
      " xxxxxx  \n" +
      "  x   x  \n" +
      "  x      \n" +
      "  x  x   \n" +
      "  xxxx   \n" +
      "  x  x   \n" +
      "  x      \n" +
      "  x    x \n" +
      " xxxxxx  \n"
    )
  })
  it('display extended F', () => {
    let char = printExtendedFont('F')
    expect(char).toEqual(
      " xxxxxx  \n" +
      "  x   x  \n" +
      "  x      \n" +
      "  x  x   \n" +
      "  xxxx   \n" +
      "  x  x   \n" +
      "  x      \n" +
      "  x      \n" +
      " xxx     \n"
    )
  })
})
