import { INodeObject } from "./iNode.js";

export class NodeWrap extends INodeObject {

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

	#render = new Render();
	_initObject(obj) {
		obj.init({ render: this.#render });
	}

}

class Render {
	x = 0;
	y = 0;

	draw(x, y) {
		console.log(`draw x=${x + this.x} y=${y + this.y}`);
	}
}