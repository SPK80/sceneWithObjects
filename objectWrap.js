import { IObject } from "./object.js";

export class ObjectWrap extends IObject {
	#object;
	get object() { return this.#object; }

	get name() { return this.#object.name; }

	constructor(object) {
		super();
		this.#object = object;
	}

	init(args) {
		this.#object.init(args);
	}

	observe(callback) {
		return this.#object.observe(callback);
	}

	act(action, args) {
		this.#object.act(action, args);
	}

	_call(args) {  //crutch... Should to use internally
		this.#object._call(args)
	}
}

export class DeletingObject extends ObjectWrap {

	constructor(object) {
		super(object);
	}

	delete() {
		this._call(['delete', this]);
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'delete') {
			this.delete();
		}
	}
}

export class MovingObject extends ObjectWrap {

	constructor(object) {
		super(object);
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

	init(args) {
		super.init(args);

		if (args?.x)
			this.#x = args.x;

		if (args?.y)
			this.#y = args.y;
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'move') {
			const x = args[0];
			const y = args[1];
			this.move(x, y);
		}
	}
}

export class CollidingObject extends ObjectWrap {

	constructor(object) {
		super(object);
	}

	collide(obj) {
		console.log(`${this.name} collide with ${obj.name}`, obj);
		// this.move(this.#x + 1, this.#y + 1);
	}

	act(action, args) {
		super.act(action, args);

		if (action == 'collide') {
			if (!args || args.length < 1) {
				console.warn('collide: not enough parameters');
				return;
			}
			const obj = args[0];
			this.collide(obj);
		}

	}
}