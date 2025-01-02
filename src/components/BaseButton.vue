<script setup lang="ts">
import { icons } from '@/utils/icons'

withDefaults(
  defineProps<{
    icon?: string
    title?: string
    size?: 'XS' | 'S' | 'M' | 'L'
    rounded?: boolean
    to?: string
    isLoading?: boolean
  }>(),
  {
    size: 'M',
    rounded: true,
    isLoading: false,
  }
)
</script>

<template>
  <!-- Icon button -->
  <button v-if="icon && !title && size === 'L' && !to" class="rounded-full bg-primary-500 p-[5px] text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
  </button>
  <a v-else-if="icon && !title && size === 'L' && to" class="rounded-full bg-primary-500 p-[5px] text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black" :to="to" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
  </a>
  <button v-else-if="icon && !title && size === 'M' && !to" class="rounded-full bg-primary-500 p-1 text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[24px]" />
  </button>
  <a v-else-if="icon && !title && size === 'M' && to" class="rounded-full bg-primary-500 p-1 text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black" :to="to" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[24px]" />
  </a>
  <button v-else-if="icon && !title && size === 'S' && !to" class="rounded-full bg-primary-500 p-[3px] text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[18px]" />
  </button>
  <a v-else-if="icon && !title && size === 'S' && to" class="rounded-full bg-primary-500 p-[3px] text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black" :to="to" v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[18px]" />
  </a>
  <!-- IconLabel button -->
  <button
    v-else-if="icon && title && size === 'L' && !to"
    class="flex w-fit items-center gap-2 rounded-full bg-primary-500 py-2 pl-[18px] pr-6 font-head text-xl text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="font-body text-[30px]" />
    {{ title }}
  </button>
  <a
    v-else-if="icon && title && size === 'L' && to"
    :to="to"
    class="flex w-fit items-center gap-2 rounded-full bg-primary-500 py-2 pl-[18px] pr-6 font-head text-xl text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
    {{ title }}
  </a>
  <button
    v-else-if="icon && title && size === 'M' && !to"
    class="flex w-fit items-center gap-2 rounded-full bg-primary-500 py-2 pl-4 pr-6 text-center font-head text-lg text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
    {{ title }}
  </button>
  <a
    v-else-if="icon && title && size === 'M' && to"
    :to="to"
    class="flex w-fit items-center gap-2 rounded-full bg-primary-500 py-2 pl-4 pr-6 text-center font-head text-lg text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[30px]" />
    {{ title }}
  </a>
  <button
    v-else-if="icon && title && size === 'S'"
    class="flex w-fit items-center gap-1 rounded-full bg-primary-500 py-[0.3125rem] pl-[0.625rem] pr-3 text-center text-sm text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[16px]" />
    {{ title }}
  </button>
  <button
    v-else-if="icon && title && size === 'XS' && !to"
    class="flex w-fit items-center gap-1 rounded-full bg-primary-500 py-[6px] pl-3 pr-[14px] text-center text-sm text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[16px]" />
    {{ title }}
  </button>
  <a
    v-else-if="icon && title && size === 'XS' && to"
    :to="to"
    class="flex w-fit items-center gap-1 rounded-full bg-primary-500 py-[6px] pl-3 pr-[14px] text-center text-sm text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    <div v-html="icons[icon]" :name="icon" class="text-[16px]" />
    {{ title }}
  </a>
  <!-- Label button -->
  <button
    v-else-if="!icon && title && size === 'L' && !to"
    class="flex w-fit items-center gap-2 rounded-full bg-primary-500 px-6 py-2 font-head text-xl text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
  <button
    v-else-if="!icon && title && size === 'M' && rounded === true"
    class="flex w-fit items-center justify-center rounded-full bg-primary-500 px-6 py-2 text-base text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
  <button
    v-else-if="!icon && title && size === 'M' && rounded === false"
    class="flex w-fit items-center justify-center rounded-[20px] bg-primary-500 px-6 py-[0.625rem] text-base text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
  <button
    v-else-if="!icon && title && size === 'S'"
    class="flex w-fit items-center justify-center rounded-full bg-primary-500 px-2 py-[0.3125rem] text-sm text-white hover:bg-primary-400 disabled:bg-light-500 disabled:text-black"
    v-bind="$attrs">
    {{ title }}
  </button>
</template>
