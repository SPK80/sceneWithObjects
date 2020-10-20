import { ObjectWrap } from "./objectWrap.js";

export class DrawingObject extends ObjectWrap {

	constructor(object) {
		super(object);
	}

	#render;
	init(args) {
		super.init(args);

		if (args?.render)
			this.#render = args.render;
	}

	observe(callback) {
		return super.observe(callback);
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'draw') {
			this.draw();
		}
	}

	draw() {
		if (this.#render) {
			console.log(`draw ${this.name} by ${this.#render}`)
		}
		else
			console.warn('render undifined!')
		// this._call(['draw', this, this.#render]);
	}
}