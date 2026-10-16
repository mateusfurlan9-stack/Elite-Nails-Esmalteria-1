import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateCommercialConfig} from '../src/utils/validateConfig.js';
import {siteConfig} from '../src/config/siteConfig.js';
test('catálogo sem preços compila em demonstração',()=>assert.doesNotThrow(()=>validateCommercialConfig(siteConfig)));
test('SEO público continua exigindo endereço e domínio reais',()=>{const c=structuredClone(siteConfig);c.demo=false;c.contact.address="";assert.throws(()=>validateCommercialConfig(c),/endereço/);c.contact.address='Endereço de teste';c.seo.url='https://example.com';assert.doesNotThrow(()=>validateCommercialConfig(c));});
