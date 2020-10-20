
export class IObject {
	get name() { throw ('name not implemented'); }
	init(args) { throw ('init() not implemented'); }
	observe(callback) { throw ('observe() not implemented'); } //must return unobserve function
	act(action, args) { throw ('act() not implemented'); }
}