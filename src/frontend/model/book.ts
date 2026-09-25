import chapter from "../../exercises/mumuki-tema-introduccion-a-la-programacion-funcional-pdep-utn.json"

export const functional = chapter

export const chapters: any[] = [
  functional,
  {
    id: 2,
    name: "Programación Lógica",
    description:
      "¿Querés aprender a programar _describiendo el mundo y enseñando reglas_ a la computadora? ¿Querés escribir código que cualquiera puede entender? Entonces acompañanos a aprender sobre el paradigma lógico, utilizando su lenguaje más conocido: [Prolog](https://www.swi-prolog.org/).",
    imageUrl: "https://mumuki.io/static/for_content/capitulo4-01.svg",
    lessons: [],
  },
  {
    id: 3,
    name: "Programación con Objetos",
    description:
      "El paradigma de objetos, a veces también conocido como _orientado a objetos_ nos propone solucionar problemas y modelar nuestra realidad empleando objetos que se comunican entre ellos intercambiando mensajes. ¡Adentrémonos en el mundo de los objetos y [Wollok](https://www.wollok.org/)!",
    imageUrl: "https://mumuki.io/static/for_content/capitulo5-01.svg",
    lessons: [],
  },
  {
    id: 4,
    name: "Control de versiones",
    description: "Al programar o maquetar necesitaremos interactuar con muchos archivos, pero si no tenemos cuidado lidiar con todos ellos podría tornarse muy complicado. ¡Aprendamos entonces a **manejar archivos y versiones**, de la mano de [Bash](https://es.wikipedia.org/wiki/Bash) y [Git](https://es.wikipedia.org/wiki/G.I.T.)!",
    imageUrl: "https://mumuki.io/static/for_content/capitulo11-01.svg",
    lessons: [],
  },
];
