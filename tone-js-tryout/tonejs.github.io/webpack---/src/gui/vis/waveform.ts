
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWaveform = void 0;
const vis_base_1 = __webpack_require__(/*! ./vis-base */ "./src/gui/vis/vis-base.ts");
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
let ToneWaveformElement = class ToneWaveformElement extends vis_base_1.VisBase {
    constructor() {
        super(...arguments);
        this.height = 40;
    }
    generate() {
        // ignored
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        if (!this.tone) {
            return;
        }
        const values = this.tone.getValue();
        this.draw(values);
    }
    bind(tone) {
        this.tone = tone;
        this.loop();
    }
};
ToneWaveformElement = __decorate([
    lit_element_1.customElement("tone-waveform-vis")
], ToneWaveformElement);
/**
 * Create an audio node element
 */
function createWaveform({ tone, parent, height, }) {
    const element = document.createElement("tone-waveform-vis");
    element.bind(tone);
    if (parent) {
        parent.appendChild(element);
    }
    if (height) {
        element.setAttribute("height", height.toString());
    }
    return element;
}
exports.createWaveform = createWaveform;

