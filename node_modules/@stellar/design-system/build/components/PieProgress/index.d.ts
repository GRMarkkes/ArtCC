/// <reference types="react" />
import "./styles.scss";
interface PieProgressProps {
    total: number;
    passed: number;
    failed: number;
    customSize?: string;
    customBackgroundColor?: string;
}
export declare const PieProgress: {
    ({ total, passed, failed, customSize, customBackgroundColor, }: PieProgressProps): JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=index.d.ts.map