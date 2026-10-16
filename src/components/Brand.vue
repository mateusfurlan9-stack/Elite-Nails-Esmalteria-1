<script setup>
import { siteConfig as c } from "../config/siteConfig";
</script>
<template>
  <span class="brand-mark">
    <img v-if="c.brand.logo" :src="c.brand.logo" alt="" width="60" height="60" />
    <span class="brand-wordmark"><span class="brand-caption">{{ c.brand.subtitle }}</span><span class="brand-name">{{ c.brand.name }}</span></span>
  </span>
</template>
