
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
exports.TonePlayToggle = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
__webpack_require__(/*! ./button */ "./src/components/input/button.ts");
const style = __webpack_require__(/*! ./play-toggle.scss */ "./src/components/input/play-toggle.scss");
let TonePlayToggle = class TonePlayToggle extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.started = false;
        this.disabled = false;
    }
    // updated(changed) {
    // 	if (changed.has("started")) {
    // 		this.dispatchEvent(
    // 			new CustomEvent(this.started ? "start" : "stop")
    // 		);
    // 	}
    // }
    _clicked(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.started = !this.started;
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent(this.started ? "start" : "stop", {
                composed: true,
            }));
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
				?disabled=${this.disabled}
				@click=${!this.disabled ? this._clicked.bind(this) : () => { }}
				title=${this.started ? "Stop" : "Start"}
				aria-label=${this.started ? "Stop" : "Start"}
			>
				<mwc-icon>${!this.started ? "play_arrow" : "stop"}</mwc-icon>
			</tone-button>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], TonePlayToggle.prototype, "started", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], TonePlayToggle.prototype, "disabled", void 0);
TonePlayToggle = __decorate([
    lit_element_1.customElement("tone-play-toggle")
], TonePlayToggle);
exports.TonePlayToggle = TonePlayToggle;

