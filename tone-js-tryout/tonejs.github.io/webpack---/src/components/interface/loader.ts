
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneLoader = void 0;
const tone_1 = __webpack_require__(/*! tone */ "tone");
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
class ToneLoader extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.loading = false;
        this.dots = 0;
    }
    static get styles() {
        return lit_element_1.css `
			#container {
				position: fixed;
				width: 100%;
				height: 100%;
				background-color: rgba(55, 55, 55, 0.5);
				z-index: 10000000;
				top: 0px;
				left: 0px;
				right: 0px;
				bottom: 0px;
				pointer-events: none;
				transition: opacity 0.2s;
				opacity: 0;
			}
			#container[loading] {
				opacity: 1;
			}

			#text {
				position: absolute;
				top: 50%;
				left: 50%;
				font-family: $titleFont;
				color: white;
				font-size: 2em;
				width: 100px;
				transform: translate(-50%, -50%);
			}
		`;
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        window.onload = () => {
            this.loading = tone_1.ToneAudioBuffer.downloads.length > 0;
            if (this.loading) {
                tone_1.loaded().then(() => {
                    this.loading = false;
                });
                this._dotLoop();
            }
        };
    }
    _dotLoop() {
        if (this.loading) {
            this.dots = (this.dots + 1) % 4;
            setTimeout(() => {
                this._dotLoop();
            }, 500);
        }
    }
    render() {
        let dots = "";
        for (let i = 0; i < this.dots; i++) {
            dots += ".";
        }
        return lit_element_1.html `
			<div id="container" ?loading=${this.loading}>
				<div id="text">loading${dots}</div>
			</div>
		`;
    }
}
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneLoader.prototype, "loading", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneLoader.prototype, "dots", void 0);
exports.ToneLoader = ToneLoader;
customElements.define("tone-loader", ToneLoader);

