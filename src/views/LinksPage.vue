<script setup>
import { computed, ref, onUnmounted, nextTick } from "vue";
import { siteConfig as c, media } from "../config/siteConfig";
import { useBooking } from "../composables/useBooking";
import DepilationSection from "../components/DepilationSection.vue";
import TeamProfiles from "../components/TeamProfiles.vue";
import Brand from "../components/Brand.vue";
import Icon from "../components/Icon.vue";
import GoogleReviews from "../components/GoogleReviews.vue";
import ServicesSection from "../components/ServicesSection.vue";

const { open } = useBooking(),
  shareStatus = ref(""),
  tab = ref("servicos");
let shareTimer;
const tabs = [
  ["servicos", "Serviços"],
  ["portfolio", "Portfólio"],
  ["depilacao", "Depilação"],
  ["avaliacoes", "Avaliações"],
];
const featured = c.services.filter((s) =>
  ["manicure", "pedicure", "manicure-decorada"].includes(s.id),
);
async function sharePage() {
  const data = {
    title: c.brand.name,
    text: c.brand.tagline,
    url: new URL("/links", location.origin).href,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      shareStatus.value = "Link compartilhado.";
    } else {
      await navigator.clipboard.writeText(data.url);
      shareStatus.value = "Link copiado.";
    }
  } catch (error) {
    if (error.name !== "AbortError")
      shareStatus.value =
        "Copie o endereço da barra do navegador para compartilhar.";
  }
  clearTimeout(shareTimer);
  shareTimer = setTimeout(() => (shareStatus.value = ""), 5000);
}
onUnmounted(() => clearTimeout(shareTimer));
async function tabKey(event, i) {
  let n;
  if (event.key === "ArrowRight") n = (i + 1) % tabs.length;
  else if (event.key === "ArrowLeft") n = (i + tabs.length - 1) % tabs.length;
  else if (event.key === "Home") n = 0;
  else if (event.key === "End") n = tabs.length - 1;
  else return;
  event.preventDefault();
  tab.value = tabs[n][0];
  await nextTick();
  document.getElementById(`tab-${tab.value}`)?.focus();
}
</script>
<template>
  <main id="main-content" tabindex="-1" class="bio-page">
    <div class="bio-shell">
      <div class="bio-topbar">
        <RouterLink to="/">← Site completo</RouterLink
        ><button class="text-button bio-share" @click="sharePage">
          Compartilhar <Icon name="arrow" />
        </button>
      </div>
      <p v-if="shareStatus" class="share-status" role="status">
        {{ shareStatus }}
      </p>
      <div class="bio-layout">
        <div class="bio-profile-column">
          <div class="bio-cover">
            <img
              :src="c.hero.image"
              :alt="c.hero.alt"
              width="504"
              height="504"
              fetchpriority="high"
            /><Brand />
          </div>
          <div class="bio-profile">
            <img
              class="bio-avatar"
              :src="c.brand.logo || c.about.photo"
              :alt="c.brand.logo ? c.brand.name : c.about.alt"
              width="96"
              height="96"
            />
            <p class="eyebrow">ESMALTERIA</p>
            <h1>{{ c.brand.name }}</h1>
            <p>{{ c.brand.tagline }}</p>
            <small v-if="c.demo">Manicure e pedicure com Vanessa · depilação com Fabi</small>
          </div>
          <button class="button full bio-book" @click="open()">
            <Icon name="calendar" /> Agendar meu horário <Icon name="arrow" />
          </button>
          <p class="bio-address"><Icon name="pin" /> {{ [c.contact.address, c.contact.city, c.contact.postalCode].filter(Boolean).join(", ") }}</p>
          <TeamProfiles compact />
          <div class="bio-socials">
            <a
              v-if="c.contact.instagram"
              :href="c.contact.instagram"
              target="_blank"
              rel="noopener noreferrer"
              ><Icon name="instagram" />Instagram</a
            ><span v-else class="unconfigured-social"
              ><Icon name="instagram" />Instagram em breve</span
            ><button @click="open()"><Icon name="whatsapp" />WhatsApp</button
            ><RouterLink to="/#contato"
              ><Icon name="pin" />Localização</RouterLink
            ><a
              v-if="c.contact.tiktok"
              :href="c.contact.tiktok"
              target="_blank"
              rel="noopener noreferrer"
              >TikTok</a
            >
          </div>
        </div>
        <div class="bio-content-column">
          <div class="bio-heading">
            <p class="eyebrow">ESCOLHA SEU MOMENTO</p>
            <h2>Beleza na ponta dos dedos.</h2>
          </div>
          <div role="tablist" aria-label="Explore o estúdio" class="bio-tabs">
            <button
              v-for="([key, label], i) in tabs"
              :key="key"
              :id="`tab-${key}`"
              role="tab"
              :aria-selected="tab === key"
              :aria-controls="`panel-${key}`"
              :tabindex="tab === key ? 0 : -1"
              @click="tab = key"
              @keydown="tabKey($event, i)"
            >
              {{ label }}
            </button>
          </div>
          <section
            id="panel-servicos"
            role="tabpanel"
            aria-labelledby="tab-servicos"
            v-show="tab === 'servicos'"
            class="bio-tab-panel"
          >
            <ServicesSection compact />
          </section>
          <section
            id="panel-portfolio"
            role="tabpanel"
            aria-labelledby="tab-portfolio"
            v-show="tab === 'portfolio'"
            class="bio-tab-panel"
          >
            <p class="demo-note">{{ c.gallerySource }}</p>
            <div class="bio-mini-gallery">
              <RouterLink
                v-for="p in c.gallery"
                :key="p.id"
                to="/#portfolio"
                :aria-label="`Ver portfólio: ${p.caption}`"
                ><img
                  :src="media(p.image)"
                  :alt="p.alt"
                  :width="p.width"
                  :height="p.height"
                  loading="lazy"
                /><span>{{ p.category }}</span></RouterLink
              >
            </div>
            <RouterLink to="/#portfolio" class="button outline full"
              >Explore o portfólio completo <Icon name="arrow"
            /></RouterLink>
          </section>
          <section id="panel-depilacao" role="tabpanel" aria-labelledby="tab-depilacao" v-show="tab === 'depilacao'" class="bio-tab-panel"><DepilationSection compact /></section>
          <section
            id="panel-avaliacoes"
            role="tabpanel"
            aria-labelledby="tab-avaliacoes"
            v-show="tab === 'avaliacoes'"
            class="bio-tab-panel"
          >
            <GoogleReviews />
          </section>
          <RouterLink class="bio-full-site" to="/"
            >Visite nosso site completo <Icon name="arrow"
          /></RouterLink>
        </div>
      </div>
      <footer class="bio-footer">
        <Brand />
        <p>
          {{
            c.demo
              ? "Experiência demonstrativa · informações comerciais a validar"
              : c.brand.tagline
          }}
        </p>
      </footer>
    </div>
  </main>
</template>
