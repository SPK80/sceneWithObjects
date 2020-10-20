import { INode } from "./iNode.js";
import { ObjectsObserver } from "./objectsObserver.js";

export class Node extends INode {
	#objects = [];
	get objects() { return this.#objects }

	#observer = new ObjectsObserver();
	get observer() { return this.#observer }

	_initObject(obj) { } //crutch... Should to use internally

	addObject(obj) {
		if (!obj) return;
		if (this.#objects.includes(obj) || this.#objects.find(o => o?.name == obj.name)) {
			console.warn(`${obj.name} ${obj} already exists`);
			return
		}

		try {
			obj.init({ name: obj.name });
			this._initObject(obj);
			this.#objects.push(obj);
			this.#observer.observe(obj);
		} catch (error) {
			console.warn('addObject:', error);
		}

	}

	deleteObject(name) {
		if (!name) return;

		const obj = this.#objects.find(o => o?.name == name);
		if (!obj)
			console.warn(`${name} not found!`);
		else {
			this.#observer.unobserve(obj);
			delete this.#objects[this.#objects.indexOf(obj)];
		}
	}
}