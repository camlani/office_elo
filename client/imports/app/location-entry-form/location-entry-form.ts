export class TableForm {
    constructor (
      public id: string,
      public name: string,
      public dateAdded: Date,
      public status: boolean,
      public sport: string,
      public remove?: boolean
    ) { }

}

export class TableLocationForm {

    constructor(

      public id: string,
      public name: string,
      public dateAdded: Date,
      public tables: TableForm[]

    ) { }

}

