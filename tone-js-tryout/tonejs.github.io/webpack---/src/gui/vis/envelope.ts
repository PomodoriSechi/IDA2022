
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
exports.ToneEnvelopeVis = void 0;
const vis_base_1 = __webpack_require__(/*! ./vis-base */ "./src/gui/vis/vis-base.ts");
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const style_map_1 = __webpack_require__(/*! lit-html/directives/style-map */ "./node_modules/lit-html/directives/style-map.js");
let ToneEnvelopeVis = class ToneEnvelopeVis extends vis_base_1.VisBase {
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tone) {
                return;
            }
            const values = yield this.tone.asArray(this.width);
            this.draw(values);
            this.requestUpdate();
        });
    }
    bind(tone) {
        this.tone = tone;
        this.generate();
    }
    render() {
        const times = [];
        if (this.tone) {
            const tickCount = 4;
            // add the timing to the bottom
            const totalDuration = 1.1 *
                (this.tone.toSeconds(this.tone.attack) +
                    this.tone.toSeconds(this.tone.decay) +
                    this.tone.toSeconds(this.tone.release));
            // scoot the canvas up 10px
            // context.drawImage(canvas, 0, 0, this.width, this.height - 10);
            const subdivision = Math.pow(2, Math.ceil(Math.log2(totalDuration / tickCount)));
            const rounding = (subdivision.toString().split(".")[1] &&
                subdivision.toString().split(".")[1].length) ||
                0;
            for (let time = 0; time < totalDuration * 0.9; time += subdivision) {
                const x = time / totalDuration;
                times.push({
                    x,
                    time: time.toFixed(rounding),
                });
            }
        }
        return lit_element_1.html `
			<style>
				#timeline {
					margin-top: -10px;
					font-size: 10px;
					font-family: monospace;
					position: relative;
					height: 20px;
				}
				#timeline span {
					position: absolute;
				}
			</style>
			${super.render()}
			<div id="timeline">
				${times.map(({ x, time }) => lit_element_1.html `
						<span
							style=${style_map_1.styleMap({
            left: `${(x * 100).toFixed(2)}%`,
        })}
						>
							${time}s
						</span>
					`)}
			</div>
		`;
    }
};
ToneEnvelopeVis = __decorate([
    lit_element_1.customElement("tone-envelope-vis")
], ToneEnvelopeVis);
exports.ToneEnvelopeVis = ToneEnvelopeVis;

