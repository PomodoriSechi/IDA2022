
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneStringValue = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const value_1 = __webpack_require__(/*! ./value */ "./src/gui/value/value.ts");
let ToneStringValue = class ToneStringValue extends value_1.ToneValue {
    constructor() {
        super(...arguments);
        this.value = "";
    }
    _oninput(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.value = this.inputEl.value;
        this.dispatchValue(this.value);
    }
    reset() {
        this.inputEl.value = this.value;
    }
    render() {
        return lit_element_1.html `
			<div id="container">
				<label for="string">${this.name}</label>
				<input
					@input=${(e) => e.stopPropagation()}
					@change=${this._oninput.bind(this)}
					name="string"
					type="text"
					.value=${this.value}
				/>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: String })
], ToneStringValue.prototype, "name", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneStringValue.prototype, "value", void 0);
__decorate([
    lit_element_1.query("input")
], ToneStringValue.prototype, "inputEl", void 0);
ToneStringValue = __decorate([
    lit_element_1.customElement("tone-string")
], ToneStringValue);
exports.ToneStringValue = ToneStringValue;

