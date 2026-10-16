import { readFile, readdir, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import { siteConfig as c, media } from "../src/config/siteConfig.js";
const all = [...c.services, ...c.promotions, ...c.gallery].map((i) =>
  media(i.image),
);
all.push(...c.team.map(p => p.photo));
all.push(c.hero.image, c.hero.smallImage, c.about.photo, c.brand.logo);
for (const path of new Set(all)) {
  const s = await stat(`public${path}`);
  assert.ok(s.size > 0, `Mídia ausente: ${path}`);
}
for (const route of ["dist/index.html", "dist/links/index.html"]) {
  const html = await readFile(route, "utf8");
  assert.match(html, /<h1/);
  assert.ok(html.includes(c.brand.name));
  assert.ok(html.includes(c.demo || !c.seo.url ? "noindex" : "index, follow"));
  assert.doesNotMatch(html, /advocacia|OAB\/|jurídic|Aguiar|Santos/i);
  assert.match(html, /lang="pt-BR"/);
  assert.match(html, /id="main-content"/);
}
const home = await readFile("dist/index.html", "utf8");
for (const id of [
  "inicio",
  "sobre",
  "servicos",
  "portfolio",
  "depilacao",
  "avaliacoes",
  "duvidas",
  "contato",
])
  assert.ok(home.includes(`id="${id}"`), `Seção ausente: ${id}`);
const config = JSON.parse(await readFile("vercel.json", "utf8"));
assert.equal(config.outputDirectory, "dist");
const files = await readdir("dist/assets");
assert.ok(files.some((f) => f.startsWith("HomePage-")));
assert.ok(files.some((f) => f.startsWith("LinksPage-")));
console.log(
  `OK: ${new Set(all).size} mídias locais, 2 páginas pré-renderizadas, 8 seções, metadados e chunks de rotas.`,
);

for (const path of [
  "dist/links.html",
  "dist/linkbio.html",
  "dist/linkbio/index.html",
]) {
  const html = await readFile(path, "utf8");
  assert.match(html, /bio-tabs/);
  assert.match(html, /Agendar meu horário/);
}
const bioHtml = await readFile("dist/links.html", "utf8");
assert.match(bioHtml, /role="tablist"/);
assert.equal((home.match(/class="service-card text-service/g) || []).length, 3);
assert.match(home, /bio-shortcut/);
console.log(
  "OK: bio em arquivos independentes, abas acessíveis, atalho visível e catálogo compacto.",
);

assert.doesNotMatch(home, /R\$|class="prices"|id="transformacoes"|id="promocoes"/);
assert.doesNotMatch(bioHtml, /R\$|class="prices"|panel-ofertas/);
for (const photo of c.gallery) assert.match(photo.image, /^resultado-(?:[1-5]|novo-\d+)$/);
assert.equal(c.services.length, 34);
console.log("OK: 34 serviços, sem preços na Home/bio, 18 fotos enviadas no portfólio.");
