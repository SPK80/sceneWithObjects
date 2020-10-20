export class ObjectsObserver {

	#typedHandlers = {};

	#eventHandler = (args) => {
		const _type = args[0];
		const _handler = this.#typedHandlers[_type];
		if (_handler) {
			const _args = args.slice(1);
			_handler(_args);
		}
	};

	addHandler(type, handler = () => { }) {
		if (!type)
			return;
		this.#typedHandlers[type] = handler;
	}

	deleteHandler(type) {
		delete this.#typedHandlers[type];
	}

	#unobserveFuncs = {};

	observe(object) {
		const uf = object.observe(this.#eventHandler);
		this.#unobserveFuncs[object.name] = uf;
	}

	unobserve(object) {
		const uf = this.#unobserveFuncs[object.name];
		// console.log('unobserveFuncs:', object.name, object);
		if (!uf) {
			console.warn(`unobserveFunc for ${object.name} ${object} not found!`);
			return
		}
		uf();
		delete this.#unobserveFuncs[object.name];
	}
}