export interface VisitCounts {
    todayVisitors: number;
    totalVisitors: number;
}

export interface VisitResponse {
    visitedToday?: boolean;
    message?: string;
    error?: string;
    todayVisitors?: number;
    totalVisitors?: number;
}