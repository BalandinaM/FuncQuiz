import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		category: "arrays",
		id: 111,
		question: "Это свойство позволяет узнать и установить длину массива.",
		answer: "length",
		isLearn: false,
	},
	{
		category: "arrays",
		id: 112,
		question: "Метод сливает указанные массивы в один общий массив.",
		answer: "concat()",
		isLearn: false,
	},
	{
		category: "arrays",
		id: 113,
		question: "Метод объединяет элементы массива в строку с указанным разделителем.",
		answer: "join()",
		isLearn: false,
	},
	{
		category: "string",
		id: 211,
		question: "Метод удаляет пробелы по краям строки.",
		answer: "trim()",
		isLearn: false,
	},
	{
		category: "string",
		id: 212,
		question:
			"Метод возвращает символ, стоящий на указанной позиции в строке. Позиция задается параметром метода (нумерация начинается с нуля).",
		answer: "charAt()",
		isLearn: false,
	},
	{
		category: "string",
		id: 213,
		question: "Метод выполняет поиск заданной строки в текущей с учетом регистра.",
		answer: "includes()",
		isLearn: false,
	},
	{
		category: "mathFunction",
		id: 311,
		question: "Метод возвращает случайное дробное число от 0 до 1.",
		answer: "Math.random()",
		isLearn: false,
	},
	{
		category: "mathFunction",
		id: 312,
		question:
			"Метод выполняет округление до ближайшего целого числа по правилам математического округления.",
		answer: "Math.round()",
		isLearn: false,
	},
	{
		category: "mathFunction",
		id: 313,
		question: "Метод производит округление дробного числа до целого всегда в большую сторону.",
		answer: "Math.ceil()",
		isLearn: false,
	},
	{
		category: "time",
		id: 411,
		question: "Метод применяется к объекту с датой и возвращает текущий месяц.",
		answer: "getMonth()",
		isLearn: false,
	},
	{
		category: "time",
		id: 412,
		question:
			"Метод применяется к объекту с датой и возвращает номер текущего дня месяца. Нумерация дней начинается с 1.",
		answer: "getDate()",
		isLearn: false,
	},
	{
		category: "time",
		id: 413,
		question:
			"Метод применяется к объекту с датой и возвращает текущее значение минут (число от 0 до 59).",
		answer: "getMinutes()",
		isLearn: false,
	},
	{
		category: "arrays",
		id: 114,
		question: "Метод изменяет порядок элементов в массиве на обратный.",
		answer: "reverse()",
		isLearn: false,
	},
	{
		category: "arrays",
		id: 115,
		question: "Метод проверяет наличие элемента в массиве. Параметром принимает значение для поиска. Если такой элемент есть в массиве, то метод возвращает true, а если нет, то false.",
		answer: "includes()",
		isLearn: false,
	},
];

export const questionsGameSlice = createSlice({
	name: "questionsGame",
	initialState,
	reducers: {},
});

export default questionsGameSlice.reducer;
