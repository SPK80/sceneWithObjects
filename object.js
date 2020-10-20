import { Event } from "./event.js";

export class IObject {
	get name() { throw ('name not implemented') }
	init(args) { throw ('init() not implemented') }
	observe(callback) { throw ('observe() not implemented') } //must return unobserve function
	act(action, args) { throw ('act() not implemented') }
}

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