<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '@/utils/icons'
import type { PlantDetails } from '@/utils/model'

const { details } = defineProps<{
  details?: PlantDetails
  similarity?: number
}>()

const imagePath = computed(() => `${import.meta.env.VITE_BASE_URL}/plants/${details?.id}.jpg`)
</script>

<template>
  <aside class="flex h-screen flex-[2] flex-col overflow-y-auto overflow-x-hidden bg-dark-500 md:max-w-[320px]">
    <template v-if="!details">
      <div class="flex h-full w-full flex-col items-center justify-center gap-1">
        <img :src="icons['plant']" alt="plant" class="w-16" />
        <h6 class="text-lg">Scan a plant</h6>
      </div>
    </template>
    <template v-else>
      <div class="relative aspect-[4/5] w-full shadow-lg">
        <img :src="imagePath" :alt="details.id" class="aspect-[4.75/3] w-full bg-dark-600 object-cover" />
        <div class="relative flex flex-col gap-2 p-4">
          <div class="absolute right-2 top-2 rounded-full bg-dark-400 px-3 py-[2px] pb-[5px] text-sm">Similarity: {{ similarity?.toFixed(2) }}%</div>
          <div>
            <span class="flex items-end justify-between">
              <h2 class="text-3xl">{{ details.name }}</h2>
              <!-- <h4 class="text-lg">{{ details.family }}</h4> -->
            </span>
            <h3 class="text-xl italic opacity-80">{{ details.scientificName }}</h3>
          </div>
          <ul class="flex gap-2">
            <li v-for="commonName in details.commonNames" :key="commonName" class="whitespace-nowrap rounded-full bg-dark-400 px-3 py-[2px] pb-[5px] text-sm hover:bg-primary-500">
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
