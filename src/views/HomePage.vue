<script setup>
import { ref } from "vue";
import { siteConfig as c } from "../config/siteConfig";
import { useBooking } from "../composables/useBooking";
import { useReveal } from "../composables/useReveal";
import HeaderNavigation from "../components/HeaderNavigation.vue";
import ServicesSection from "../components/ServicesSection.vue";
import GallerySection from "../components/GallerySection.vue";
import DepilationSection from "../components/DepilationSection.vue";

import ReviewsSection from "../components/ReviewsSection.vue";
import FaqSection from "../components/FaqSection.vue";
import ContactSection from "../components/ContactSection.vue";
import TeamProfiles from "../components/TeamProfiles.vue";
import Brand from "../components/Brand.vue";
import Icon from "../components/Icon.vue";
const { open } = useBooking(),
  root = ref();
useReveal(root);
</script>
<template>
  <div ref="root">
    <HeaderNavigation />
    <main id="main-content" tabindex="-1">
      <section id="inicio" class="hero">
        <div class="wrap hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">{{ c.hero.eyebrow }}</p>
            <h1>{{ c.hero.title }}</h1>
            <div class="hero-brandline"><span></span><Icon name="heart" /><span></span></div>
            <p class="hero-subtitle">{{ c.brand.subtitle }}</p>
            <p class="hero-description">{{ c.hero.description }}</p>
            <div class="actions">
              <button class="button" @click="open()">
                <Icon name="calendar" /> Agendar meu horário</button
              ><a href="#servicos" class="button outline"
                >Conhecer serviços <Icon name="chevron"
              /></a>
            </div>
            <div class="hero-signature">
              <span class="signature-line"></span
              ><span
                >Cuidado que valoriza<br /><strong
                  >a sua essência.</strong
                ></span
              >
            </div>
          </div>
          <div class="hero-photo">
            <img
              :src="c.hero.image"
              :alt="c.hero.alt"
              width="1536"
              height="1024"
              :srcset="`${c.hero.smallImage} 768w, ${c.hero.image} 1536w`"
              sizes="100vw"
              fetchpriority="high"
              decoding="async"
            /><span class="photo-note" v-if="c.demo"
              >Fotografia demonstrativa</span
            >
          </div>
        </div>
        <div class="hero-orbit" aria-hidden="true" />
      </section>
      <div class="feature-band"><div
        class="wrap feature-strip"
        aria-label="Proposta de atendimento demonstrativa"
      >
        <div v-for="f in c.features" :key="f.title">
          <Icon :name="f.icon" /><span>{{ f.title }}</span>
        </div>
      </div>
      </div>
      <ServicesSection />
      <section id="sobre" class="section wrap team-section">
        <div class="section-heading" data-reveal><p class="eyebrow">NOSSA EQUIPE</p><h2>{{ c.about.title }}</h2><p>Manicure e pedicure com Vanessa. Depilação com Fabi.</p></div>
        <TeamProfiles />
      </section>
      <section id="depilacao" class="section wrap"><DepilationSection /></section>
      <GallerySection /><ReviewsSection />
      <FaqSection />
      <section class="bio-discovery wrap">
        <div>
          <p class="eyebrow">O STUDIO, A UM TOQUE</p>
          <h2>Seu atalho para o autocuidado.</h2>
          <p>Serviços, inspirações e agendamento em um só lugar.</p>
        </div>
        <RouterLink to="/links" class="button"
          >Conhecer a Link na Bio <Icon name="arrow"
        /></RouterLink>
      </section>
      <ContactSection />
    </main>
    <footer class="site-footer wrap">
      <RouterLink to="/" class="logo"><Brand /></RouterLink>
      <p>{{ c.brand.tagline }}</p>
      <RouterLink to="/links">Link na Bio <Icon name="arrow" /></RouterLink
      ><small
        >© {{ new Date().getFullYear() }} {{ c.brand.name }}.
        <span v-if="c.demo"
          >Site demonstrativo · dados comerciais pendentes de validação.</span
        ></small
      >
    </footer>
  </div>
</template>
