<script setup lang="ts">
// import { SearchProduct } from '~/utils/models';
import AnimationLove from './AnimationLove.vue';
import BaseButton from './BaseButton.vue';
import BaseRibbon from './BaseRibbon.vue';
import BaseImage from './BaseImage.vue';

const props = defineProps<{
  product: any,//SearchProduct,
  isFavorite?: boolean
}>();
const emit = defineEmits<{
  (event: "update:isFavorite", isFavorite: boolean): void,
  (event: "update:cart"): void
  (event: "action:share"): void
  (event: "action:remove"): void
}>()

function onFavorite() {
  emit('update:isFavorite', !!props.isFavorite)
}
</script>

<template>
  <div class="relative w-full max-w-[180px]">
    <BaseRibbon :title="product.banner" class="absolute top-[13px] -left-[5px] z-[2]" />
    <BaseButton icon="share" size="S" :rounded="true" @click="emit('action:share')"
      class="absolute top-2 right-2 !bg-slate-900 !text-black drop-shadow-[0px_2px_6px_rgba(0,0,0,0.25)] z-[2]" />
    <div
      class="relative w-full aspect-[9/16] rounded-2xl bg-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <a :to="`/explore/products/${product.id}`"
        class="relative flex justify-center items-center w-full h-[75%] rounded-2xl">
        <BaseImage :src="product.image" alt="earring" size="L" class="top-2 rounded-none h-[110%]" />
      </a>
      <!-- TODO: Product Uncomment -->
      <!-- <RatingLabel v-if="type === 'explore'" :ratings="{ average: product.averageRating, total: product.totalRating }"
        class="absolute top-[62%] left-[6px] z-[2]" /> -->
      <div
        class="absolute left-0 right-0 bottom-0 flex flex-col h-[26.68%] px-2 py-2 font-body text-sm text-white rounded-tr-3xl  z-[2] bg-primary-400'">
        <span class="line-clamp-1">{{ product.name }}</span>
        <div class="flex gap-1 mt-1 mb-[1px] opacity-50 capitalize scrollbar-hidden">
          <span v-for="category in [...product.categories].splice(0, product.categories.length - 2)" :key="category">
            {{ category }}
          </span>
        </div>
        <!-- TODO: Product Uncomment -->
        <!-- <span v-if="product.stock" class="flex items-baseline gap-1">
          <span class="text-base">₹{{ product.price.discounted }}</span>
          <span class="opacity-80 line-through">₹{{ product.price.original }}</span>
          <span class="">{{ discount }}%</span>
        </span>
        <span v-else
          class="flex items-baseline gap-1 mt-[5px] px-2 py-1 w-fit text-xs font-semi-bold rounded-full uppercase bg-alert-500">
          out of stock
        </span> -->
        <span class="flex items-baseline gap-1 mt-auto mb-[6px] capitalize text-sm">
          <span>{{ product.categories[product.categories.length - 2] }}</span>
          <span>{{ product.categories[product.categories.length - 1] }}</span>
        </span>
        <!--  -->
      </div>
      <AnimationLove :value="isFavorite" @update:value="onFavorite"
        class="absolute right-2 bottom-2 z-[2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
    </div>
  </div>
</template>
