export interface CountryListResponse {
    get:        string;
    parameters: any[];
    errors:     any[];
    results:    number;
    paging:     Paging;
    response:   Country[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Country {
    name: string;
    code: null | string;
    flag: null | string;
}
