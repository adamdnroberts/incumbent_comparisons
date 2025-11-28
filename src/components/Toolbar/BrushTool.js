import { html } from "lit-html";
import BrushSlider from "./BrushSlider";
import Tool from "./Tool";

export default class BrushTool extends Tool {
    constructor(brush) {
        const icon = html`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            style="display: inline-block; height: 26px; z-index: 100;">
            <path d="M2 2 L17 12 L12 13 L16 22 L10 14 L6 18 Z" fill="currentColor"></path>
        </svg>`;
        super("brush", "Draw", icon);
        this.brush = brush;
        this.options = new BrushToolOptions(brush);
    }
    activate() {
        super.activate();
        this.brush.activate();
    }
    deactivate() {
        super.deactivate();
        this.brush.deactivate();
    }
}

class BrushToolOptions {
    constructor(brush, renderToolbar) {
        this.brush = brush;
        this.renderToolbar = renderToolbar;
        this.changeRadius = this.changeRadius.bind(this);
    }
    changeRadius(e) {
        e.stopPropagation();
        let value = parseInt(e.target.value);
        if (this.brush.radius != value) {
            this.brush.radius = value;
        }
        this.renderToolbar();
    }
    render() {
        return html`${BrushSlider(this.brush.radius, this.changeRadius)}`;
    }
}
