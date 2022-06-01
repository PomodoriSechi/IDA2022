
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneMomentaryButton = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const style = __webpack_require__(/*! ./momentary-button.scss */ "./src/components/input/momentary-button.scss");
__webpack_require__(/*! ./button */ "./src/components/input/button.ts");
let ToneMomentaryButton = class ToneMomentaryButton extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.triggered = false;
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    render() {
        return lit_element_1.html `
			<tone-button
				?triggered=${this.triggered}
				@down=${() => (this.triggered = true)}
				@up=${() => (this.triggered = false)}
			>
				<div id="ring">
					<div id="circle"></div>
				</div>
			</tone-button>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneMomentaryButton.prototype, "triggered", void 0);
ToneMomentaryButton = __decorate([
    lit_element_1.customElement("tone-momentary-button")
], ToneMomentaryButton);
exports.ToneMomentaryButton = ToneMomentaryButton;

