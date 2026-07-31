# Furniro

Desafio React que recria a landing page da **Furniro**, uma loja de móveis e decoração. O projeto foi desenvolvido como parte do programa de bolsa da **Compass UOL**.

## Sumário

- [Preview](#preview)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como rodar](#como-rodar)
- [Funcionalidades](#funcionalidades)
- [Como funciona o Seed JSON](#como-funciona-o-seed-json)
- [Como funciona o Mosaico Animado](#como-funciona-o-mosaico-animado)
- [Minha Experiência](#minha-experiência)
- [Links](#links)

## Preview

A aplicação consiste em uma única página (`Home`) com as seguintes seções:

- **Hero** — banner principal com chamada para ação "Buy Now"
- **Categories** — categorias de produtos em destaque
- **Our Products** — grid de produtos com paginação dinâmica ("Show More")
- **Inspiration** — seção inspiracional com carrossel
- **Mosaic** — galeria de imagens em mosaico
- **Footer** — links, redes sociais e newsletter com validação de e-mail e uso de lib externa para toast.

## Tecnologias

| Tecnologia | Versão |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Tailwind CSS | 4 |
| Vite | 8 |


| Libs externas | Versão | Objetivo |
|---|---|---|
| clsx | 2 | Organização do tailwind. |
| react-hot-toast | 2 | Implementar a toast de validação de email. |
| react-icons | 5 | Implementar o ícone do menu hambúrguer no mobile. |

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header/           # Navbar fixa com menu responsivo
│   ├── Hero/             # Banner principal
│   ├── Categories/       # Seção de categorias
│   ├── OurProducts/      # Grid de produtos com "Show More"
│   ├── Inspiration/      # Seção de inspiração com carrossel
│   ├── Mosaic/           # Galeria em mosaico
│   ├── Footer/           # Rodapé com newsletter
│   └── ...               # Componentes auxiliares
├── db/
│   └── Seed/Seed.json    # Dados dos produtos
├── pages/
│   └── Home/page.tsx     # Página principal
└── App.tsx
```

O database funciona apenas como uma seed JSON para popular o sistema de produtos.

O design original continha diversas páginas, por isso a divisão entre elas.

## Como rodar

**Pré-requisitos:** Node.js instalado.

```bash
# Clonar o repositório
git clone https://github.com/VictorM-Dev/BOOTCAMP---AWS-AI-FDE-FULLLSTACK-D02
cd furniro

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Funcionalidades

- **Responsivo** — layout adaptado para mobile, tablet e desktop
- **Menu mobile** — hamburguer menu para telas menores
- **Show More** — carrega mais produtos dinamicamente conforme o tamanho da tela (1 a 4 colunas)
- **Newsletter** — validação de e-mail com feedback via toast
- **Badges** — produtos marcados com desconto (ex: `-30%`) ou `New` - Com implementação dinâmica a partir do JSON.
- **Hover nos cards** — overlay com ações de compartilhar, comparar e favoritar

## Como funciona o Seed JSON

Os produtos da seção **Our Products** são alimentados por um arquivo JSON estático localizado em `src/db/Seed/Seed.json`. Ele funciona como um banco de dados local, sendo importado diretamente no componente `OurProducts`.

Cada produto segue a seguinte estrutura:

```json
{
  "id": 0,
  "image": "/OurProducts/Syltherine.png",
  "name": "Syltherine",
  "description": "Stylish cafe chair",
  "currentPrice": "Rp 2.500.000",
  "offer": true,
  "oldPrice": "Rp 3.500.000",
  "discount": 30,
  "isNew": false
}
```

Os campos `offer`, `discount` e `isNew` controlam dinamicamente os badges exibidos no card:

- `offer: true` + `discount: 30` → exibe o badge vermelho `-30%`
- `isNew: true` → exibe o badge verde `New`
- Quando `offer` é `false`, o campo `oldPrice` é ignorado e o preço riscado não aparece

O componente `OurProductsCard` recebe essas props e renderiza os badges condicionalmente, sem nenhuma lógica hardcoded.

## Como funciona o Mosaico Animado

A seção **Mosaic** exibe uma galeria de fotos que desliza horizontalmente de forma contínua e infinita.

**A animação** é feita com uma keyframe CSS customizada definida no `index.css` via `@theme` do Tailwind 4:

```css
--animate-slide-loop: loop 40s linear infinite;

@keyframes loop {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

**O truque do loop infinito** está em duplicar o conteúdo. O componente `MosaicContent` (que contém as 9 imagens posicionadas absolutamente) é renderizado duas vezes lado a lado dentro de um container com largura fixa (`w-728`, equivalente a duas vezes a largura de um bloco):

```tsx
<div className="animate-slide-loop w-728 flex gap-4">
  <MoscaiContent />
  <MoscaiContent />
</div>
```

A animação desloca o container até `-50%` da sua largura, que é exatamente o ponto onde a segunda cópia começa — criando a ilusão de um scroll infinito e sem cortes.

**O posicionamento das imagens** dentro de `MosaicContent` é feito com `position: absolute` e coordenadas fixas em unidades Tailwind, replicando fielmente o layout mosaico do design original.

## Minha Experiência

Trabalhar com Tailwind e React foi uma novidade — a sintaxe mudou bastante em relação ao que eu estava acostumado, e precisei me adaptar ao novo sistema. Mas foi muito proveitoso, especialmente combinado com o clsx para manter o código organizado.

A parte que mais me deu trabalho foi o mosaico. Pensando na responsividade, eu não fazia ideia de como abordaria aquilo. Acabei optando por um sistema animado em loop infinito, posicionando todas as imagens com `position: absolute` para manter o pixel perfect do design original.

O sistema de responsividade do **Show More** também foi bem interessante de implementar. Calcular dinamicamente quantas colunas exibir com base no tamanho da tela e refletir isso na quantidade de produtos renderizados me fez pensar bastante sobre como estruturar o estado, principalmente ao lidar com o evento de resize dentro do `useEffect`.

Construir o carrossel com React também foi uma experiência legal, consegui deixar ele dinâmico, se ajustando automaticamente à quantidade de imagens passadas no array, com seu design acompanhando esse ajuste de forma responsiva.

Utilizar o fluxo de trabalho real no git, mesmo sendo um projeto individual, foi bem interessante. Pude criar solicitações de pull request comentadas, analisar e aceitar meu merge (mesmo eu mesmo tendo aceitado kk). Segui o padrão dos commits semânticos no projeto.

No geral, foi um projeto que me fez crescer bastante, tanto em React quanto em CSS. Ainda tem coisas que eu melhoraria, como implementar meu próprio sistema de toast ou refatorar alguns componentes para deixar o código ainda mais organizado, mas estou satisfeito com o resultado.

## Links

- [Facebook Compass UOL](https://www.facebook.com/compass.uol/?locale=pt_BR)
- [Instagram Compass UOL](https://www.instagram.com/compass.uol/)
- [Twitter Compass UOL](https://x.com/compassuol)
- [LinkedIn Compass UOL](https://www.linkedin.com/company/compass-uol/posts/?feedView=all)
