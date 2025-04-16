import localforage from "localforage";

export async function getStudiedQuestions() {
	await someNetwork();
	let studiedQuestions = await localforage.getItem("studiedQuestions");
	if (!studiedQuestions) studiedQuestions = [];
	return studiedQuestions;
}

// export async function setStudiedQuestions(studiedQuestions) {
// 	return await localforage.setItem('studiedQuestions', studiedQuestions);
// }

export async function setStudiedQuestions(studiedQuestions, selectedCategory) {
	try {
		console.log(selectedCategory);
    await localforage.setItem("studiedQuestions", studiedQuestions);
  } catch (error) {
    console.error("Ошибка при сохранении данных в localforage:", error);
    throw error;
  }
}

let someCache = {};

async function someNetwork(key) {
	if (!key) {
		someCache = {};
	}

	if (someCache[key]) {
		return;
	}

	someCache[key] = true;

	return new Promise((res) => {
		setTimeout(res, Math.random() * 700);
	});
}
