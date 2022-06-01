
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneKeyboard = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const AudioKeys = __webpack_require__(/*! audiokeys */ "./node_modules/audiokeys/src/AudioKeys.js");
__webpack_require__(/*! ./octave */ "./src/gui/piano/octave.ts");
__webpack_require__(/*! ./note */ "./src/gui/piano/note.ts");
let ToneKeyboard = class ToneKeyboard extends lit_element_1.LitElement {
    constructor() {
        super();
        this.rootoctave = 4;
        this.octaves = 4;
        this.polyphonic = false;
        this._computerKeyboard = new AudioKeys({ polyphony: Infinity });
        this._computerKeyboard.down((e) => {
            this.noteon(e.note);
        });
        this._computerKeyboard.up((e) => {
            this.noteoff(e.note);
        });
    }
    getNoteByTouchId(id) {
        const octaves = Array.from(this.shadowRoot.querySelectorAll("tone-keyboard-octave"));
        const octave = octaves.find((o) => o.getNoteByTouchId(id));
        if (octave) {
            return octave.getNoteByTouchId(id);
        }
    }
    _touchmove(event) {
        Array.from(event.changedTouches).forEach((e) => {
            this.getNoteByTouchId(e.identifier);
            const activeNote = this.getNoteByTouchId(e.identifier);
            const element = this.shadowRoot.elementFromPoint(e.clientX, e.clientY);
            if (element && element.shadowRoot) {
                const note = element.shadowRoot.elementFromPoint(e.clientX, e.clientY);
                if (note && note.note && activeNote.note !== note.note) {
                    activeNote.active = false;
                    activeNote.touchid = -1;
                    note.active = true;
                    note.touchid = e.identifier;
                }
            }
        });
    }
    _touchend(event) {
        Array.from(event.changedTouches).forEach((e) => {
            this.getNoteByTouchId(e.identifier);
            const activeNote = this.getNoteByTouchId(e.identifier);
            if (activeNote && activeNote.active) {
                activeNote.active = false;
                activeNote.touchid = -1;
            }
        });
    }
    noteon(midi) {
        const octaveNumber = Math.floor(midi / 12);
        const toneOctave = this.shadowRoot.querySelector(`tone-keyboard-octave[octave="${octaveNumber}"]`);
        if (toneOctave) {
            toneOctave.noteon(midi);
        }
    }
    noteoff(midi) {
        const octaveNumber = Math.floor(midi / 12);
        const toneOctave = this.shadowRoot.querySelector(`tone-keyboard-octave[octave="${octaveNumber}"]`);
        if (toneOctave) {
            toneOctave.noteoff(midi);
        }
    }
    render() {
        const octaves = [];
        for (let i = this.rootoctave; i < this.rootoctave + this.octaves; i++) {
            octaves.push(i);
        }
        return lit_element_1.html `
			<style>
				#container {
					display: flex;
					background-color: white;
					height: 80px;
				}

				tone-keyboard-octave {
					flex-grow: 1;
				}
			</style>
			<div
				id="container"
				@touchmove=${this._touchmove.bind(this)}
				@touchend=${this._touchend.bind(this)}
			>
				${octaves.map((o) => lit_element_1.html `
						<tone-keyboard-octave
							octave=${o.toString()}
						></tone-keyboard-octave>
					`)}
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Number })
], ToneKeyboard.prototype, "rootoctave", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneKeyboard.prototype, "octaves", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneKeyboard.prototype, "polyphonic", void 0);
ToneKeyboard = __decorate([
    lit_element_1.customElement("tone-keyboard")
], ToneKeyboard);
exports.ToneKeyboard = ToneKeyboard;

