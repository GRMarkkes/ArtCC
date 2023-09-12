/// <reference types="react" />
import "./styles.scss";
interface PaginationProps {
    pageSize: number;
    itemCount: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
}
export declare const Pagination: ({ pageSize, itemCount, currentPage, setCurrentPage, }: PaginationProps) => JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map