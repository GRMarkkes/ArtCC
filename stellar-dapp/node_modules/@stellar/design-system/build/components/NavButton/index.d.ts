import React from "react";
import "./styles.scss";
interface NavButtonProps {
    id: string;
    title: string;
    onClick: () => void;
    icon: React.ReactNode;
    disabled?: boolean;
    showBorder?: boolean;
}
export declare const NavButton: React.FC<NavButtonProps>;
export {};
//# sourceMappingURL=index.d.ts.map