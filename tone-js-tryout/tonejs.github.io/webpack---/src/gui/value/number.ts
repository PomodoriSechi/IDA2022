
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneNumberValue = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const value_1 = __webpack_require__(/*! ./value */ "./src/gui/value/value.ts");
let ToneNumberValue = class ToneNumberValue extends value_1.ToneValue {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.alt = false;
        this.shift = false;
        this.dragging = false;
    }
    firstUpdated(changed) {
        super.firstUpdated(changed);
        window.addEventListener("mousemove", (e) => {
            if (this.dragging) {
                e.preventDefault();
                // find the relative change
                const box = this.shadowRoot.host.getBoundingClientRect();
                const yDiff = box.top + (box.bottom - box.top) / 2 - e.clientY;
                const multiplier = this.shift
                    ? this.alt
                        ? 0.01
                        : 10
                    : this.alt
                        ? 0.1
                        : 1;
                this.value =
                    this.dragstartValue + Math.floor(yDiff / 10) * multiplier;
                this.dispatchValue(this.value);
            }
        });
        window.addEventListener("keydown", (e) => {
            if (e.keyCode === 18) {
                this.alt = true;
            }
            this.shift = e.shiftKey;
        });
        window.addEventListener("keyup", (e) => {
            if (e.keyCode === 18) {
                this.alt = false;
            }
            this.shift = e.shiftKey;
        });
    }
    _oninput(e) {
        e.preventDefault();
        e.stopPropagation();
        const value = parseFloat(this.shadowRoot.querySelector("input").value);
        if (isFinite(value)) {
            this.value = value;
            this.dispatchValue(value);
        }
    }
    _onkeypress(e) {
        let modified = false;
        if (e.key === "ArrowUp") {
            modified = true;
            if (this.shift) {
                this.value += this.alt ? 0.01 : 10;
            }
            else {
                this.value += this.alt ? 0.1 : 1;
            }
        }
        else if (e.key === "ArrowDown") {
            modified = true;
            if (this.shift) {
                this.value -= this.alt ? 0.01 : 10;
            }
            else {
                this.value -= this.alt ? 0.1 : 1;
            }
        }
        if (modified) {
            e.preventDefault();
            this.dispatchValue(this.value);
        }
    }
    reset() {
        this.shadowRoot.querySelector("input").value = this.beautifyValue(this.value).toString();
    }
    _dragstart(e) {
        this.dragging = true;
        this.dragstartValue = this.value;
        window.addEventListener("mouseup", () => {
            if (this.dragstartValue !== this.value) {
                this.dispatchValue(this.value);
            }
            this.dragging = false;
        }, { once: true });
    }
    beautifyValue(val) {
        const float = val.toString().split(".")[1];
        return parseFloat(val.toFixed(Math.min(float && float.length, 4)));
    }
    render() {
        return lit_element_1.html `
			<div id="container">
				<label for="number">${this.name}</label>
				<input
					@mousedown=${this._dragstart.bind(this)}
					@keydown=${this._onkeypress.bind(this)}
					@change=${this._oninput.bind(this)}
					name="number"
					type="text"
					.value="${this.beautifyValue(this.value)}"
				/>
			</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: String })
], ToneNumberValue.prototype, "name", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneNumberValue.prototype, "value", void 0);
ToneNumberValue = __decorate([
    lit_element_1.customElement("tone-number")
], ToneNumberValue);
exports.ToneNumberValue = ToneNumberValue;

