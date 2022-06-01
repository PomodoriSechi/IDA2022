
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneKeyboardOctave = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
let ToneKeyboardOctave = class ToneKeyboardOctave extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.octave = 1;
    }
    noteon(number) {
        const note = this.shadowRoot.querySelector(`tone-keyboard-note[note="${number}"]`);
        note.active = true;
    }
    noteoff(number) {
        const note = this.shadowRoot.querySelector(`tone-keyboard-note[note="${number}"]`);
        note.active = false;
    }
    getNoteByTouchId(id) {
        const notes = Array.from(this.shadowRoot.querySelectorAll("tone-keyboard-note"));
        const element = notes.find((e) => e.touchid === id);
        if (element && element.note) {
            return element;
        }
    }
    static get styles() {
        return lit_element_1.css `
			#container {
				display: block;
				position: relative;
				height: 100%;
				width: 100%;
			}
			tone-keyboard-note {
				order: 0;
				flex-grow: 1;
			}

			#white-notes {
				position: absolute;
				left: 0px;
				top: 0px;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: row;
			}

			#black-notes {
				position: absolute;
				top: 0px;
				width: 100%;
				display: flex;
				flex-direction: row;
				height: 55%;
			}

			#black-notes tone-keyboard-note:first-child,
			#black-notes tone-keyboard-note:last-child {
				flex-grow: 0.5;
				pointer-events: none;
			}
		`;
    }
    render() {
        const startNote = 12 * this.octave;
        const whiteNotes = [0, 2, 4, 5, 7, 9, 11].map((i) => i + startNote);
        const blackNotes = [0, 1, 3, 0, 6, 8, 10, 0].map((i) => {
            if (i) {
                return i + startNote;
            }
            else {
                return 0;
            }
        });
        return lit_element_1.html `
			<div id="container">
				<div id="white-notes">
					${whiteNotes.map((note) => lit_element_1.html `
							<tone-keyboard-note
								color="#aaa"
								note="${note.toString()}"
							></tone-keyboard-note>
						`)}
				</div>
				<div id="black-notes">
					${blackNotes.map((note) => lit_element_1.html `
							<tone-keyboard-note
								color="black"
								note="${note.toString()}"
							></tone-keyboard-note>
						`)}
				</div>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Number })
], ToneKeyboardOctave.prototype, "octave", void 0);
ToneKeyboardOctave = __decorate([
    lit_element_1.customElement("tone-keyboard-octave")
], ToneKeyboardOctave);
exports.ToneKeyboardOctave = ToneKeyboardOctave;

