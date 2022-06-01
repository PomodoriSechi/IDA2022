
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneFFTVis = void 0;
const vis_base_1 = __webpack_require__(/*! ./vis-base */ "./src/gui/vis/vis-base.ts");
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
let ToneFFTVis = class ToneFFTVis extends vis_base_1.VisBase {
    generate() {
        if (!this.tone) {
            return;
        }
        const values = this.tone.getFrequencyResponse(this.width);
        this.draw(values);
    }
    bind(tone) {
        this.tone = tone;
        this.generate();
    }
};
ToneFFTVis = __decorate([
    lit_element_1.customElement("tone-filter-vis")
], ToneFFTVis);
exports.ToneFFTVis = ToneFFTVis;

