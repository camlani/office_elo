export interface MatchStats {
    _id?: string;
    teamOneOffense?: string;
    teamOneDefense?: string;
    teamTwoOffense?: string;
    teamTwoDefense?: string;
    teamOneRotated?: boolean;
    teamTwoRotated? : boolean;
    mathDate?: Date;
    teamOneWin?: boolean;
    winScore?: int;
    loseScore?: int;
  }
  