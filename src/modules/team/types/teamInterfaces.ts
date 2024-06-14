// teamInterfaces.ts
export interface TeamListResponse {
    get: string;
    parameters: Parameters;
    errors: any[];
    results: number;
    paging: Paging;
    response: Response[];
  }
  
  export interface Paging {
    current: number;
    total: number;
  }
  
  export interface Parameters {
    id: string;
  }
  
  export interface Response {
    team: Team;
    venue: Venue;
  }
  
  export interface Team {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  }
  
  export interface Venue {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  }
  
  export interface FixtureResponse {
    get: string;
    parameters: Parameters;
    errors: any[];
    results: number;
    paging: Paging;
    response: ResponseFixture[];
  }
  
  export interface Parameters {
    live: string;
  }
  
  export interface ResponseFixture {
    fixture: Fixture;
    league: League;
    teams: Goals;
    goals: Goals;
    score: Score;
  }
  
  export interface Fixture {
    id: number;
    referee: null;
    timezone: string;
    date: Date;
    timestamp: number;
    periods: Periods;
    venue: Venue;
    status: Status;
  }
  
  export interface Periods {
    first: number;
    second: null;
  }
  
  export interface Status {
    long: string;
    short: string;
    elapsed: number;
  }
  
  export interface Venue {
    id: number;
    name: string;
    city: string;
  }
  
  export interface Goals {
    home: AwayClass | number | null;
    away: AwayClass | number | null;
  }
  
  export interface AwayClass {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  }
  
  export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  }
  
  export interface Score {
    halftime: Goals;
    fulltime: Goals;
    extratime: Goals;
    penalty: Goals;
  }
  
  export interface FixesTeam {
    currentFixture?: ResponseFixture;
    lastFixture?: ResponseFixture;
    nextFixture?: ResponseFixture;
  }
  





  export interface LineupsResponse {
    get:        string;
    parameters: Parameters;
    errors:     any[];
    results:    number;
    paging:     Paging;
    response:   ResponseLineups[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    fixture: string;
}

export interface ResponseLineups {
    team:        Team;
    formation:   string;
    startXI:     StartXi[];
    substitutes: StartXi[];
    coach:       Coach;
}

export interface Coach {
    id:    number;
    name:  string;
    photo: string;
}

export interface StartXi {
    player: Player;
}

export interface Player {
    id:     number;
    name:   string;
    number: number;
    pos:    Pos;
    grid:   null | string;
}

export enum Pos {
    D = "D",
    F = "F",
    G = "G",
    M = "M",
}


export interface Colors {
    player:     Goalkeeper;
    goalkeeper: Goalkeeper;
}

export interface Goalkeeper {
    primary: string;
    number:  string;
    border:  string;
}
