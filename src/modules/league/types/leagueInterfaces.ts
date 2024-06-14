export interface LeagueListResponse {
    get:        string;
    parameters: Parameters;
    errors:     any[];
    results:    number;
    paging:     Paging;
    response:   Response[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    country: CountryEnum;
}

export enum CountryEnum {
    England = "England",
}

export interface Response {
    league:  League;
    country: CountryClass;
    seasons: Season[];
}

export interface CountryClass {
    name: CountryEnum;
    code: Code;
    flag: string;
}

export enum Code {
    GB = "GB",
}

export interface League {
    id:   number;
    name: string;
    type: Type;
    logo: string;
}

export enum Type {
    Cup = "Cup",
    League = "League",
}

export interface Season {
    year:     number;
    start:    Date;
    end:      Date;
    current:  boolean;
    coverage: Coverage;
}

export interface Coverage {
    fixtures:    Fixtures;
    standings:   boolean;
    players:     boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards:   boolean;
    injuries:    boolean;
    predictions: boolean;
    odds:        boolean;
}

export interface Fixtures {
    events:              boolean;
    lineups:             boolean;
    statistics_fixtures: boolean;
    statistics_players:  boolean;
}
