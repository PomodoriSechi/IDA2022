
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = exports.ToneFolderElement = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const audio_node_1 = __webpack_require__(/*! ./audio-node */ "./src/gui/component/audio-node.ts");
const style = __webpack_require__(/*! ./folder.scss */ "./src/gui/component/folder.scss");
__webpack_require__(/*! @material/mwc-icon */ "./node_modules/@material/mwc-icon/mwc-icon.js");
/**
 * A collapsible folder inside tone-drawer
 */
let ToneFolderElement = class ToneFolderElement extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        /**
         * If it is open or collapsed
         */
        this.open = true;
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    /**
     * Add a Tone.js ToneAudioNode
     */
    add({ tone, name }) {
        const element = audio_node_1.createElement({
            tone,
            name,
        });
        this.appendChild(element);
        return this;
    }
    render() {
        return lit_element_1.html `
			<div id="container" ?open=${this.open}>
				<details
					?open=${this.open}
					@toggle=${(e) => (this.open = e.target.open)}
				>
					<summary>
						<mwc-icon>
							${this.open
            ? "keyboard_arrow_down"
            : "keyboard_arrow_right"}
						</mwc-icon>
						<span>
							${this.name}
						</span>
					</summary>
					<div id="contents">
						<slot></slot>
					</div>
				</details>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneFolderElement.prototype, "open", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneFolderElement.prototype, "name", void 0);
ToneFolderElement = __decorate([
    lit_element_1.customElement("tone-folder")
], ToneFolderElement);
exports.ToneFolderElement = ToneFolderElement;
/**
 * Create a folder with the given name
 */
function createFolder({ name, parent, open = false, }) {
    const element = document.createElement("tone-folder");
    element.name = name;
    element.open = open;
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
exports.createFolder = createFolder;

