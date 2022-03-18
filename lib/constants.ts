export interface Match {
    id: number;
    timestamp: Date;
    title: string;
    url: string;
    results_0: string;
    results_1: string;
}
export interface Data {
    teams: Match[]
    nextId: number | undefined
}