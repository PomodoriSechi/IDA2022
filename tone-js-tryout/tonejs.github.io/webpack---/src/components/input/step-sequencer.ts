
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneStepSequencer = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const Tone = __webpack_require__(/*! tone */ "tone");
const style = __webpack_require__(/*! ./step-sequencer.scss */ "./src/components/input/step-sequencer.scss");
let ToneStepSequencer = class ToneStepSequencer extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.columns = 16;
        this.rows = 4;
        this.subdivision = "8n";
        this._matrix = [];
        this.highlighted = -1;
        this.started = false;
    }
    update(changed) {
        if (changed.has("columns") || changed.has("subdivision")) {
            if (this._sequencer) {
                this._sequencer.dispose();
            }
            this._sequencer = new Tone.Sequence(this._tick.bind(this), this._indexArray(this.columns), this.subdivision).start(0);
        }
        if (changed.has("columns") || changed.has("rows")) {
            this._matrix = this._indexArray(this.columns).map(() => {
                return this._indexArray(this.rows).map(() => false);
            });
        }
        super.update(changed);
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        Tone.Transport.on("start", () => this.started = true);
        Tone.Transport.on("stop", () => {
            this.highlighted = -1;
            this.started = false;
        });
    }
    updated(changed) {
        super.updated(changed);
        if (changed.has("rows")) {
            const width = this._container.offsetWidth;
            const cellWidth = width / this.columns;
            this._container.style.height = `${cellWidth * this.rows}px`;
        }
    }
    _indexArray(count) {
        const indices = [];
        for (let i = 0; i < count; i++) {
            indices.push(i);
        }
        return indices;
    }
    _tick(time, index) {
        Tone.Draw.schedule(() => {
            if (this.started) {
                this.highlighted = index;
            }
        }, time);
        this._matrix[index].forEach((value, row) => {
            if (value) {
                row = this.rows - row - 1;
                this.dispatchEvent(new CustomEvent("trigger", {
                    detail: {
                        time,
                        row,
                    },
                    composed: true,
                }));
            }
        });
    }
    static get styles() {
        return lit_element_1.css `${lit_element_1.unsafeCSS(style)}`;
    }
    _updateCell(column, row) {
        this._matrix[column][row] = !this._matrix[column][row];
        this.requestUpdate();
    }
    _mouseover(e, column, row) {
        if (e.buttons) {
            this._updateCell(column, row);
        }
    }
    render() {
        return lit_element_1.html `
			<div id="container">${this._matrix.map((column, x) => lit_element_1.html `
				<div class="column" ?highlighted=${x === this.highlighted}>
					${column.map((cell, y) => lit_element_1.html `
						<button 
							@mouseover=${e => this._mouseover(e, x, y)}
							@mousedown=${e => this._mouseover(e, x, y)}
							class="cell" ?filled=${cell}></button>
					`)}
				</div>
			`)}</div>
		`;
    }
};
__decorate([
    lit_element_1.property({ type: Number })
], ToneStepSequencer.prototype, "columns", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneStepSequencer.prototype, "rows", void 0);
__decorate([
    lit_element_1.property({ type: String })
], ToneStepSequencer.prototype, "subdivision", void 0);
__decorate([
    lit_element_1.query("#container")
], ToneStepSequencer.prototype, "_container", void 0);
__decorate([
    lit_element_1.property({ type: Number })
], ToneStepSequencer.prototype, "highlighted", void 0);
ToneStepSequencer = __decorate([
    lit_element_1.customElement("tone-step-sequencer")
], ToneStepSequencer);
exports.ToneStepSequencer = ToneStepSequencer;

