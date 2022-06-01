
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneCompressorVis = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const vis_base_1 = __webpack_require__(/*! ./vis-base */ "./src/gui/vis/vis-base.ts");
let ToneCompressorVis = class ToneCompressorVis extends vis_base_1.VisBase {
    constructor() {
        super(...arguments);
        this.normalizeCurve = false;
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tone) {
                return;
            }
            const length = this.width;
            const kneeWidth = this.scale(this.tone.knee.value, 0, 100, 0, length);
            const threshIndex = this.scale(this.tone.threshold.value, -100, 40, 0, length);
            const retArray = new Float32Array(length);
            const ratio = this.tone.ratio.value;
            const kneeBegin = threshIndex - kneeWidth / 2;
            const kneeEnd = threshIndex + kneeWidth / 2;
            const kneeBeginNorm = this.scale(kneeBegin, 0, length, 0, 1);
            const threshNorm = this.scale(threshIndex, 0, length, 0, 1);
            const values = retArray.map((_, i) => {
                const linearVal = this.scale(i, 0, length, 0, 1);
                // apply the ratio
                if (i < kneeBegin) {
                    // linear
                    return linearVal;
                }
                else if (kneeBegin <= i && i <= kneeEnd) {
                    // in the knee
                    const over = this.scale(kneeEnd - threshIndex, 0, length, 0, 1);
                    const compressedValue = threshNorm + over * (1 / ratio);
                    return this.scale(i, kneeBegin, kneeEnd, kneeBeginNorm, compressedValue);
                }
                else {
                    // compressing
                    const over = this.scale(i - threshIndex, 0, length, 0, 1);
                    const compressedValue = threshNorm + over * (1 / ratio);
                    return compressedValue;
                }
            });
            this.draw(values);
        });
    }
    draw(values) {
        // draw the values
        super.draw(values);
        const canvas = this.shadowRoot.querySelector("canvas");
        const context = canvas.getContext("2d");
        context.setLineDash([2, 2]);
        context.lineWidth = 1;
        context.strokeStyle = "rgba(0, 0, 0, 0.25)";
        // draw the thresh and knee lines
        const threshX = this.scale(this.tone.threshold.value, -100, 40, 0, canvas.width);
        const threshY = this.scale(this.tone.threshold.value, -100, 40, canvas.height, 0);
        context.moveTo(threshX, 0);
        context.lineTo(threshX, canvas.height);
        context.stroke();
        context.moveTo(0, threshY);
        context.lineTo(canvas.width, threshY);
        context.stroke();
        context.setLineDash([]);
    }
    bind(tone) {
        this.tone = tone;
        this.generate();
        this.loop();
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        // check the reduction
        const reduction = this.scale(this.tone.reduction, 0, -100, 0, 100);
        this.shadowRoot.querySelector("#reduction #fill").style.height = `${reduction.toFixed(1)}%`;
    }
    render() {
        return lit_element_1.html `
			<style>
				#container {
					margin-top: 5px;
					position: relative;
				}

				canvas {
					width: calc(100% - 50px);
					height: ${this.height}px;
				}

				#reduction {
					position: absolute;
					width: 20px;
					height: ${this.height}px;
					right: 0px;
					top: 0px;
				}

				#reduction #fill {
					background-color: black;
					width: 100%;
					height: 0%;
					top: 0px;
					left: 0px;
				}
			</style>
			<div id="container">
				<canvas></canvas>
				<div id="reduction">
					<div id="fill"></div>
				</div>
			</div>
		`;
    }
};
ToneCompressorVis = __decorate([
    lit_element_1.customElement("tone-compressor-vis")
], ToneCompressorVis);
exports.ToneCompressorVis = ToneCompressorVis;

