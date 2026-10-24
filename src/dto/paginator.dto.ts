export interface PaginatorRequest {
    pageIndex: number;
    pageSize: number;
}

export interface PaginatorResponse<T> {
    data: T[];
    length: number;
}