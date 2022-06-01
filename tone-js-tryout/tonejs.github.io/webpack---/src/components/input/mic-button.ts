
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
exports.ToneMicButton = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
__webpack_require__(/*! ./button */ "./src/components/input/button.ts");
const style = __webpack_require__(/*! ./mic-button.scss */ "./src/components/input/mic-button.scss");
// import "@material/mwc-icon";
let ToneMicButton = class ToneMicButton extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.supported = false;
    }
    updated(changed) {
        if (changed.has("open")) {
            this.dispatchEvent(new CustomEvent(this.open ? "open" : "close"));
        }
    }
    _clicked() {
        return __awaiter(this, void 0, void 0, function* () {
            this.open = !this.open;
        });
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    render() {
        return lit_element_1.html `
			<tone-button
				?disabled=${!this.supported}
				@click=${this._clicked.bind(this)}
				title=${this.open ? "Stop" : "Start"}
				aria-label=${this.open ? "Stop" : "Start"}
			>
				<mwc-icon>
					${!this.open ? "mic" : "mic_off"}
				</mwc-icon>
			</tone-button>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneMicButton.prototype, "open", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneMicButton.prototype, "supported", void 0);
ToneMicButton = __decorate([
    lit_element_1.customElement("tone-mic-button")
], ToneMicButton);
exports.ToneMicButton = ToneMicButton;

