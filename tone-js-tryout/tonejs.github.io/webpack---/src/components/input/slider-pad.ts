
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneSliderPad = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const style = __webpack_require__(/*! ./slider-pad.scss */ "./src/components/input/slider-pad.scss");
let ToneSliderPad = class ToneSliderPad extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.xPosition = 0.5;
        this.yPosition = 0.5;
        this.pressed = false;
    }
    static get styles() {
        return lit_element_1.css `${lit_element_1.unsafeCSS(style)}`;
    }
    _updatePosition(e) {
        this.xPosition = this._clamp(e.offsetX / this._container.offsetWidth);
        this.yPosition = this._clamp(e.offsetY / this._container.offsetHeight);
        this.dispatchEvent(new CustomEvent("move", {
            composed: true,
            detail: {
                x: this.xPosition,
                y: this.yPosition,
            }
        }));
    }
    updated(changed) {
        if (changed.has("pressed")) {
            this.dispatchEvent(new CustomEvent(this.pressed ? "down" : "up", {
                composed: true,
                detail: {
                    x: this.xPosition,
                    y: this.yPosition,
                }
            }));
        }
    }
    _mousemove(e) {
        if (e.buttons) {
            this._updatePosition(e);
        }
    }
    _mousedown(e) {
        this._updatePosition(e);
        this.pressed = true;
    }
    _mouseup(e) {
        this._updatePosition(e);
        this.pressed = false;
    }
    _clamp(value) {
        return Math.min(Math.max(value, 0), 1);
    }
    puckStyle() {
        const leftPercent = `${(this.xPosition * 100).toFixed(2)}%`;
        const topPercent = `${(this.yPosition * 100).toFixed(2)}%`;
        return `left: ${leftPercent}; top: ${topPercent};`;
    }
    render() {
        return lit_element_1.html `
			<div id="container">
				<div class="square" 
					@mousemove=${this._mousemove.bind(this)}
					@mousedown=${this._mousedown.bind(this)}
					@mouseup=${this._mouseup.bind(this)}
					@mouseleave=${() => this.pressed = false}
				>
					<div id="puck" 
						style="${this.puckStyle()}">
					</div>
				</div>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Number })
], ToneSliderPad.prototype, "xPosition", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneSliderPad.prototype, "yPosition", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneSliderPad.prototype, "pressed", void 0);
__decorate([
    lit_element_1.query(".square")
], ToneSliderPad.prototype, "_container", void 0);
__decorate([
    lit_element_1.query("#puck")
], ToneSliderPad.prototype, "_puck", void 0);
ToneSliderPad = __decorate([
    lit_element_1.customElement("tone-slider-pad")
], ToneSliderPad);
exports.ToneSliderPad = ToneSliderPad;

