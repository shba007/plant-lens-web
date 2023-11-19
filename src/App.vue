<script setup lang="ts">
import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue';
import { useDevicesList, useUserMedia } from '@vueuse/core'

import { icons } from "@/icons";
import { plants } from '@/plants';
import BaseButton from './components/BaseButton.vue';
import CardDetails from './components/CardDetails.vue';
import { useTF } from "./composables/tensorflow";

const video = ref<HTMLVideoElement | undefined>()

const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
})
const { enabled: streamEnabled, stream } = useUserMedia({
  constraints: { video: true }
})
const { isInit: isModelInit, enabled: predictionEnabled, fps, prediction: plant, init: tfInit, loop: tfLoop } = useTF(video)
const Plant = computed(() => plant.value?.name ? plants[plant.value.name] : undefined)

async function onHandleVideo() {
  streamEnabled.value = !streamEnabled.value
  predictionEnabled.value = streamEnabled.value
}

/* watch(plant, () => {
  console.log(plant.value)
}) */
watchEffect(() => {
  if (video.value && stream.value) {
    video.value.srcObject = stream.value
    video.value.addEventListener('loadeddata', tfLoop)
  }
})

onBeforeMount(() => {
  tfInit()
})
</script>

<template>
  <main class="relative flex flex-col md:flex-row w-screen h-screen text-white bg-slate-900">
    <section
      class="flex-[4] md:flex-[5] relative grid grid-rows-3 grid-cols-3 justify-between justify-items-center items-center p-4 md:p-6 overflow-hidden">
      <div
        class="relative row-start-1 col-start-2 col-span-2 self-start justify-self-end flex gap-2 justify-between items-center px-3 py-1 rounded-full z-10"
        :class="[isModelInit ? 'bg-primary-500' : 'bg-blue-500']">
        <img :src="icons['neural-engine']" alt="neural engine" class="w-7" />
        <span class="text-black font-medium">FPS {{ fps }}</span>
      </div>
      <div class="row-start-2 col-start-2 flex gap-3 items-center justify-center">
        <img src="/logo.svg" alt="logo" class="w-20" />
        <h1 class="text-3xl whitespace-nowrap">Plant Lens</h1>
      </div>
      <div class="row-start-3 col-start-2 self-end flex gap-4">
        <BaseButton @click="onHandleVideo" icon="video-camera" class="p-2 scale-[.8]" />
        <BaseButton icon="upload" class="p-2 scale-[.8]" />
      </div>
      <video ref="video" v-if="streamEnabled"
        class="row-start-1 col-start-1 row-span-3 col-span-3 w-full h-full md:h-fit md:aspect-video object-cover rounded-md"
        autoplay muted playsinline />
    </section>
    <CardDetails :id="plant?.name" :details="Plant" />
  </main>
</template>
