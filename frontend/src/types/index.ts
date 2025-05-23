export interface Repository {
    id: number;
    name: string;
    owner: string;
    stargazers_count: number;
}

export interface ImportResponse {
    message: string;
    data: Repository[];
}