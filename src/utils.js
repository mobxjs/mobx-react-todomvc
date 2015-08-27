export function	uuid() {
	/*jshint bitwise:false */
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
}

export function pluralize(count, word) {
	return count === 1 ? word : word + 's';
}

export function storeDataToLocalStore(namespace, data) {
	if (data) {
		localStorage.setItem(namespace, JSON.stringify(data));
	}
}

export function getDataFromLocalStore(namespace) {
	var store = localStorage.getItem(namespace);
	return (store && JSON.parse(store)) || [];
}
