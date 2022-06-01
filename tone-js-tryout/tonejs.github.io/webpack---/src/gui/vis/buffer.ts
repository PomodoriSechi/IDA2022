
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
exports.ToneBufferViz = void 0;
const lit_element_1 = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
const vis_base_1 = __webpack_require__(/*! ./vis-base */ "./src/gui/vis/vis-base.ts");
let ToneBufferViz = class ToneBufferViz extends vis_base_1.VisBase {
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tone) {
                return;
            }
            if (!this.tone.buffer.loaded) {
                yield new Promise((done) => (this.tone.buffer.onload = done));
            }
            const values = this.tone.buffer.getChannelData(0);
            this.draw(values);
        });
    }
    bind(tone) {
        this.tone = tone;
        this.generate();
    }
};
ToneBufferViz = __decorate([
    lit_element_1.customElement("tone-buffer-vis")
], ToneBufferViz);
exports.ToneBufferViz = ToneBufferViz;

