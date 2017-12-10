export interface Table {
    id?: string;
    name?: string;
    dateAdded?: Date;
    status?: boolean;
    sport?: string;
    userAdded? : string;
}


export interface TableLocation {
    id?: string;
    name?: string;
    dateAdded?: Date;
    tables?: Table[];
    userAdded? : string;
  }
