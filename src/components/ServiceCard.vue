<script setup>
import { useBooking } from '../composables/useBooking';
import Icon from './Icon.vue';
defineProps({ item: Object, compact: Boolean });
const { open } = useBooking();
</script>
<template>
  <article class="service-card text-service" :class="{ compact }">
    <button @click="open(item)" :aria-label="`Solicitar ${item.name} com Vanessa`"><span>{{ item.name }}</span><Icon name="arrow" /></button>
  </article>
</template>
