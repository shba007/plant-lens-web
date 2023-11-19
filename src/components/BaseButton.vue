<script setup lang="ts">
import { icons } from '@/icons';

const props = withDefaults(defineProps<{
  icon?: string;
  title?: string;
  size?: "XS" | "S" | "M" | "L";
  rounded?: boolean;
  to?: string;
  isLoading?: boolean;
}>(), {
  size: "M",
  rounded: true,
  isLoading: false
})
</script>

<template>
  <!-- Icon button -->
  <button v-if="icon && !title && size === 'L' && !to"
    class="rounded-full p-[5px] text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
  </button>
  <a v-else-if="icon && !title && size === 'L' && to"
    class="rounded-full p-[5px] text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    :to="to" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
  </a>
  <button v-else-if="icon && !title && size === 'M' && !to"
    class="rounded-full p-1 text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[24px]" />
  </button>
  <a v-else-if="icon && !title && size === 'M' && to"
    class="rounded-full p-1 text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    :to="to" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[24px]" />
  </a>
  <button v-else-if="icon && !title && size === 'S' && !to"
    class="rounded-full p-[3px] text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[18px]" />
  </button>
  <a v-else-if="icon && !title && size === 'S' && to"
    class="rounded-full p-[3px] text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    :to="to" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[18px]" />
  </a>
  <!-- IconLabel button -->
  <button v-else-if="icon && title && size === 'L' && !to"
    class="flex items-center gap-2 rounded-full pl-[18px] pr-6 py-2 w-fit text-xl text-white font-head bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px] font-body" />
    {{ title }}
  </button>
  <a v-else-if="icon && title && size === 'L' && to" :to="to"
    class="flex items-center gap-2 rounded-full pl-[18px] pr-6 py-2 w-fit text-xl text-white font-head bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
    {{ title }}
  </a>
  <button v-else-if="icon && title && size === 'M' && !to"
    class="flex items-center gap-2 rounded-full pl-4 pr-6 py-2 w-fit text-lg font-head text-center text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
    {{ title }}
  </button>
  <a v-else-if="icon && title && size === 'M' && to" :to="to"
    class="flex items-center gap-2 rounded-full pl-4 pr-6 py-2 w-fit text-lg font-head text-center text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
    {{ title }}
  </a>
  <button v-else-if="icon && title && size === 'S'"
    class="flex items-center gap-1 rounded-full pl-[0.625rem] pr-3 py-[0.3125rem] w-fit text-sm text-center text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[16px]" />
    {{ title }}
  </button>
  <button v-else-if="icon && title && size === 'XS' && !to"
    class="flex items-center gap-1 rounded-full pl-3 pr-[14px] py-[6px] w-fit text-sm text-center text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[16px]" />
    {{ title }}
  </button>
  <a v-else-if="icon && title && size === 'XS' && to" :to="to"
    class="flex items-center gap-1 rounded-full pl-3 pr-[14px] py-[6px] w-fit text-sm text-center text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[16px]" />
    {{ title }}
  </a>
  <!-- Label button -->
  <button v-else-if="!icon && title && size === 'L' && !to"
    class="flex items-center gap-2 rounded-full px-6 py-2 w-fit text-xl text-white font-head bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
  <button v-else-if="!icon && title && size === 'M' && rounded === true"
    class="flex justify-center items-center rounded-full px-6 py-2 w-fit text-base text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
  <button v-else-if="!icon && title && size === 'M' && rounded === false"
    class="flex justify-center items-center rounded-[20px] px-6 py-[0.625rem] w-fit text-base text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
  <button v-else-if="!icon && title && size === 'S'"
    class="flex justify-center items-center rounded-full px-2 py-[0.3125rem] w-fit text-sm text-white bg-primary-500 hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
</template>
