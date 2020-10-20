// import { Object } from "./object.js";

import { IObject } from "./iObject.js";


export class INodeObject extends IObject {
	addObject(obj) { throw ('addObject() not implemented'); }
	deleteObject(name) { throw ('deleteObject() not implemented'); }
	get observer() { throw ('get objectsObserver() not implemented'); }
	get objects() { throw ('get objects() not implemented'); }
}
