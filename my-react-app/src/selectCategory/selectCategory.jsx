/* eslint-disable react/prop-types */
import styles from './selectCategory.module.css';

const categoryTranslations = {
  arrays: 'Массивы',
  string: 'Строки',
  mathFunction: 'Математические функции',
  time: 'Работа с датой и временем'
};

const SelectCategory = ({questionCategories, selectedCategory, setSelectedCategory}) => {

	const options = questionCategories.map((category, index) => {
		return <option value={category} key={index}>{categoryTranslations[category] || category}</option>
	})

	return (
		<div className={styles.wrap}>
			<h3>Выбери категорию функций по которой устроим проверку:</h3>
			<select className={styles.select} value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
				{options}
			</select>
		</div>
	);
}

export default SelectCategory;

//тут надо подумать можно ли формировать пункты с помомщью пропсов.
