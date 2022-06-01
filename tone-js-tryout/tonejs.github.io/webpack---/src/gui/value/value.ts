
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneValue = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = __webpack_require__(/*! ./value.scss */ "./src/gui/value/value.scss");
/**
 * Base class for values
 */
class ToneValue extends lit_element_1.LitElement {
    /**
     * Beautify the value before it's set
     */
    beautifyValue(val) {
        return val;
    }
    /**
     * Trigger a "value" event. Value events have a rejected callback
     * in case the value is not valid
     */
    dispatchValue(value) {
        this.dispatchEvent(new CustomEvent("value", {
            detail: {
                value,
                reject: (val) => {
                    this.value = val;
                    // flash red quickly?
                    this.shadowRoot
                        .querySelector("#container")
                        .classList.add("error");
                    setTimeout(() => {
                        this.shadowRoot
                            .querySelector("#container")
                            .classList.remove("error");
                    }, 100);
                    this.reset();
                },
            },
        }));
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    render() {
        return lit_element_1.html ` ${this.name} `;
    }
}
__decorate([
    lit_element_1.property({ type: String })
], ToneValue.prototype, "name", void 0);
exports.ToneValue = ToneValue;

