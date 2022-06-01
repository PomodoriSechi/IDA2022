
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneSlider = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const style = __webpack_require__(/*! ./slider.scss */ "./src/components/input/slider.scss");
__webpack_require__(/*! @material/mwc-slider */ "./node_modules/@material/mwc-slider/mwc-slider.js");
class ToneSlider extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 50;
        this.step = 1;
        this.label = "";
        this.units = "";
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    onInput(e) {
        this.value = parseFloat(e.target.value);
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("input", {
            composed: true,
            detail: this.value,
        }));
    }
    beautifyValue(value) {
        if (Number.isInteger(value)) {
            return value.toString();
        }
        else {
            return value.toFixed(2);
        }
    }
    render() {
        return lit_element_1.html `
			<div id="container">
				<div id="label">
					<label for="slider">${this.label}</label>
					<span class="value"
						>${this.beautifyValue(this.value)}
						<span class="units">${this.units}</span></span
					>
				</div>
				<mwc-slider
					name="slider"
					.min=${this.min}
					.max=${this.max}
					.value=${this.value}
					.step="0"
					@input=${(e) => (this.value = parseFloat(e.target.value))}
				></mwc-slider>
			</div>
		`;
    }
}
__decorate([
    lit_element_1.property({ type: Number })
], ToneSlider.prototype, "min", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneSlider.prototype, "max", void 0);
__decorate([
    lit_element_1.property({ type: Number, reflect: true })
], ToneSlider.prototype, "value", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneSlider.prototype, "step", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneSlider.prototype, "label", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneSlider.prototype, "units", void 0);
exports.ToneSlider = ToneSlider;
customElements.define("tone-slider", ToneSlider);

