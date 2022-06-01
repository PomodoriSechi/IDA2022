
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
exports.ToneSidebar = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const tone_1 = __webpack_require__(/*! tone */ "tone");
let ToneSidebar = class ToneSidebar extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.loading = true;
        this.examples = {};
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("./js/ExampleList.json");
            if (response.ok) {
                this.examples = yield response.json();
                this.loading = false;
            }
        });
    }
    updated(changed) {
        if (changed.has("open")) {
            this.dispatchEvent(new CustomEvent("open", {
                detail: this.open,
            }));
        }
    }
    static get styles() {
        return lit_element_1.css `
			:host {
				position: relative;
				height: 100%;
				width: 100%;
			}
			#title a {
				font-size: 1.2em;
				text-decoration: none;
				color: black;
				font-family: sans-serif;
			}
			#title {
				margin: 10px 15px;
			}
			#content {
				overflow: hidden;
				width: 100%;
				height: 100vh;
				overflow-y: scroll;
				background-color: var(--light-gray, #ececec);
			}
			#content:not([open]) {
				width: 0px;
			}

			#expand {
				position: absolute;
				top: 0px;
				right: -35px;
				appearance: none;
				background-color: transparent;
				border: none;
			}

			ul,
			li {
				padding: 5px 10px;
				text-align: left;
				list-style-type: none;
				font-family: sans-serif;
				width: 100%;
			}
			ul:last-child {
				padding-bottom: 20px;
			}
			ul span {
				text-transform: uppercase;
				border-bottom: 1px solid #616161;
				margin-bottom: 10px;
				width: 100%;
				display: block;
				color: #616161;
			}

			li a {
				text-decoration: none;
				color: black;
				width: 100%;
				display: block;
			}

			li[selected] {
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
				background-color: white;
			}
		`;
    }
    render() {
        const splitPath = window.location.pathname.split("/");
        const exampleName = splitPath[splitPath.length - 1];
        return lit_element_1.html `
			<div id="content" ?open=${this.open}>
				<div id="title">
					<a href="https://tonejs.github.io">Tone.js v${tone_1.version}</a>
				</div>
				${this.loading
            ? "loading"
            : Object.keys(this.examples).map((group) => lit_element_1.html `
								<ul id="group">
									<span>${group}</span>
									${Object.keys(this.examples[group]).map((subgroup) => lit_element_1.html `
											<li
												?selected=${exampleName ===
                this.examples[group][subgroup]}
											>
												<a
													href=${this.examples[group][subgroup]}
												>
													${subgroup}
												</a>
											</li>
										`)}
								</ul>
							`)}
			</div>
			<button id="expand" @click=${() => (this.open = !this.open)}>
				<mwc-icon>${!this.open ? "menu" : "menu_open"}</mwc-icon>
			</button>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneSidebar.prototype, "open", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneSidebar.prototype, "loading", void 0);
ToneSidebar = __decorate([
    lit_element_1.customElement("tone-sidebar")
], ToneSidebar);
exports.ToneSidebar = ToneSidebar;

