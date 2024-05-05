<script setup lang="ts">
import { computed, onBeforeMount, ref, watchEffect, watch } from 'vue'
import { useDevicesList, useUserMedia, type UseDevicesListOptions } from '@vueuse/core'

import { icons } from '@/utils/icons'
import { plants } from '@/utils/plants'
import BaseButton from '@/components/BaseButton.vue'
import CardDetails from '@/components/CardDetails.vue'
import { useTF } from '@/composables/tensorflow'

const video = ref<HTMLVideoElement | undefined>()

const devicesOptions: UseDevicesListOptions = {
  constraints: {
    audio: false,
    video: {
      width: { max: 4096 },
      height: { max: 2160 },
      frameRate: { max: 30 }
    }
  },
  requestPermissions: true
}
const { videoInputs: cameras } = useDevicesList(devicesOptions)

const cameraIndex = ref<number>(cameras.value.length - 1)
const cameraId = computed(() => cameras.value[cameraIndex.value]?.deviceId)

watch(cameraId, () => {
  console.log({ cameraIndex: cameraIndex.value, cameraId: cameraId.value })
})

const {
  enabled: streamEnabled,
  stream,
  restart
} = useUserMedia({
  // @ts-ignore
  constraints: { video: { deviceId: cameraId } }
})

const {
  isInit: isModelInit,
  enabled: predictionEnabled,
  fps,
  prediction,
  init: tfInit,
  loop: tfLoop
} = useTF(video)
const plant = computed(() =>
  predictionEnabled.value && prediction.value?.name ? plants[prediction.value.name] : undefined
)
const similarity = computed(() =>
  predictionEnabled.value && prediction.value?.name ? prediction.value.probability : undefined
)

async function onHandleVideo() {
  streamEnabled.value = !streamEnabled.value
  predictionEnabled.value = streamEnabled.value
}

function onHandleRotate() {
  if (cameraIndex.value === undefined) return

  cameraIndex.value = (cameraIndex.value + 1) % cameras.value.length
  restart()
}

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
  <main class="relative flex flex-col md:flex-row w-screen h-screen text-white bg-dark-400">
    <section
      class="flex-[4] md:flex-[5] relative grid grid-rows-3 grid-cols-3 justify-between justify-items-center items-center p-4 md:p-6 overflow-hidden">
      <div
        class="relative row-start-1 col-start-2 col-span-2 self-start justify-self-end flex gap-2 justify-between items-center px-3 py-1 rounded-full z-10"
        :class="[isModelInit ? 'bg-primary-500' : 'bg-warning-500']">
        <img :src="icons['neural-engine']" alt="neural engine" class="w-7" />
        <span class="text-black font-medium">FPS {{ fps }}</span>
      </div>
      <div class="row-start-2 col-start-2 flex gap-3 items-center justify-center">
        <img src="/logo.svg" alt="logo" class="w-20" />
        <h1 class="text-3xl whitespace-nowrap">Plant Lens</h1>
      </div>
      <video ref="video" v-if="streamEnabled"
        class="row-start-1 col-start-1 row-span-3 col-span-3 w-full h-full md:h-fit md:aspect-video object-cover rounded-md"
        autoplay muted playsinline />
      <div class="row-start-3 col-start-2 self-end flex gap-4">
        <BaseButton @click="onHandleVideo" icon="video-camera" class="p-2 scale-[.8]" />
        <BaseButton @click="onHandleRotate" icon="rotate" class="p-2 scale-[.8]" />
        <!-- <BaseButton icon="upload" class="p-2 scale-[.8]" /> -->
      </div>
    </section>
    <CardDetails :details="plant" :similarity="similarity" />
  </main>
</template>
