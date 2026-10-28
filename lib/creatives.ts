// Criativos: peças de social media, campanhas e artes autorais.
// Imagens em /public/criativos (versão -thumb para a grade, sem sufixo para o lightbox).
// client vazio = arte autoral.

export type Creative = {
  id: string;
  client: string;
  w: number;
  h: number;
  slides?: number; // carrossel: arquivos {id}-1 … {id}-N
};

export const creatives: Creative[] = [
  { id: "headless-gentleman", client: "", w: 4, h: 5 },
  { id: "sv-dulce", client: "Super Vegan", w: 4, h: 5 },
  { id: "surp-surpreendavel", client: "SURP!", w: 4, h: 5 },
  { id: "alien-visit", client: "", w: 1637, h: 2315 },
  { id: "sunrize-off10", client: "Sunrize", w: 1, h: 1 },
  { id: "pacoca-varias-formas", client: "Pasoka do Tão", w: 1, h: 1 },
  { id: "desista", client: "", w: 2480, h: 3508 },
  { id: "surreal-crocancia", client: "Surreal Bisks", w: 1, h: 1 },
  { id: "surp-carrossel", client: "SURP!", w: 4, h: 5, slides: 7 },
  { id: "apple-dimension", client: "", w: 4, h: 5 },
  { id: "sv-cobertura", client: "Super Vegan", w: 4, h: 5 },
  { id: "evida-volta10", client: "Evida", w: 4, h: 5 },
  { id: "open-your-eyes", client: "", w: 4, h: 5 },
  { id: "sunrize-black-november", client: "Sunrize", w: 1, h: 1 },
  { id: "sv-impossivel", client: "Super Vegan", w: 1, h: 1 },
  { id: "planet-chaos", client: "", w: 4, h: 5 },
  { id: "surp-mais-gente", client: "SURP!", w: 4, h: 5 },
  { id: "pacoca-confete", client: "Pasoka do Tão", w: 1, h: 1 },
  { id: "popcorn-life", client: "", w: 2480, h: 3508 },
  { id: "sv-pascoa", client: "Super Vegan", w: 4, h: 5 },
  { id: "surreal-beneficios", client: "Surreal Bisks", w: 4, h: 5 },
  { id: "procure", client: "", w: 4, h: 5 },
  { id: "sunrize-coqueteleira", client: "Sunrize", w: 1, h: 1 },
  { id: "surp-passaro", client: "SURP!", w: 4, h: 5 },
  { id: "sneak-peek", client: "", w: 4, h: 5 },
  { id: "sv-chocolate-gotas", client: "Super Vegan", w: 1, h: 1 },
  { id: "surreal-pacotinho", client: "Surreal Bisks", w: 1, h: 1 },
];

export const creativeSrc = (c: Creative, slide?: number, thumb = false) =>
  `/criativos/${c.id}${c.slides ? `-${(slide ?? 0) + 1}` : ""}${thumb ? "-thumb" : ""}.webp`;
