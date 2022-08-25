/**
 * Manages a data model.
 * @abstract
 */
class Base {
	constructor(client) {
		/**
		 * The client that instantiated this data model
		 * @name Base#client
		 * @type {Client}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', { value: client });
	}
}

module.exports = Base;
