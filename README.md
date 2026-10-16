# Esmalteria Elite Nails — catálogo sem preços

Esta revisão substitui o catálogo anterior pelos serviços das três imagens enviadas: 16 opções de unhas com Vanessa e 18 opções de depilação com Fabi. Não há preços, descontos, promoções nem estimativas de duração. As mensagens de WhatsApp incluem serviço e profissional, sem preço. O telefone configurado é +55 11 97441-2934.

A Home apresenta catálogo de unhas com busca/filtros e paginação, equipe, depilação junto ao retrato da Fabi e galeria dos cinco resultados enviados. A Link na Bio, em `/links` (também `/linkbio` e `/bio`), contém serviços, portfólio, depilação e avaliações. O comparador de antes/depois gerado foi retirado. A imagem ilustrativa do hero permanece identificada como demonstrativa; não faz parte do portfólio.

## Executar

Node.js 22.12 ou superior. Abra o terminal na pasta que contém package.json:

```bash
npm ci
npm run dev
npm test
npm run build
npm run check
npm run preview
```

O ZIP inclui código-fonte e `dist/`. Não abra index.html com duplo clique. Use o servidor local. Após qualquer edição, gere um novo build.

## Editar

`src/config/siteConfig.js` centraliza marca, equipe, WhatsApp, serviços, galeria e informações comerciais. Os serviços não têm campos de preço. Não invente condições, endereço, horários ou avaliações. As tabelas enviadas foram transcritas como texto; suas imagens com valores não são exibidas no site.

`src/components/DepilationSection.vue` reúne as 18 opções junto à foto da Fabi. `TeamProfiles.vue` exibe a equipe; `GallerySection.vue` exibe apenas `resultado-1.webp` a `resultado-5.webp`. Retratos e resultados mantêm o conteúdo completo com object-fit: contain.

## Vercel

Envie o conteúdo desta pasta a um repositório. Importe-o na Vercel como Vite: instalação `npm ci`, build `npm run build`, saída `dist`, Node.js 22 ou 24. Selecione a pasta que contém package.json como raiz. O arquivo vercel.json contém as regras de acesso direto da bio.

Substitua a versão anterior inteira, sem misturar arquivos dist/assets. Confira `/`, `/links` e atualização direta de página após publicar.

## Dados ainda pendentes

O modo `demo: true` continua ativo porque os depoimentos são fictícios, o hero é ilustrativo e o domínio, endereço e horários não foram confirmados. Telefone, nomes, funções, catálogo e fotos de portfólio foram fornecidos pelo usuário. Revise os demais dados antes de desativar o modo demonstrativo e configurar SEO público.

Build e testes automatizados foram executados. Validação visual em navegador real e Lighthouse não estão disponíveis neste ambiente. Nenhuma publicação online foi realizada automaticamente.

Instagram configurado: https://www.instagram.com/esmalteria_elitenails/. O botão fica acima do WhatsApp no canto inferior direito, globalmente na Home e na Link na Bio.

## Atualização de apresentação

Área “Seu cuidado com Vanessa” na Home e bio. Cards de serviços somente com nomes, sem fotos ou preços. Fotos de mãos e pés na seção “Resultados de mãos e pés”. Retratos de Vanessa e Fabi sem fundo/moldura preta, preservando as proporções originais.

## Atualização de resultados e Google

Adicionadas 13 fotografias novas às 5 anteriores, totalizando 18 resultados únicos. Quatro anexos repetiam fotos existentes e foram descartados da lista, por comparação visual e de conteúdo. As 17 imagens recebidas estão representadas na galeria sem repetir fotografias.

Depoimentos fictícios removidos da Home e bio. A seção Google oferece acesso às avaliações no perfil, com contagem 46 fornecida pelo estúdio em 15/10/2026. Os textos das avaliações não puderam ser acessados pela pesquisa; não foram copiados nem inventados. Sem nota média ou estrelas presumidas. Para incorporar depoimentos individuais, fornecer textos/capturas ou integração autorizada.

## Endereço confirmado pelo usuário

R. Caiapós, 48 - Piraporinha, Diadema - SP, 09951-520. Configurado na seção Contato, no destino de Como chegar, no mapa Google sob demanda e no texto de localização da Link na Bio. Horários e domínio continuam pendentes. O conteúdo externo do Google Maps não foi testado em navegador real.

## Receber avaliações

O botão “Deixar minha avaliação no Google” está na Home e na bio. `contact.writeReviewUrl` abre o perfil Google Maps identificado pelo CID informado no link de endereço do usuário. A visitante escolhe escrever uma avaliação no Google; o site não publica avaliações em nome dela. O fluxo externo do Google não foi testado em navegador real.
