
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPiano = exports.TonePiano = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
__webpack_require__(/*! ./keyboard */ "./src/gui/piano/keyboard.ts");
__webpack_require__(/*! ./midi-in */ "./src/gui/piano/midi-in.ts");
let TonePiano = class TonePiano extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.polyphonic = false;
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        const keyboard = this.shadowRoot.querySelector("tone-keyboard");
        // this.shadowRoot.querySelector("tone-midi-in").addEventListener("noteon", e => {
        // 	e.stopPropagation();
        // 	keyboard.noteon(e.detail.midi);
        // });
        // this.shadowRoot.querySelector("tone-midi-in").addEventListener("noteoff", e => {
        // 	e.stopPropagation();
        // 	keyboard.noteoff(e.detail.midi);
        // });
        window.addEventListener("resize", this._resize.bind(this));
        setTimeout(() => this._resize(), 100);
    }
    _clamp(v, floor, ceil) {
        return Math.max(Math.min(v, ceil), floor);
    }
    _scale(v, inMin, inMax, outMin, outMax) {
        return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    }
    _resize() {
        const width = this.shadowRoot.querySelector("#container").clientWidth;
        const octaves = this._clamp(Math.floor(width / 100) - 1, 1, 8);
        const rootNote = Math.ceil(this._scale(octaves, 1, 8, 5, 1));
        this.shadowRoot.querySelector("tone-keyboard").rootoctave = rootNote;
        this.shadowRoot.querySelector("tone-keyboard").octaves = octaves;
    }
    render() {
        return lit_element_1.html `
			<style>
				:host {
					display: block;
				}

				#container {
					background-color: var(--color-light-gray);
					position: relative;
					padding: 5px;
					display: block;
				}

				tone-keyboard {
					display: block;
					clear: both;
				}

				tone-midi-in {
					position: relative;
					top: 5px;
					right: 5px;
					display: inline-block;
					float: right;
				}
			</style>
			<div id="container">
				<tone-midi-in> </tone-midi-in>
				<tone-keyboard ?polyphonic=${this.polyphonic}></tone-keyboard>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], TonePiano.prototype, "polyphonic", void 0);
TonePiano = __decorate([
    lit_element_1.customElement("tone-piano")
], TonePiano);
exports.TonePiano = TonePiano;
/**
 * Create an audio node element
 */
function createPiano({ parent, polyphonic = true, noteon = () => { }, noteoff = () => { }, }) {
    const element = document.createElement("tone-piano");
    element.polyphonic = polyphonic;
    element.addEventListener("noteon", (e) => noteon(e.detail));
    element.addEventListener("noteoff", (e) => noteoff(e.detail));
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
exports.createPiano = createPiano;

