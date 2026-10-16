import { validPhone } from './booking.js';

// A declaração confirma a revisão pelo responsável; não valida preços no mercado.
export function validateCommercialConfig(config) {
  const items = [...config.services, ...config.promotions];
  for (const item of items) {
    if (item.price == null && item.original == null) continue;
    if (!Number.isFinite(item.price) || item.price < 0 || !Number.isFinite(item.original) || item.original < 0) {
      throw new Error(`Preço inválido: ${item.name}. Use números não negativos.`);
    }
  }
  if (config.demo) return;
  for (const item of items) {
    if (item.original > item.price && item.offerVerified !== true) {
      throw new Error(`Oferta não verificada: ${item.name}. Valide os valores e defina offerVerified: true, ou retire o desconto.`);
    }
  }
  if (!validPhone(config.contact.whatsapp) || !config.contact.address) {
    throw new Error('Preencha telefone válido (55 + DDD + número) e endereço real antes de desativar demo.');
  }
  let domain;
  try { domain = new URL(config.seo.url); } catch { throw new Error('Configure o domínio real HTTPS em seo.url.'); }
  if (domain.protocol !== 'https:') throw new Error('Configure o domínio real HTTPS em seo.url.');
}
