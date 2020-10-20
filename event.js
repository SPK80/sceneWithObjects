export class Event {
	#callbacks = [];
	#unsubCondition;

	constructor(unsubCondition) {
		this.#unsubCondition = unsubCondition;
	}

	subscribe(callback) {
		this.#callbacks.push(callback);
		return () => { this.unsubscribe(callback); };
	}

	unsubscribe(callback) {
		const i = this.#callbacks.indexOf(callback);
		delete this.#callbacks[i];
	}

	call(args) {
		this.#callbacks.forEach(callback => {
			const feedBack = callback(args);
			if (this.#unsubCondition && feedBack == this.#unsubCondition)
				this.unsubscribe(callback);
		});
	}
}