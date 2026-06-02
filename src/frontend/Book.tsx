import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DeepPartial } from "./helpers/DeepPartial";
import { Main } from "./Main";
import { Book as BookModel } from "./model/book";
import { Topic } from "./model/topic";
import { ContentChildrenTitle, ContentChildTitle, ContentTitle } from "./Title";
import IntroBanner from "./IntroBanner";
import { Description } from "./Description";

const book: DeepPartial<BookModel> = {
  name: "Paradigmas de programación",
  description:
    "¿Creías que había una única forma de programar? En este recorrido estudiaremos algunas de ellas. ¡Vamos!",
};

// TODO model as chapters
const chapters: Partial<Topic>[] = [
  {
    id: 1,
    name: "Programación Funcional",
    description:
      "El paradigma funcional es de los más **antiguos**, pero también de los más **simples** y **poderosos**. Si querés aprender _a dominar el mundo con nada_, utilizando [Haskell](https://www.haskell.org/), seguí por acá.",
    imageUrl: "https://mumuki.io/static/for_content/capitulo3-01.svg",
  },
  {
    id: 2,
    name: "Programación Lógica",
    description:
      "¿Querés aprender a programar _describiendo el mundo y enseñando reglas_ a la computadora? Aprendamos [Prolog](https://www.swi-prolog.org/).",
    imageUrl: "https://mumuki.io/static/for_content/capitulo4-01.svg",
  },
  {
    id: 3,
    name: "Programación con Objetos",
    description:
      "El paradigma de objetos, a veces también conocido como _orientado a objetos_ nos propone solucionar problemas y modelar nuestra realidad empleando objetos que se comunican entre ellos intercambiando mensajes. ¡Adentrémonos en el mundo de los objetos y [Wollok](https://www.wollok.org/)!",
    imageUrl: "https://mumuki.io/static/for_content/capitulo5-01.svg",
  },
  {
    id: 4,
    name: "Control de versiones",
    description: "Al programar o maquetar necesitaremos interactuar con muchos archivos, pero si no tenemos cuidado lidiar con todos ellos podría tornarse muy complicado. ¡Aprendamos entonces a **manejar archivos y versiones**, de la mano de [Bash](https://es.wikipedia.org/wiki/Bash) y [Git](https://es.wikipedia.org/wiki/G.I.T.)!",
    imageUrl: "https://mumuki.io/static/for_content/capitulo11-01.svg",
  },
];

const Book: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Main narrow={true} book={book}>
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <img
          src="https://mumuki.io/logo-alt-large.png"
          alt="Mumuki"
          className="mx-auto mb-4 h-20"
        />
        <ContentTitle>{book.name}</ContentTitle>
        <p className="text-gray-600 mb-4 text-justify">{book.description}</p>
        <IntroBanner />
        <Link
          to="/lessons/1"
          className="inline-block bg-mumuki-rose hover:bg-mumuki-rose-darken hover:text-white hover:underline text-white px-4 py-2 rounded">
          {t("startPracticing")}
        </Link>
      </div>

      {/* Chapters */}
      <section className="max-w-3xl mx-auto w-full">
        <ContentChildrenTitle>{t("chapters")}</ContentChildrenTitle>
        <div className="space-y-8">
          {chapters.map((chapter) => {

            return (
              <div key={chapter.id} className="">
                <div className="flex justify-between items-center">
                  <ContentChildTitle>
                    {chapter.id}.{" "}
                    <Link
                      to={`chapters/${chapter.id}`}
                      className="text-mumuki-skyblue hover:underline">
                      {chapter.name}
                    </Link>
                  </ContentChildTitle>
                </div>

                <div className="flex gap-4">
                  <img
                    src={chapter.imageUrl}
                    alt=""
                    className="h-auto w-auto object-contain"
                  />
                  {chapter.description !== undefined && (
                    <Description className="text-justify">{chapter.description}</Description>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Main>
  );
};

export default Book;
