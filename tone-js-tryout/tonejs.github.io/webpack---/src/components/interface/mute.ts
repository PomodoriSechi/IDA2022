
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
exports.ToneMuteButton = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const start_1 = __webpack_require__(/*! ../util/start */ "./src/components/util/start.ts");
const tone_1 = __webpack_require__(/*! tone */ "tone");
const class_map_1 = __webpack_require__(/*! lit-html/directives/class-map */ "./node_modules/lit-html/directives/class-map.js");
// import { html } from "lit-html";
// import "@material/mwc-icon";
let ToneMuteButton = class ToneMuteButton extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.muted = false;
        this.suspended = true;
    }
    static get styles() {
        return lit_element_1.css `
			:host {
				position: absolute;
				top: 5px;
				right: 5px;
			}

			button {
				--webkit-appearance: none;
				appearance: none;
				border: none;
				background-color: transparent;
			}
			mwc-icon {
				cursor: pointer;
				color: black;
				z-index: 100000;
			}
			mwc-icon.muted {
				color: #ff4800;
			}
		`;
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        setInterval(() => {
            this.suspended = tone_1.context.state === "suspended";
        }, 100);
    }
    updated(changed) {
        if (changed.has("muted")) {
            tone_1.getDestination().mute = this.muted;
        }
    }
    _clicked() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.suspended) {
                yield start_1.startContext();
            }
            else {
                this.muted = !this.muted;
            }
        });
    }
    render() {
        return lit_element_1.html `
			<button aria-label="mute" @click=${this._clicked}>
				<mwc-icon
					class=${class_map_1.classMap({
            muted: this.muted || this.suspended,
        })}
				>
					${this.muted || this.suspended ? "volume_off" : "volume_up"}
				</mwc-icon>
			</button>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneMuteButton.prototype, "muted", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneMuteButton.prototype, "suspended", void 0);
ToneMuteButton = __decorate([
    lit_element_1.customElement("tone-mute")
], ToneMuteButton);
exports.ToneMuteButton = ToneMuteButton;

