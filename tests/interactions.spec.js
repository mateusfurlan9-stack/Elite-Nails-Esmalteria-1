import GoogleReviews from "../src/components/GoogleReviews.vue";
import WhatsAppWidget from "../src/components/WhatsAppWidget.vue";
import {it,expect,afterEach} from 'vitest';
import {mount,flushPromises} from '@vue/test-utils';
import {createMemoryHistory} from 'vue-router';
import {makeRouter} from '../src/router';
import {siteConfig as c} from '../src/config/siteConfig';
import {useBooking} from '../src/composables/useBooking';
import Services from '../src/components/ServicesSection.vue';
import Depilation from '../src/components/DepilationSection.vue';
import Booking from '../src/components/BookingModal.vue';
import Gallery from '../src/components/GallerySection.vue';
import Header from '../src/components/HeaderNavigation.vue';
let wrappers=[];
const render=(comp,options={})=>{const w=mount(comp,{attachTo:document.body,...options,global:{...options.global,stubs:{teleport:true}}});wrappers.push(w);return w;};
afterEach(()=>{wrappers.forEach(w=>w.unmount());wrappers=[];useBooking().close();document.body.innerHTML='';});
it('catálogo pesquisa serviços da imagem sem preços nem depilação misturada',async()=>{const w=render(Services);expect(w.text()).not.toContain('R$');await w.find('input').setValue('pedraria');expect(w.findAll('.service-card')).toHaveLength(1);expect(w.text()).toContain('Pedraria');await w.find('input').setValue('Alongamento');expect(w.findAll('.service-card')).toHaveLength(0);});
it('18 opções de depilação ao lado da foto da Fabi selecionam o serviço certo',async()=>{const w=render(Depilation);expect(w.find('img').attributes('src')).toBe('/media/fabi.webp');expect(w.findAll('option')).toHaveLength(18);await w.find('select').setValue('depilacao-18');await w.find('button').trigger('click');expect(useBooking().requested.value.name).toBe('Depilação — Virilha completa + perianal');});
it('agendamento envia serviço e profissional ao número informado sem preço',async()=>{const w=render(Booking);useBooking().open(c.services[0]);await flushPromises();expect(w.findAll('option').some(x=>x.text().includes('R$'))).toBe(false);await w.find('form').trigger('submit');const url=new URL(w.find('a[href^="https://wa.me"]').attributes('href'));expect(url.pathname).toBe('/5511974412934');expect(url.searchParams.get('text')).toContain('Manicure simples');expect(url.searchParams.get('text')).toContain('Vanessa');expect(url.searchParams.get('text')).not.toContain('R$');});
it('galeria pagina os cinco resultados e amplia a quinta foto enviada',async()=>{const w=render(Gallery);expect(w.findAll('.gallery-item')).toHaveLength(4);await w.find('[aria-label="Portfólio: próxima página"]').trigger('click');await w.find('.gallery-item').trigger('click');await flushPromises();expect(w.find('.lightbox img').attributes('src')).toBe('/media/resultado-5.webp');expect(w.find('.lightbox-controls').text()).toContain('5 / 18');});
it('menu tem depilação e libera rolagem ao fechar',async()=>{const r=makeRouter(createMemoryHistory());await r.push('/');await r.isReady();const w=render(Header,{global:{plugins:[r]}});expect(w.text()).toContain('Depilação');expect(w.text()).not.toContain('Promoções');await w.find('.menu-toggle').trigger('click');await flushPromises();expect(document.querySelector('dialog').open).toBe(true);w.unmount();expect(document.body.classList.contains('dialog-open')).toBe(false);});
it.each(['/links','/linkbio','/bio','/links.html'])('bio %s tem aba de depilação e nenhuma oferta/preço',async(path)=>{const r=makeRouter(createMemoryHistory());await r.push(path);await r.isReady();const w=render({template:'<RouterView />'},{global:{plugins:[r]}});await flushPromises();expect(w.find('h1').text()).toBe('Elite Nails');expect(w.text()).not.toContain('R$');expect(w.find('#panel-ofertas').exists()).toBe(false);await w.find('#tab-depilacao').trigger('click');expect(w.find('#panel-depilacao').isVisible()).toBe(true);expect(w.find('#panel-depilacao img').attributes('src')).toBe('/media/fabi.webp');});

it('Instagram fica antes do WhatsApp no widget global com link correto',()=>{const w=render(WhatsAppWidget);const links=w.findAll('a');expect(links[0].classes()).toContain('instagram-button');expect(links[0].attributes('href')).toBe('https://www.instagram.com/esmalteria_elitenails/');expect(links[0].attributes('rel')).toContain('noopener');expect(links[1].classes()).toContain('whatsapp-button');});

it('Vanessa tem área própria e serviços somente em texto',()=>{const w=render(Services);expect(w.find('h2').text()).toBe('Seu cuidado com Vanessa.');expect(w.find('.vanessa-intro img').attributes('src')).toBe('/media/vanessa.webp');expect(w.findAll('.service-card img')).toHaveLength(0);expect(w.find('.service-card').text()).toContain('Manicure simples');});

it('Google mostra contagem informada e link sem inventar avaliações',()=>{const w=render(GoogleReviews);expect(w.text()).toContain('46');expect(w.text()).toContain('Informado pelo estúdio');expect(w.find('a').attributes('href')).toContain('google.com');expect(w.findAll('blockquote')).toHaveLength(0);});

it('botão de avaliar abre o perfil correto em nova aba',()=>{const w=render(GoogleReviews);const link=w.find('a[aria-label="Deixar minha avaliação no Google, abre em nova aba"]');expect(link.attributes('href')).toBe('https://www.google.com/maps?cid=13529375086080531344');expect(link.attributes('target')).toBe('_blank');expect(link.attributes('rel')).toContain('noopener');expect(w.text()).toContain('escrever uma avaliação');});
