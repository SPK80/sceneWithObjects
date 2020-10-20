import { Event } from "./event.js";
import { IObject } from "./iObject.js";

export class Object extends IObject {

	#name = '';
	get name() { return this.#name }

	#event = new Event();

	constructor(name) {
		super();
		this.#name = name;
	}

	init(args) {
		if (args?.name)
			this.#name = args.name;
	}

	observe(callback) {
		return this.#event.subscribe(callback);
	}

	act(action, args) { }

	_call(args) {
		this.#event.call(args)
	}
}