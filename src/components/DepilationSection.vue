<script setup>
import { ref, computed } from 'vue';
import { siteConfig as c } from '../config/siteConfig';
import { useBooking } from '../composables/useBooking';
defineProps({ compact: Boolean });
const fabi = c.team.find(p => p.id === 'fabi');
const services = c.services.filter(s => s.category === 'Depilação');
const selected = ref(services[0]?.id);
const item = computed(() => services.find(s => s.id === selected.value));
const { open } = useBooking();
</script>
<template>
  <div class="depilation-block" :class="{ compact }">
    <img :src="fabi.photo" :alt="fabi.alt" :width="fabi.width" :height="fabi.height" loading="lazy" />
    <div class="depilation-copy">
      <p class="eyebrow">DEPILAÇÃO FEMININA</p><h2>Seu cuidado com a Fabi.</h2>
      <p>Escolha a região ou combinação que deseja e converse com a nossa profissional.</p>
      <label :for="compact ? 'depilacao-bio' : 'depilacao-home'">Serviço de depilação</label>
      <select :id="compact ? 'depilacao-bio' : 'depilacao-home'" v-model="selected"><option v-for="s in services" :key="s.id" :value="s.id">{{ s.area }}</option></select>
      <button class="button full" @click="open(item)">Solicitar depilação com Fabi</button>
      <details><summary>Ver todos os serviços de depilação</summary><ul><li v-for="s in services" :key="s.id"><button class="text-button" @click="selected = s.id; open(s)">{{ s.area }}</button></li></ul></details>
    </div>
  </div>
</template>
