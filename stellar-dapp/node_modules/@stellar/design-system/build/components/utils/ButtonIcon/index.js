import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import "./styles.scss";
var ButtonIconPosition;
(function (ButtonIconPosition) {
    ButtonIconPosition["left"] = "left";
    ButtonIconPosition["right"] = "right";
})(ButtonIconPosition || (ButtonIconPosition = {}));
export var ButtonIcon = function (_a) {
    var position = _a.position, children = _a.children;
    return (_jsx("span", __assign({ className: "ButtonIcon ButtonIcon--".concat(position) }, { children: children })));
};
ButtonIcon.position = ButtonIconPosition;
//# sourceMappingURL=index.js.map