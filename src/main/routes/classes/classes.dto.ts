export interface ClassesFindManyDTO {
  filter: {
    class: {
      name: {
        like: string
      }
    }
  }
}
