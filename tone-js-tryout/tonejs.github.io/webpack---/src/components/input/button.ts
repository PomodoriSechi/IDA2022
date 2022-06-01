
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneButton = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const start_1 = __webpack_require__(/*! ../util/start */ "./src/components/util/start.ts");
const style = __webpack_require__(/*! ./button.scss */ "./src/components/input/button.scss");
class ToneButton extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.pressed = false;
        this.disabled = false;
    }
    updated(changed) {
        if (changed.has("pressed")) {
            this.dispatchEvent(new CustomEvent(this.pressed ? "down" : "up", {
                composed: true,
            }));
        }
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    _mousedown(e) {
        start_1.startContext();
        if (e.type === "touchstart") {
            e.preventDefault();
        }
        this.pressed = true;
    }
    _keydown(e) {
        start_1.startContext();
        if (e.key === " " || e.key === "Enter") {
            this.pressed = true;
        }
    }
    _keyup(e) {
        if (e.key === " " || e.key === "Enter") {
            this.pressed = false;
        }
    }
    render() {
        return lit_element_1.html `
			<button
				?disabled=${this.disabled}
				?pressed=${this.pressed}
				@keydown=${this._keydown.bind(this)}
				@keyup=${this._keyup.bind(this)}
				@mousedown=${this._mousedown.bind(this)}
				@touchstart=${this._mousedown.bind(this)}
				@mouseup=${() => (this.pressed = false)}
				@touchend=${() => (this.pressed = false)}
				aria-label="Trigger"
				.aria-checked=${this.pressed}
			>
				<slot></slot>
			</button>
		`;
    }
}
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneButton.prototype, "pressed", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneButton.prototype, "disabled", void 0);
exports.ToneButton = ToneButton;
customElements.define("tone-button", ToneButton);

