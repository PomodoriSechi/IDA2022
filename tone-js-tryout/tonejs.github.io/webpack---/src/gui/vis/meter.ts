
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeter = exports.ToneMeterElement = void 0;
const vis_base_1 = __webpack_require__(/*! ./vis-base */ "./src/gui/vis/vis-base.ts");
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const Color = __webpack_require__(/*! color */ "./node_modules/color/index.js");
const style_map_1 = __webpack_require__(/*! lit-html/directives/style-map */ "./node_modules/lit-html/directives/style-map.js");
let ToneMeterElement = class ToneMeterElement extends vis_base_1.VisBase {
    constructor() {
        super(...arguments);
        this.height = 40;
        this.meterLevels = [];
    }
    generate() {
        // ignored
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this));
        if (!this.tone) {
            return;
        }
        const values = this.tone.getValue();
        this.meterLevels = Array.isArray(values) ? values : [values];
        this.requestUpdate();
    }
    bind(tone) {
        this.tone = tone;
        this.tone.normalRange = true;
        this.loop();
    }
    renderColor(val) {
        return Color("#aaa")
            .mix(Color("rgb(209, 196, 15)"), Math.pow(val, 0.5))
            .hex();
    }
    render() {
        return lit_element_1.html `
			<style>
				#container {
					display: flex;
					align-items: flex-end;
					border: 2px outset #ddd;
					border-color: transparent transparent #ddd;
				}
				.level {
					flex: 1;
					background-color: #aaa;
					margin: 2px;
					min-height: 2px;
					border-top-left-radius: 2px;
					border-top-right-radius: 2px;
				}
			</style>
			<div
				id="container"
				style=${style_map_1.styleMap({
            height: `${this.height}px`,
        })}
			>
				${this.meterLevels.map((val) => lit_element_1.html `
						<div
							class="level"
							style=${style_map_1.styleMap({
            height: `${(Math.pow(val, 0.2) * 100).toFixed(2)}%`,
            backgroundColor: this.renderColor(val),
        })}
						></div>
					`)}
			</div>
		`;
    }
};
ToneMeterElement = __decorate([
    lit_element_1.customElement("tone-meter-vis")
], ToneMeterElement);
exports.ToneMeterElement = ToneMeterElement;
/**
 * Create an audio node element
 */
function createMeter({ tone, parent, height, }) {
    const element = document.createElement("tone-meter-vis");
    element.bind(tone);
    if (parent) {
        parent.appendChild(element);
    }
    if (height) {
        element.setAttribute("height", height.toString());
    }
    return element;
}
exports.createMeter = createMeter;

