class QueryParams {
    languages: string[];
    minCredits: number;
    maxCredits: number;
    minSalary: number;
    maxSalary: number;
    opensIn: number;
    search: string;
    sort: string;
    page: number;

    constructor(
        languages: string[] = [],
        minCredits: number = 0,
        maxCredits: number = 1000,
        minSalary: number = 0,
        maxSalary: number = 40000,
        opensIn: number = 12,
        search: string = "",
        sort: string = "opensIn,asc",
        page: number = 1,
    ) {
        this.languages = languages;
        this.minCredits = minCredits;
        this.maxCredits = maxCredits;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.opensIn = opensIn;
        this.search = search;
        this.sort = sort;
        this.page = page;
    }
}

const defaultQueryParams = new QueryParams();

export { QueryParams, defaultQueryParams };
