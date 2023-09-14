import React from "react";
import "./styles.scss";
declare enum IconButtonVariant {
    default = "default",
    error = "error",
    success = "success",
    warning = "warning",
    highlight = "highlight"
}
declare enum IconButtonPreset {
    copy = "copy",
    download = "download"
}
interface IconButtonComponent {
    variant: typeof IconButtonVariant;
    preset: typeof IconButtonPreset;
}
interface IconButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IconButtonVariant;
    label?: string;
    customColor?: string;
    customSize?: string;
}
interface IconButtonDefaultProps extends IconButtonBaseProps {
    icon: React.ReactNode;
    altText: string;
    preset?: IconButtonPreset;
}
interface IconButtonPresetProps extends IconButtonBaseProps {
    preset: IconButtonPreset;
    icon?: React.ReactNode;
    altText?: string;
}
type IconButtonProps = IconButtonDefaultProps | IconButtonPresetProps;
export declare const IconButton: React.FC<IconButtonProps> & IconButtonComponent;
export {};
//# sourceMappingURL=index.d.ts.map