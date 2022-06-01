
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneKeyboardNote = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const tone_1 = __webpack_require__(/*! tone */ "tone");
let ToneKeyboardNote = class ToneKeyboardNote extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.color = "#eee";
        this.activecolor = "white";
        this.active = false;
        this.touchid = -1;
    }
    _fromMidi(midi) {
        return tone_1.Midi(midi).toNote();
    }
    updated(changed) {
        if (changed.has("active") && changed.get("active") !== undefined) {
            const eventName = this.active ? "noteon" : "noteoff";
            if (!this.active) {
                this.touchid = -1;
            }
            this.dispatchEvent(new CustomEvent(eventName, {
                detail: {
                    name: this._fromMidi(this.note),
                    midi: this.note,
                    velocity: this.active ? 1 : 0,
                },
                composed: true,
                bubbles: true,
            }));
        }
    }
    _mouseover(e) {
        if (e.buttons) {
            this.active = true;
            this.shadowRoot.querySelector("button").focus();
        }
    }
    _keydown(e) {
        if (!e.repeat && (e.key === " " || e.key === "Enter")) {
            this.active = true;
        }
    }
    _keyup(e) {
        if (e.key === " " || e.key === "Enter") {
            this.active = false;
        }
    }
    _touchstart(e) {
        e.preventDefault();
        this.touchid = e.touches[0].identifier;
        this.active = true;
    }
    static get styles() {
        return lit_element_1.css `
			:host {
				display: block;
			}

			#container {
				width: 100%;
				height: 100%;
				display: block;
			}
			#container:not([show]) {
				opacity: 0;
				margin: 2px;
				pointer-events: none;
			}

			button {
				border: none;
				-webkit-appearance: none;
				--key-margin: 2px;
				width: 100%;
				height: 100%;
				border: 2px solid white;
				box-sizing: border-box;
				padding: 0;
				outline: none;
				transition: background-color 0.2s;
				color: transparent;
				font-size: 0px;
				border-radius: 2px;
			}
			button[active] {
				background-color: #666 !important;
				transition-duration: 0s;
			}
			button:focus {
				border-color: #666;
			}
		`;
    }
    render() {
        const show = this.note !== 0;
        return lit_element_1.html `
			<div id="container" ?show=${show}>
				${show
            ? lit_element_1.html ` <button
							?active=${this.active}
							@mouseover=${this._mouseover.bind(this)}
							@mouseleave=${() => (this.active = false)}
							@mousedown=${() => (this.active = true)}
							@touchstart=${this._touchstart.bind(this)}
							@touchend=${() => (this.active = false)}
							@mouseup=${() => (this.active = false)}
							@keydown=${this._keydown.bind(this)}
							@keyup=${this._keyup.bind(this)}
							style="background-color: ${this.active
                ? this.activecolor
                : this.color};"
					  >
							${this._fromMidi(this.note).replace("#", "♯")}
					  </button>`
            : lit_element_1.html ``}
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Number })
], ToneKeyboardNote.prototype, "note", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneKeyboardNote.prototype, "color", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneKeyboardNote.prototype, "activecolor", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneKeyboardNote.prototype, "active", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneKeyboardNote.prototype, "velocity", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneKeyboardNote.prototype, "touchid", void 0);
ToneKeyboardNote = __decorate([
    lit_element_1.customElement("tone-keyboard-note")
], ToneKeyboardNote);
exports.ToneKeyboardNote = ToneKeyboardNote;

