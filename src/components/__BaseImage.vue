<script setup lang="ts">
import { icons } from '@/icons';
import { computed } from 'vue';

const props = defineProps<{
  src: string,
  alt: string,
  size: 'XL' | 'L' | 'M' | 'S',
  isSquare?: boolean,
}>()

const resolution = computed(() => {
  switch (props.size) {
    case 'XL':
      return { width: 1080, height: 1920 }
    case 'L':
      return { width: 720, height: 960 }
    case 'M':
      return { width: 480, height: 640 }
    case 'S':
      return { width: 240, height: 320 }
  }
  return { width: 720, height: 960 }
})

// const { url } = useCDN({ id: props.src, dimensions: resolution.value })
const url = ""
</script>

<template>
  <div v-if="size === 'XL'"
    class="relative flex-shrink-0 flex justify-center items-center rounded-[18px] w-full bg-slate-900 overflow-hidden"
    :class="isSquare ? 'aspect-[1/1]' : 'aspect-[3/4]'" v-bind="$attrs">
    <img v-if="src" :src="url" :alt="alt" class="absolute left-0 top-0 w-full h-full object-cover z-[1]" />
    <div v-html="icons['image']" class="text-[96px]" />
  </div>
  <div v-else-if="size === 'L'"
    class="relative flex-shrink-0 flex justify-center items-center rounded-[18px] w-full bg-slate-900 overflow-hidden"
    :class="isSquare ? 'aspect-[1/1]' : 'aspect-[3/4]'" v-bind="$attrs">
    <img v-if="src" :src="url" :alt="alt" class="absolute left-0 top-0 w-full h-full object-cover z-[1]" />
    <div v-html="icons['image']" class="text-[48px]" />
  </div>
  <div v-else-if="size === 'M'"
    class="relative flex-shrink-0 flex justify-center items-center rounded-xl w-24 bg-slate-900 overflow-hidden"
    :class="isSquare ? 'aspect-[1/1]' : 'aspect-[3/4]'" v-bind="$attrs">
    <img v-if="src" :src="url" :alt="alt" class="absolute left-0 top-0 w-full h-full object-cover z-[1]" />
    <div v-html="icons['image']" class="text-[30px]" />
  </div>
  <div v-else-if="size === 'S'"
    class="relative flex-shrink-0 flex justify-center items-center rounded-md w-12 bg-slate-900 overflow-hidden"
    :class="isSquare ? 'aspect-[1/1]' : 'aspect-[3/4]'" v-bind="$attrs">
    <img v-if="src" :src="url" :alt="alt" class="absolute left-0 top-0 w-full h-full object-cover z-[1]" />
    <div v-html="icons['image']" class="text-[16px]" />
  </div>
</template>
