<script setup>
import { ref, computed, watch } from "vue";
import { siteConfig as c } from "../config/siteConfig";
import ServiceCard from "./ServiceCard.vue";
import PaginationNav from "./PaginationNav.vue";
import { usePageSize } from "../composables/usePageSize";
defineProps({ compact: Boolean });
const vanessa = c.team.find(person => person.id === "vanessa");
const category = ref("Todos"),
  query = ref(""),
  page = ref(0),
  pageSize = usePageSize();
const nailServices = c.services.filter(s => s.category !== "Depilação");
const categories = ["Todos", ...new Set(nailServices.map((s) => s.category))];
const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const filtered = computed(() =>
  nailServices.filter(
    (s) =>
      (category.value === "Todos" || s.category === category.value) &&
      normalize(`${s.name} ${s.description}`).includes(
        normalize(query.value.trim()),
      ),
  ),
);
const visible = computed(() =>
  filtered.value.slice(
    page.value * pageSize.value,
    (page.value + 1) * pageSize.value,
  ),
);
watch([category, query, pageSize], () => (page.value = 0));
</script>
<template>
  <section :id="compact ? undefined : 'servicos'" class="section wrap vanessa-section" :class="{ 'vanessa-compact': compact }">
    <div class="vanessa-intro">
      <img :src="vanessa.photo" :alt="vanessa.alt" :width="vanessa.width" :height="vanessa.height" loading="lazy" />
      <div><p class="eyebrow">MANICURE E PEDICURE</p><h2>Seu cuidado com Vanessa.</h2><p>Escolha o serviço para suas mãos e pés e solicite seu atendimento.</p><a class="text-button" :href="compact ? '/#portfolio' : '#portfolio'">Ver resultados de mãos e pés →</a></div>
    </div>
    <div class="catalog-toolbar">
      <label class="mobile-category"
        ><span class="sr-only">Categoria de serviços</span
        ><select v-model="category">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select></label
      >
      <div class="filters" aria-label="Filtrar serviços">
        <button
          v-for="cat in categories"
          :key="cat"
          :aria-pressed="category === cat"
          @click="category = cat"
        >
          {{ cat }}
        </button>
      </div>
      <label class="search-field"
        ><span class="sr-only">Pesquisar serviço</span
        ><input v-model="query" type="search" placeholder="Buscar serviço"
      /></label>
    </div>
    <p class="sr-only" role="status">
      {{ filtered.length }} serviços encontrados
    </p>
    <div class="services-grid">
      <ServiceCard v-for="item in visible" :key="item.id" :item="item" />
    </div>
    <PaginationNav
      v-model:page="page"
      :total="filtered.length"
      :size="pageSize"
      label="Serviços"
    />
    <p v-if="!filtered.length" class="empty">
      Nenhum serviço encontrado. Tente outra palavra ou categoria.
    </p>
  </section>
</template>
