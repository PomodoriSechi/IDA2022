
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDrawer = exports.ToneDrawerElement = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const audio_node_1 = __webpack_require__(/*! ./audio-node */ "./src/gui/component/audio-node.ts");
const folder_1 = __webpack_require__(/*! ./folder */ "./src/gui/component/folder.ts");
const style = __webpack_require__(/*! ./drawer.scss */ "./src/gui/component/drawer.scss");
__webpack_require__(/*! @material/mwc-icon */ "./node_modules/@material/mwc-icon/mwc-icon.js");
/**
 * Collapsible element to add
 */
let ToneDrawerElement = class ToneDrawerElement extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        /**
         * If the element is collapsed
         */
        this.open = true;
        /**
         * If the element is not visible on the page
         */
        this.hidden = false;
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        document.body.addEventListener("keypress", (e) => {
            if (e.key === "H") {
                this.hidden = !this.hidden;
            }
        });
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    /**
     * Add a Tone.js ToneAudioNode
     */
    add(options) {
        const element = audio_node_1.createElement(options);
        this.appendChild(element);
        return this;
    }
    /**
     * Create a folder with the given name
     */
    folder({ name, open }) {
        const element = folder_1.createFolder({ name, open });
        this.appendChild(element);
        return element;
    }
    render() {
        return lit_element_1.html `
			<div id="container" ?open=${this.open} ?hidden=${this.hidden}>
				<details
					?open=${this.open}
					@toggle=${(e) => (this.open = e.target.open)}
				>
					<summary>
						<mwc-icon>
							${!this.open ? "unfold_more" : "unfold_less"}
						</mwc-icon>
						${this.open ? "close" : "controls"}
					</summary>
					<div id="scroll">
						<div id="inner-scroll">
							<slot></slot>
						</div>
					</div>
				</details>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneDrawerElement.prototype, "open", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneDrawerElement.prototype, "hidden", void 0);
ToneDrawerElement = __decorate([
    lit_element_1.customElement("tone-drawer")
], ToneDrawerElement);
exports.ToneDrawerElement = ToneDrawerElement;
/**
 * Create a collapsible drawer
 */
function createDrawer({ parent = document.body, open = false, } = {}) {
    const element = document.createElement("tone-drawer");
    if (parent) {
        parent.appendChild(element);
    }
    element.open = open;
    return element;
}
exports.createDrawer = createDrawer;

