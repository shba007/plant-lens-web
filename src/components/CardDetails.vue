<script setup lang="ts">
import { icons } from '@/utils/icons'
import type { PlantDetails } from '@/utils/model'

const { details } = defineProps<{
  details?: PlantDetails
  similarity?: number
}>()
</script>

<template>
  <aside class="flex-[2] flex flex-col bg-dark-500 md:max-w-[320px] h-screen overflow-x-hidden overflow-y-auto">
    <template v-if="!details">
      <div class="flex flex-col gap-1 justify-center items-center w-full h-full">
        <img :src="icons['plant']" alt="plant" class="w-16" />
        <h6 class="text-lg">Scan a plant</h6>
      </div>
    </template>
    <template v-else>
      <div class="relative w-full aspect-[4/5] shadow-lg">
        <img :src="`/plant-lens-web/plants/${details.id}.jpg`" :alt="details.id"
          class="w-full aspect-[4.75/3] bg-dark-600 object-cover" />
        <div class="relative flex flex-col gap-2 p-4">
          <div class="absolute top-2 right-2 rounded-full px-3 py-[2px] pb-[5px] bg-dark-400 text-sm">
            Similarity: {{ similarity?.toFixed(2) }}%
          </div>
          <div>
            <span class="flex justify-between items-end">
              <h2 class="text-3xl">{{ details.name }}</h2>
              <!-- <h4 class="text-lg">{{ details.family }}</h4> -->
            </span>
            <h3 class="text-xl italic opacity-80">{{ details.scientificName }}</h3>
          </div>
          <ul class="flex gap-2">
            <li v-for="commonName in details.commonNames" :key="commonName"
              class="rounded-full px-3 py-[2px] pb-[5px] bg-dark-400 whitespace-nowrap text-sm hover:bg-primary-500">
              {{ commonName }}
            </li>
          </ul>
          <p class="line-clamp-3">
            {{ details.description }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 p-4">
        <!-- <CardPlant v-for="plant in [1, 2, 3]" :key="plant" :product="{ banner: null, image: '', categories: [] }" /> -->
      </div>
    </template>
  </aside>
</template>
@/utils/model
