export class matchEntryForm{
    
    constructor(
    public tOneOff: string,
    public tOneDef: string,
    public tTwoOff: string,
    public tTwoDef: string,
    public tOneRotate: string,
    public tTwoRotate: string,
    public tOneWin: string,
    public wScore: number,
    public lScore: number,
    public user: Meteor.User

    ) {  }

}

