import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bookingMessage,whatsappUrl} from '../src/utils/booking.js';
import {siteConfig as c} from '../src/config/siteConfig.js';
test('catálogo contém somente os 16 serviços de unhas e 18 de depilação informados',()=>{assert.equal(c.services.length,34);assert.equal(c.services.filter(s=>s.category==='Depilação').length,18);for(const s of c.services){assert.equal(s.price,undefined);assert.equal(s.original,undefined);assert.equal(s.duration,undefined);}assert.equal(c.promotions.length,0);assert.equal(c.transformations.length,0);});
test('cada opção gera WhatsApp correto sem preço e com profissional',()=>{for(const item of c.services){const message=bookingMessage({item,name:'Ana & Bia',date:'2027-01-02',time:'Tarde'});const u=new URL(whatsappUrl(c.contact.whatsapp,message));assert.equal(u.pathname,'/5511974412934');assert.equal(u.searchParams.get('text'),message);assert.ok(message.includes(item.name));assert.ok(message.includes(item.professional));assert.doesNotMatch(message,/R\$|undefined|demonstrativo/);assert.match(message,/confirmação/);}});
test('portfólio mantém 18 resultados únicos enviados',()=>{assert.equal(c.gallery.length,18);assert.equal(new Set(c.gallery.map(p=>p.image)).size,18);assert.ok(c.gallery.every(p=>p.demonstrative===false));assert.equal(c.reviews.length,0);});
test('telefone inválido não cria destinatário',()=>{assert.equal(whatsappUrl('', 'oi'),null);assert.equal(whatsappUrl('123','oi'),null);});
