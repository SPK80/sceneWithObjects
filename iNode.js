import { Object } from "./object.js";


export class INode extends Object {
	addObject(obj) { throw ('addObject() not implemented'); }
	deleteObject(name) { throw ('deleteObject() not implemented'); }
	get observer() { throw ('get objectsObserver() not implemented'); }
	get objects() { throw ('get objects() not implemented'); }
}
