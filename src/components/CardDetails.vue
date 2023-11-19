<script setup lang="ts">
import { icons } from '@/icons';
import type { Plant } from '@/plants';

const { details } = defineProps<{
	details?: Plant
}>()
</script>

<template>
	<aside class="flex-[2] flex flex-col bg-slate-800 h-screen overflow-x-hidden overflow-y-auto">
		<template v-if="!details">
			<div class="flex flex-col gap-1 justify-center items-center w-full h-full">
				<img :src="icons['plant']" alt="plant" class="w-16">
				<h6 class="text-lg">Scan a plant</h6>
			</div>
		</template>
		<template v-else>
			<div class="relative w-full aspect-[4/5] shadow-lg">
				<img :src="`/plants/${details.id}.jpg`" alt="plant" class="w-full aspect-[4.75/3] bg-slate-600 object-cover">
				<div class="flex flex-col gap-2 p-4">
					<div>
						<span class="flex justify-between items-end">
							<h2 class="text-3xl">{{ details.name }}</h2>
							<!-- <h4 class="text-lg">{{ details.family }}</h4> -->
						</span>
						<h3 class="text-xl italic opacity-80">{{ details.scientificName }}</h3>
					</div>
					<ul class="flex gap-2">
						<li v-for="commonName in details.commonNames"
							class="rounded-full px-3 py-[2px] pb-[5px] bg-slate-950 whitespace-nowrap text-sm hover:bg-primary-500">
							{{ commonName }}
						</li>
					</ul>
					<p class="line-clamp-3">
						{{ details.description }}
					</p>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-2 p-4 ">
				<!-- <CardPlant v-for="plant in [1, 2, 3]" :product="{ banner: null, image: '', categories: [] }" /> -->
			</div>
		</template>
	</aside>
</template>