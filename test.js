import { Node } from "./node.js";
import { INodeObject } from "./iNode.js";
import { DrawingObject } from "./drawingObject.js";
import { Object } from "./object.js";
import { CollidingObject, DeletingObject, MovingObject } from "./objectWrap.js";
import { TestObject } from "./TestObject.js";
import { RenderNodeWrap } from "./NodeWrap.js";

class TestNode extends INodeObject {
	#wrapedNode;
	#wrapedObject;

	constructor(name) {
		super(name);
		this.#wrapedNode =
			new RenderNodeWrap(
				new Node());

		this.#wrapedObject = new Object(name);

		this.observer.addHandler('move',
			args => {
				const movedObj = args[0];
				console.log('move:', ...args);
				this.objects.forEach(o => {
					if (o != movedObj && o.x == movedObj.x && o.y == movedObj.y) {
						movedObj.act('collide', [o]);
					}
				});
			});

		this.observer.addHandler('delete',
			args => {
				console.log('delete:', ...args);
				// console.log(args[0].name);
				this.deleteObject(args[0].name);
				this.#wrapedObject._call([`!${args[0].name} deleted`]);
			});

		this.observer.addHandler('draw',
			args => {
				console.log('draw:', ...args);
			});
	}

	addObject(obj) {
		this.#wrapedNode.addObject(obj);
	}

	deleteObject(name) {
		this.#wrapedNode.deleteObject(name);
	}

	get observer() { return this.#wrapedNode.observer }
	get objects() { return this.#wrapedNode.objects }

	observe(callback) {
		this.#wrapedObject.observe(callback);
	}

}

// const node = new RenderNodeWrap(new Node('TestNode'));

// node.observer.addHandler('draw',
// 	args => {
// 		console.log('draw:', ...args);
// 	});

const node = new TestNode('TestNode');

node.observe(args => { console.log(...args) });

const testObject1 = new DrawingObject(
	new MovingObject(
		new CollidingObject(
			new DeletingObject(
				new Object('TestObject1')))));

const testObject2 = new TestObject('TestObject2');

node.addObject(testObject1);
node.addObject(testObject2);

testObject2.act('move', [1, 2]);
testObject2.act('collide', [testObject1]);
testObject2.act('draw');
testObject1.act('delete');

testObject2.delete();