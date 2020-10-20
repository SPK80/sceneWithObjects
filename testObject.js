import { Object } from "./object.js";


export class TestObject extends Object {
	constructor(name) {
		super(name);
	}

	#render;

	init(args) {
		super.init(args);

		if (args?.x)
			this.#x = args.x;

		if (args?.y)
			this.#y = args.y;

		if (args?.render)
			this.#render = args.render;
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'move') {
			const x = args[0];
			const y = args[1];
			this.move(x, y);
		}

		else if (action == 'delete') {
			this.delete();
		}

		else if (action == 'collide') {
			const obj = args[0];
			this.collide(obj);
		}

		else if (action == 'draw') {
			this.draw();
		}
	}

	#x = 0;
	get x() { return this.#x; }

	#y = 0;
	get y() { return this.#y; }

	move(x, y) {
		this.#x = x;
		this.#y = y;
		this._call(['move', this]);
	}

	delete() {
		this._call(['delete', this]);
	}

	collide(obj) {
		console.log(`${this.name} collide with ${obj.name}`, obj);
		// this.move(this.#x + 1, this.#y + 1);
	}

	draw() {
		if (this.#render)
			console.log(`draw ${this.name} by ${this.#render}`)
		else
			console.warn('render undifined!')
		// this._call(['draw', this, this.#render]);
	}
}