<script setup>
import { siteConfig as c } from '../config/siteConfig';
import { useBooking } from '../composables/useBooking';
import Icon from './Icon.vue';
defineProps({ compact: Boolean });
const { open } = useBooking();
function book(id) { open(c.services.find(service => service.id === id)); }
</script>
<template>
  <div class="team-profiles" :class="{ 'team-compact': compact }">
    <article v-for="person in c.team" :key="person.id" class="team-profile">
      <img :src="person.photo" :alt="person.alt" :width="person.width" :height="person.height" loading="lazy" decoding="async" />
      <div class="team-profile-copy">
        <p class="eyebrow">{{ person.role }}</p>
        <h3>{{ person.name }}</h3>
        <p v-if="!compact">{{ person.description }}</p>
        <div class="team-bookings">
          <a v-if="person.id === 'fabi'" href="/#depilacao" class="button outline small">Ver depilação <Icon name="arrow" /></a>
          <button v-for="id in (person.id === 'fabi' ? [] : person.services)" :key="id" class="button outline small" @click="book(id)" :aria-label="`Solicitar ${c.services.find(s => s.id === id)?.name} com ${person.name}`">
            {{ id === 'manicure' ? 'Manicure' : id === 'pedicure' ? 'Pedicure' : 'Consultar depilação' }} <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  </div>
</template>
