
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
exports.ToneVisualizer = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const deepEquals = __webpack_require__(/*! deep-equal */ "./node_modules/deep-equal/index.js");
__webpack_require__(/*! ./oscillator */ "./src/gui/vis/oscillator.ts");
__webpack_require__(/*! ./envelope */ "./src/gui/vis/envelope.ts");
__webpack_require__(/*! ./filter */ "./src/gui/vis/filter.ts");
__webpack_require__(/*! ./compressor */ "./src/gui/vis/compressor.ts");
__webpack_require__(/*! ./meter */ "./src/gui/vis/meter.ts");
__webpack_require__(/*! ./waveform */ "./src/gui/vis/waveform.ts");
__webpack_require__(/*! ./buffer */ "./src/gui/vis/buffer.ts");
let ToneVisualizer = class ToneVisualizer extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        /**
         * Make sure that it is rendered for the first time
         * before applying shouldUpdate optimization
         */
        this.firstRendered = false;
    }
    bind(tone) {
        return __awaiter(this, void 0, void 0, function* () {
            // find the sub object
            this.tone = tone;
            this.path.forEach((path) => {
                this.tone = tone[path];
            });
            if (this.tone) {
                yield this.requestUpdate();
                this.shadowRoot
                    .querySelectorAll(".vis")
                    .forEach((vis) => {
                    vis.bind(this.tone);
                });
                this.firstRendered = true;
            }
        });
    }
    shouldUpdate() {
        if (this.tone && this.firstRendered) {
            return deepEquals(this.values, this.tone.get());
        }
        else {
            return true;
        }
    }
    chooseVis() {
        if (this.tone.toString().includes("Envelope")) {
            return lit_element_1.html `
				<tone-envelope-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-envelope-vis>
			`;
        }
        else if (this.tone.toString().includes("Oscillator")) {
            return lit_element_1.html `
				<tone-oscillator-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-oscillator-vis>
			`;
        }
        else if (this.tone.toString() === "Compressor") {
            return lit_element_1.html `
				<tone-compressor-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-compressor-vis>
			`;
        }
        else if (this.tone.toString() === "Filter" ||
            this.tone.toString() === "OnePoleFilter") {
            return lit_element_1.html `
				<tone-filter-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-filter-vis>
			`;
        }
        else if (this.tone.toString() === "Meter") {
            return lit_element_1.html `
				<tone-meter-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-meter-vis>
			`;
        }
        else if (this.tone.toString() === "Waveform") {
            return lit_element_1.html `
				<tone-waveform-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-waveform-vis>
			`;
        }
        else if (this.tone.toString() === "FFT") {
            return lit_element_1.html `
				<tone-fft-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-fft-vis>
			`;
        }
        else if (Reflect.has(this.tone, "buffer")) {
            return lit_element_1.html `
				<tone-buffer-vis
					class="vis"
					values=${JSON.stringify(this.values)}
				></tone-buffer-vis>
			`;
        }
    }
    render() {
        if (this.tone) {
            return lit_element_1.html `
				<div id="container">
					${this.chooseVis()}
				</div>
			`;
        }
    }
};
__decorate([
    lit_element_1.property({ type: Array })
], ToneVisualizer.prototype, "path", void 0);
__decorate([
    lit_element_1.property({ type: Object })
], ToneVisualizer.prototype, "values", void 0);
ToneVisualizer = __decorate([
    lit_element_1.customElement("tone-visualizer")
], ToneVisualizer);
exports.ToneVisualizer = ToneVisualizer;

