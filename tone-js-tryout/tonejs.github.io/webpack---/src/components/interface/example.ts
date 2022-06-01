
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneExample = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
__webpack_require__(/*! ./sidebar */ "./src/components/interface/sidebar.ts");
__webpack_require__(/*! ./mute */ "./src/components/interface/mute.ts");
let ToneExample = class ToneExample extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.label = "";
        this.open = false;
    }
    firstUpdated() {
        document.querySelector("body").style.margin = "0px";
    }
    static get styles() {
        return lit_element_1.css `
			:host {
				width: 100%;
				height: 100%;
				font-family: sans-serif;
			}
			#explanation {
				background-color: var(--color-light-purple);
				font-family: sans-serif;
				margin: 20px 0;
			}

			::slotted(a) {
				text-decoration: none;
				color: #7f33ed;
			}

			#container {
				display: flex;
			}

			tone-sidebar,
			#inner-container {
				flex: 1;
				transition: flex 0.1s;
			}

			#inner-container {
				height: 100vh;
				width: 100%;
				overflow-y: auto;
			}

			#body {
				padding: 40px;
				position: relative;
			}

			tone-sidebar {
				flex: 0 0 240px;
				z-index: 1;
			}

			tone-sidebar:not([open]) {
				flex: 0 0 0px;
				width: 0px;
			}

			#content {
				max-width: 600px;
				margin: 0px auto;
			}

			#title {
				font-size: 1.1em;
				color: #616161;
			}
		`;
    }
    render() {
        return lit_element_1.html `
			<div id="container">
				<tone-sidebar
					?open=${this.open}
					@open=${(e) => (this.open = e.detail)}
				></tone-sidebar>
				<div id="inner-container">
					<div id="body">
						<tone-mute></tone-mute>
						<div id="title">${this.title}</div>
						<div id="explanation">
							<slot name="explanation"></slot>
						</div>
						<div id="content">
							<slot></slot>
						</div>
					</div>
				</div>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: String })
], ToneExample.prototype, "label", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneExample.prototype, "open", void 0);
ToneExample = __decorate([
    lit_element_1.customElement("tone-example")
], ToneExample);
exports.ToneExample = ToneExample;

