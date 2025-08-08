export function removeDuplicates(arr, key = "id") {
	if (!Array.isArray(arr)) {
		console.error("Первый аргумент должен быть массивом");
		return [];
	}

	return [...new Map(arr.map((item) => [item[key], item])).values()];
}
