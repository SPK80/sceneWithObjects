import { INode } from "./node.js";

export class NodeWrap extends INode {

	#node;
	constructor(node) {
		super();
		this.#node = node;
	}

	_initObject(obj) { throw ('_initObject() must be implemented internally'); }

	get observer() { return this.#node.observer; }

	get objects() { return this.#node.objects; }

	addObject(obj) {
		this.#node.addObject(obj);

		try {
			this._initObject(obj);
		}
		catch (error) {
			console.warn('addObject:', error);
		}
	}

	deleteObject(name) {
		this.#node.deleteObject(name);
	}
}

export class RenderNodeWrap extends NodeWrap {

	#render = 'render';
	_initObject(obj) {
		obj.init({ render: this.#render });
	}

}