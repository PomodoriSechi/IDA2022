
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisBase = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
class VisBase extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.bgcolor = "white";
        this.color = "black";
        this.values = {};
        this.height = 100;
        this.width = 310;
        this.normalizeCurve = true;
    }
    scale(v, inMin, inMax, outMin, outMax) {
        return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    }
    draw(values) {
        const canvas = this.shadowRoot.querySelector("canvas");
        if (canvas) {
            const context = canvas.getContext("2d");
            canvas.height = this.height;
            canvas.width = this.width;
            const width = canvas.width;
            const height = canvas.height;
            context.clearRect(0, 0, width, height);
            const maxValuesLength = 2048;
            if (values.length > maxValuesLength) {
                const resampled = new Float32Array(maxValuesLength);
                // down sample to maxValuesLength values
                for (let i = 0; i < maxValuesLength; i++) {
                    resampled[i] =
                        values[Math.floor((i / maxValuesLength) * values.length)];
                }
                values = resampled;
            }
            const max = this.normalizeCurve
                ? Math.max(0.001, ...values) * 1.1
                : 1;
            const min = this.normalizeCurve
                ? Math.min(-0.001, ...values) * 1.1
                : 0;
            const lineWidth = 3;
            context.lineWidth = lineWidth;
            context.beginPath();
            for (let i = 0; i < values.length; i++) {
                const v = values[i];
                const x = this.scale(i, 0, values.length, lineWidth, width - lineWidth);
                const y = this.scale(v, max, min, 0, height - lineWidth);
                if (i === 0) {
                    context.moveTo(x, y);
                }
                else {
                    context.lineTo(x, y);
                }
            }
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.stroke();
        }
    }
    updated() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.generate();
        }, 50);
    }
    render() {
        return lit_element_1.html `
			<style>
				#container {
					margin-top: 5px;
				}

				canvas {
					background-color: #aaa;
					width: 100%;
					border-radius: 4px;
					height: ${this.height}px;
				}
			</style>
			<div id="container">
				<canvas></canvas>
			</div>
		`;
    }
}
__decorate([
    lit_element_1.property({ type: String })
], VisBase.prototype, "bgcolor", void 0);
__decorate([
    lit_element_1.property({ type: String })
], VisBase.prototype, "color", void 0);
__decorate([
    lit_element_1.property({ type: Object })
], VisBase.prototype, "values", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], VisBase.prototype, "height", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], VisBase.prototype, "width", void 0);
exports.VisBase = VisBase;

