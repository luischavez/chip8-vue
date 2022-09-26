
<script setup>
import { chip } from '../emulation/chip'

function releaseKey() {
  var timeoutId

  return async () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    await new Promise(resolve => {
      timeoutId = setTimeout(resolve, 100)
    })

    chip.keyboard.upAll()
  }
}

function pressKey(event) {
  let target = event.target
  let key = target.dataset.key;

  if (!key) {
    return
  }

  chip.keyboard.down(key)
}

document.addEventListener('mousedown', pressKey)
document.addEventListener('mouseup', releaseKey())
</script>

<template>
  <div class="grid">
    <button data-key="1">1</button>
    <button data-key="2">2</button>
    <button data-key="3">3</button>
    <button data-key="0xC">C</button>
    <button data-key="4">4</button>
    <button data-key="5">5</button>
    <button data-key="6">6</button>
    <button data-key="0xD">D</button>
    <button data-key="7">7</button>
    <button data-key="8">8</button>
    <button data-key="9">9</button>
    <button data-key="0xE">E</button>
    <button data-key="0xA">A</button>
    <button data-key="0">0</button>
    <button data-key="0xB">B</button>
    <button data-key="0xF">F</button>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
}

.grid>div {
  border: solid 1px red;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
</style>
