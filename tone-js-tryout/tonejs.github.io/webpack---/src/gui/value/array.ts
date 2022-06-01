
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneArrayValue = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const value_1 = __webpack_require__(/*! ./value */ "./src/gui/value/value.ts");
const style_map_1 = __webpack_require__(/*! lit-html/directives/style-map */ "./node_modules/lit-html/directives/style-map.js");
let ToneArrayValue = class ToneArrayValue extends value_1.ToneValue {
    constructor() {
        super(...arguments);
        this.value = [];
    }
    reset() {
        // do nothing
    }
    scale(v, inMin, inMax, outMin, outMax) {
        const normV = Math.pow((v - inMin) / (inMax - inMin), 0.25);
        return normV * (outMax - outMin) + outMin;
    }
    _mousemove(index, e) {
        if (e.buttons) {
            let normValue = e.offsetY / e.target.clientHeight;
            normValue = Math.min(Math.max(normValue, 0), 1);
            this.value[index] = Math.pow(1 - normValue, 1 / 0.25);
            this.dispatchValue(this.value);
            this.requestUpdate();
        }
    }
    render() {
        const values = this.value.map(Math.abs);
        const min = Math.min(...values, 0);
        const max = Math.max(...values, 1);
        return lit_element_1.html `
			<div id="container" class="array">
				<label ?disabled=${values.length === 0}>${this.name}</label>
				<span id="bars">
					${values.map((v, i) => lit_element_1.html `
							<span
								class="bar"
								@mousedown=${(e) => this._mousemove(i, e)}
								@mousemove=${(e) => this._mousemove(i, e)}
							>
								<span
									style=${style_map_1.styleMap({
            height: `${this.scale(v, min, max, 0, 100)}%`,
        })}
									class="fill"
								></span>
							</span>
						`)}
				</span>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: String })
], ToneArrayValue.prototype, "name", void 0);
__decorate([
    lit_element_1.property({ type: Array })
], ToneArrayValue.prototype, "value", void 0);
ToneArrayValue = __decorate([
    lit_element_1.customElement("tone-array")
], ToneArrayValue);
exports.ToneArrayValue = ToneArrayValue;

