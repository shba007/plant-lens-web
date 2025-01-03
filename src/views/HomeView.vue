<script setup lang="ts">
import { computed, onBeforeMount, ref, watchEffect, watch } from 'vue'
import { useDevicesList, useUserMedia, type UseDevicesListOptions } from '@vueuse/core'

import BaseButton from '@/components/BaseButton.vue'
import CardDetails from '@/components/CardDetails.vue'
import { useTF } from '@/composables/tensorflow'
import { icons } from '@/utils/icons'
import { plants } from '@/utils/plants'

const video = ref<HTMLVideoElement | undefined>()

const devicesOptions: UseDevicesListOptions = {
  constraints: {
    audio: false,
    video: {
      width: { max: 4096 },
      height: { max: 2160 },
      frameRate: { max: 30 },
    },
  },
  requestPermissions: true,
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
  restart,
} = useUserMedia({
  constraints: { video: { deviceId: cameraId.value } },
})

const { isInit: isModelInit, enabled: predictionEnabled, fps, prediction, init: tfInit, loop: tfLoop } = useTF(video)
const plant = computed(() => (predictionEnabled.value && prediction.value?.name ? plants[prediction.value.name] : undefined))
const similarity = computed(() => (predictionEnabled.value && prediction.value?.name ? prediction.value.probability : undefined))

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
  <main class="relative flex h-screen w-screen flex-col bg-dark-400 text-white md:flex-row">
    <section class="relative grid flex-[4] grid-cols-3 grid-rows-3 items-center justify-between justify-items-center overflow-hidden p-4 md:flex-[5] md:p-6">
      <div
        class="relative z-10 col-span-2 col-start-2 row-start-1 flex items-center justify-between gap-2 self-start justify-self-end rounded-full px-3 py-1"
        :class="[isModelInit ? 'bg-primary-500' : 'bg-warning-500']">
        <img :src="icons['neural-engine']" alt="neural engine" class="w-7" />
        <span class="font-medium text-black">FPS {{ fps }}</span>
      </div>
      <div class="col-start-2 row-start-2 flex items-center justify-center gap-3">
        <img src="/logo.svg" alt="logo" class="w-20" />
        <h1 class="whitespace-nowrap text-3xl">Plant Lens</h1>
      </div>
      <video ref="video" v-if="streamEnabled" class="col-span-3 col-start-1 row-span-3 row-start-1 h-full w-full rounded-md object-cover md:aspect-video md:h-fit" autoplay muted playsinline />
      <div class="col-start-2 row-start-3 flex gap-4 self-end">
        <BaseButton @click="onHandleVideo" icon="video-camera" class="scale-[.8] p-2" />
        <BaseButton @click="onHandleRotate" icon="rotate" class="scale-[.8] p-2" />
        <!-- <BaseButton icon="upload" class="p-2 scale-[.8]" /> -->
      </div>
    </section>
    <CardDetails :details="plant" :similarity="similarity" />
  </main>
</template>
