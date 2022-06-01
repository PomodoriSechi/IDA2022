
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
exports.createElement = exports.ToneAudioNodeElement = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
__webpack_require__(/*! ../value/number */ "./src/gui/value/number.ts");
__webpack_require__(/*! ../value/string */ "./src/gui/value/string.ts");
__webpack_require__(/*! ../value/array */ "./src/gui/value/array.ts");
__webpack_require__(/*! ../value/boolean */ "./src/gui/value/boolean.ts");
__webpack_require__(/*! ../vis/visualizer */ "./src/gui/vis/visualizer.ts");
const style = __webpack_require__(/*! ./audio-node.scss */ "./src/gui/component/audio-node.scss");
__webpack_require__(/*! @material/mwc-icon */ "./node_modules/@material/mwc-icon/mwc-icon.js");
let ToneAudioNodeElement = class ToneAudioNodeElement extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        /**
         * If the node is open or closed
         */
        this.open = true;
    }
    pathToObject(path, value) {
        const obj = {};
        let subValue = obj;
        path.forEach((prop, index) => {
            if (index === path.length - 1) {
                subValue[prop] = value;
            }
            else {
                subValue[prop] = {};
                subValue = subValue[prop];
            }
        });
        return obj;
    }
    pathToValue(path, obj) {
        let subValue = obj;
        let retValue = undefined;
        path.forEach((prop, index) => {
            if (index === path.length - 1) {
                retValue = subValue[prop];
            }
            else {
                subValue = subValue[prop];
            }
        });
        return retValue;
    }
    bind(tone) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tone = tone;
            yield this.requestUpdate();
            // also bind all of the children nodes
            this.shadowRoot
                .querySelectorAll("tone-visualizer")
                .forEach((vis) => {
                vis.bind(this.tone);
            });
        });
    }
    setValue(path, detail) {
        if (this.tone) {
            const currentValue = this.tone.get();
            try {
                this.tone.set(this.pathToObject(path, detail.value));
            }
            catch (e) {
                const previousValue = this.pathToValue(path, currentValue);
                this.tone.set(this.pathToObject(path, previousValue));
                detail.reject(previousValue);
            }
            this.requestUpdate();
        }
    }
    renderValue(name, values, path) {
        const value = values[name];
        if (typeof value === "number") {
            return lit_element_1.html `
				<tone-number
					class="value"
					@value=${(e) => this.setValue(path, e.detail)}
					name="${name}"
					value=${value}
				></tone-number>
			`;
        }
        else if (typeof value === "string") {
            return lit_element_1.html `
				<tone-string
					class="value"
					@value=${(e) => this.setValue(path, e.detail)}
					name="${name}"
					value="${value}"
				></tone-string>
			`;
        }
        else if (typeof value === "boolean") {
            return lit_element_1.html `
				<tone-boolean
					class="value"
					@value=${(e) => this.setValue(path, e.detail)}
					name="${name}"
					?value=${value}
				></tone-boolean>
			`;
        }
        else if (Array.isArray(value)) {
            return lit_element_1.html `
				<tone-array
					class="value"
					@value=${(e) => this.setValue(path, e.detail)}
					name="${name}"
					value=${JSON.stringify(value)}
				></tone-array>
			`;
        }
        else if (typeof value === "object") {
            return lit_element_1.html `
				<details
					class="sub-value"
					@toggle=${(e) => (e.target.querySelector("mwc-icon").textContent = e
                .target.open
                ? "arrow_drop_down"
                : "arrow_right")}
				>
					<summary>
						<mwc-icon>
							arrow_right
						</mwc-icon>
						${name}
					</summary>
					<div class="sub-values">
						${this.renderValues(value, [...path])}
					</div>
				</details>
			`;
        }
    }
    toneObjFromPath(path) {
        let tone = this.tone;
        path.forEach((seg) => {
            tone = tone[seg];
        });
        if (tone) {
            return tone.get();
        }
        else {
            return {};
        }
    }
    sortValues(values) {
        const ret = {};
        const keys = Object.keys(values);
        function isObject(value) {
            return typeof value === "object" && !Array.isArray(value);
        }
        // first put in all of the non-objects
        keys.sort().forEach((key) => {
            const value = values[key];
            if (!isObject(value)) {
                ret[key] = value;
            }
        });
        // put in all of the objects
        keys.sort().forEach((key) => {
            const value = values[key];
            if (isObject(value) && Object.keys(value).length) {
                ret[key] = value;
            }
        });
        return ret;
    }
    renderValues(values, path) {
        values = this.sortValues(values);
        return lit_element_1.html `
			<tone-visualizer
				path=${JSON.stringify(path)}
				values=${JSON.stringify(this.toneObjFromPath(path))}
			>
			</tone-visualizer>
			${Object.keys(values).map((name) => lit_element_1.html `
					${this.renderValue(name, values, [...path, name])}
				`)}
		`;
    }
    static get styles() {
        return lit_element_1.css `
			${lit_element_1.unsafeCSS(style)}
		`;
    }
    render() {
        if (this.tone) {
            return lit_element_1.html `
				<div id="container">
					<details
						?open=${this.open}
						@toggle=${(e) => (this.open = e.target.open)}
					>
						<summary id="title">
							<mwc-icon>
								${this.open
                ? "keyboard_arrow_down"
                : "keyboard_arrow_right"}
							</mwc-icon>
							<span>
								${this.name}
							</span>
						</summary>
						${this.renderValues(this.tone.get(), [])}
						<details id="json">
							<summary> <mwc-icon>code</mwc-icon> </summary>
							<pre>
${JSON.stringify(this.tone.get(), undefined, "\t")}</pre
							>
						</details>
					</details>
				</div>
			`;
        }
        else {
            return lit_element_1.html `
				<div id="container">
					<h4>${this.name}</h4>
					<div>Set a Tone.js object with 'bind'</div>
				</div>
			`;
        }
    }
};
__decorate([
    lit_element_1.property({ type: String })
], ToneAudioNodeElement.prototype, "name", void 0);
__decorate([
    lit_element_1.property({ type: Boolean })
], ToneAudioNodeElement.prototype, "open", void 0);
ToneAudioNodeElement = __decorate([
    lit_element_1.customElement("tone-audio-node")
], ToneAudioNodeElement);
exports.ToneAudioNodeElement = ToneAudioNodeElement;
/**
 * Create an audio node element
 */
function createElement({ tone, name = tone.toString(), parent, open = false, }) {
    const element = document.createElement("tone-audio-node");
    element.bind(tone);
    element.name = name;
    element.open = open;
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
exports.createElement = createElement;

