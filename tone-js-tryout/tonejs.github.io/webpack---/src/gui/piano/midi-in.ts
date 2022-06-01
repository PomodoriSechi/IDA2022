
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneMidiIn = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
// import * as WebMidi from "webmidi";
const WebMidi = __webpack_require__(/*! webmidi */ "./node_modules/webmidi/webmidi.min.js");
let ToneMidiIn = class ToneMidiIn extends lit_element_1.LitElement {
    constructor() {
        super();
        this._flashTimeout = -1;
        WebMidi.enable((e) => {
            if (!e) {
                WebMidi.addListener("connected", (e) => {
                    if (e.port.type === "input") {
                        this.requestUpdate();
                    }
                });
                WebMidi.addListener("disconnected", (e) => {
                    this.requestUpdate();
                });
            }
        });
    }
    _flash() {
        clearTimeout(this._flashTimeout);
        const light = this.shadowRoot.querySelector("#light");
        light.classList.add("flash");
        this._flashTimeout = setTimeout(() => light.classList.remove("flash"), 100);
    }
    _connectMidi(event) {
        if (event.target.value === "none") {
            this.shadowRoot
                .querySelector("#light")
                .classList.remove("connected");
            return;
        }
        else {
            this.shadowRoot.querySelector("#light").classList.add("connected");
        }
        const input = WebMidi.getInputById(event.target.value);
        if (input) {
            input.addListener("noteon", "all", (e) => {
                const name = `${e.note.name}${e.note.octave}`;
                const midi = e.note.number;
                this._flash();
                this.dispatchEvent(new CustomEvent("noteon", {
                    detail: {
                        name,
                        midi,
                        velocity: e.velocity,
                    },
                    composed: true,
                    bubbles: true,
                }));
            });
            input.addListener("noteoff", "all", (e) => {
                const name = `${e.note.name}${e.note.octave}`;
                const midi = e.note.number;
                this._flash();
                this.dispatchEvent(new CustomEvent("noteoff", {
                    detail: {
                        name,
                        midi,
                        velocity: e.velocity,
                    },
                    composed: true,
                    bubbles: true,
                }));
            });
            input.addListener("controlchange", "all", (e) => {
                this._flash();
            });
        }
    }
    static get styles() {
        return lit_element_1.css `
			:host {
				display: block;
			}

			#container {
				display: block;
				margin-bottom: 10px;
				position: relative;
			}
			label {
				font-family: var(--label-font-family);
				font-size: var(--label-font-size);
				margin-right: 5px;
				font-size: 0.7em;
			}

			select,
			label {
				display: inline-block;
			}

			#light {
				width: 10px;
				height: 10px;
				background-color: white;
				display: inline-block;
			}
			#light.connected {
				background-color: var(--color-gray);
			}

			#light.connected.flash {
				background-color: black !important;
			}
		`;
    }
    render() {
        if (WebMidi.supported) {
            return lit_element_1.html `
				<div id="container">
					<div id="light"></div>
					<label>MIDI IN:</label>
					<select @change=${this._connectMidi.bind(this)}>
						<option value="none">none</option>
						${WebMidi.inputs.map((input) => lit_element_1.html `
								<option value=${input.id}>${input.name}</option>
							`)}
					</select>
				</div>
			`;
        }
        else {
            return lit_element_1.html ``;
        }
    }
};
ToneMidiIn = __decorate([
    lit_element_1.customElement("tone-midi-in")
], ToneMidiIn);
exports.ToneMidiIn = ToneMidiIn;

