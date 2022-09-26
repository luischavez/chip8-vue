<script setup>
import { chip } from './emulation/chip'
import Keyboard from './components/Keyboard.vue'

window.chip = chip

fetch('https://github.com/luischavez/chip8-vue/blob/main/dist/roms/invaders.ch8')
  .then(res => res.blob())
  .then(blob => {
    blob.arrayBuffer()
      .then(data => {
        let bytes = new Uint8Array(data)

        chip.ram.load(bytes)

        chip.start(vram => {
          let screen = document.getElementById('screen')
          let context2d = screen.getContext('2d')

          for (let column = 0; column < vram.screenWidth; column++) {
            for (let row = 0; row < vram.screenHeight; row++) {
              let pixel = vram.get(column, row)
              context2d.fillStyle = pixel ? '#FFFFFF' : '#000000'
              context2d.fillRect(column * 8, row * 8, 8, 8)
            }
          }

          context2d.fill()
        }, (updates, renders) => console.log(`updates: ${updates}, renders: ${renders}`))
      })
  })
</script>

<template>
  <canvas id="screen" :width="chip.vram.screenWidth * 8" :height="chip.vram.screenHeight * 8"></canvas>
  <Keyboard />
</template>

<style>

</style>
