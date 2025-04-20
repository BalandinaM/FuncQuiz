/* eslint-disable react/prop-types */

import styles from './selectCategory.module.css';

const categoryTranslations = {
  arrays: 'Массивы',
  string: 'Строки',
  mathFunction: 'Математические функции',
  time: 'Работа с датой и временем'
};

const SelectCategory = ({ questions, selectedCategory, setSelectedCategory, handleChangeSelect }) => {
  const questionCategories = [...new Set(questions.map(q => q.category))];

  const options = questionCategories.map((category) => (
    <option value={category} key={category}>
      {categoryTranslations[category] || category}
    </option>
  ));

	options.unshift(
		<option value="all" key="all">Все категории</option>
	);

// 	const handleChangeSelect = (event) => {
// //перебрать здесь массив и убедится что он не пустой
// 		if (questions.filter((item) => item.category === event.target.value).length != 0) {
// 			console.log('элементы есть!')
// 		} else {
// 			console.log("ПУСТО!")
// 		}
// 	}

  return (
    <div className={styles.wrap}>
      <h3>Выбери категорию функций по которой устроим проверку:</h3>
      <select
        className={styles.select}
        value={selectedCategory}
        onChange={(event) => handleChangeSelect(event)}
      >
        {options}
      </select>
    </div>
  );
}

export default SelectCategory;
