import { Topic } from "./topic";
import { Content } from "./content"
import chapter from "../../exercises/mumuki-tema-introduccion-a-la-programacion-funcional-pdep-utn.json"

class Book extends Content {
  public chapters: Chapter[] = []

  firstChapter(): Chapter | undefined {
    return this.chapters[0]
  }
}

class Chapter {
  constructor(
    public readonly topic: Topic,
    public readonly book: Book,
    public readonly number: number
  ) { }
}

const pdep = {
  id: 1,
  name: "PdeP",
}

export const functional = chapter