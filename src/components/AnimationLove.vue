<script setup lang="ts">
import { ref, watch } from 'vue';
import { icons } from '@/icons';
// import { Rive } from "@rive-app/canvas";

const props = defineProps({
  value: Boolean,
  size: {
    type: String,
    default: 'M'
  }
})
const emit = defineEmits<{ (event: "update:value", value: boolean): void }>()
const isAnimate = ref(false)
/* const canvas = ref<HTMLCanvasElement>()
  const { state, triggers } = useRive({
  src: "/animation/heart.riv",
  canvas,
  artboard: 'Heart',
  stateMachines: 'Like'
}) */

function toggleValue() {
  // triggers.value.Hover.value = true
  // triggers.value.Pressed.value = true
  // console.log(triggers.value.Pressed.value);
  emit("update:value", !props.value)
}

watch(() => props.value, (newValue, oldValue) => {
  isAnimate.value = newValue === true && oldValue === false
})

/*onMounted(() =>
   rive.value = new Rive({
    src: "/animation/heart.riv",
    canvas: canvas.value,
    artboard: 'Heart',
    stateMachines: ['Pressed'],
    onLoad: () => {
      const inputsS = rive.value?.stateMachineInputs('State Machine 1')
      const inputsE = rive.value?.stateMachineInputs('Example')
      const inputsP = rive.value?.stateMachineInputs('Pressed')
      const inputsI = rive.value?.stateMachineInputs('Idle')

      console.log({ inputsS, inputsE, inputsP, inputsI });
    }
  })
)*/
</script>

<template>
  <button class="rounded-full bg-light-500" :class="{ 'p-[5px]': size === 'L', 'p-1': size === 'M' }"
    @click="toggleValue">
    <div class="relative">
      <div v-html="icons['love-inner']" class="transition-colors"
        :class="{ 'text-[30px]': size === 'L', 'text-[28px]': size === 'M', 'text-alert-400': value }" />
      <div v-if="isAnimate" v-html="icons['love']" class="absolute left-0 top-0 text-alert-400 animate-pop"
        :class="{ 'text-[30px]': size === 'L', 'text-[28px]': size === 'M' }" @animationend="isAnimate = false" />
    </div>
    <!-- <canvas ref="canvas" width="128" height="128" class="rounded-full w-9 h-9" /> -->
  </button>
</template>