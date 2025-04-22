import localforage from "localforage";
import { removeDuplicates } from "./assests/util";

export async function getStudiedQuestions() {
	await someNetwork();
	let studiedQuestions = await localforage.getItem("studiedQuestions");
	if (!studiedQuestions) studiedQuestions = [];
	console.log('Получено из хранилища:', studiedQuestions)
	return studiedQuestions;
}

export async function addStudiedQuestions(studiedQuestions) {
	let arrayStudiedQuestionsFromStorage = await getStudiedQuestions() || [];
	const updated = [
    ...studiedQuestions.map(q => ({ ...q, isLearn: true })),
    ...arrayStudiedQuestionsFromStorage
	]
	await setStudiedQuestions(removeDuplicates(updated));
}

export async function setStudiedQuestions(studiedQuestions) {
	try {
    await localforage.setItem("studiedQuestions", studiedQuestions);
  } catch (error) {
    console.error("Ошибка при сохранении данных в localforage:", error);
    throw error;
  }
}

export async function resetProgress() {
  try {
    await localforage.removeItem("studiedQuestions");

    someCache = {};

    console.log("Прогресс успешно сброшен");
		console.log('Проверка после очистки:', await localforage.getItem("studiedQuestions"))
    return true;
  } catch (error) {
    console.error("Ошибка при сбросе прогресса:", error);
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
