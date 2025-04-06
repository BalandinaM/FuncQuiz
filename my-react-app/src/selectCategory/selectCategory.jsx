import styles from './selectCategory.module.css'

const SelectCategory = () => {

	return (
		<div className={styles.wrap}>
			<h3>Выбери категорию функций по которой устроим проверку:</h3>
			<select className={styles.select}>
				<option>Массивы</option>
				<option>Строки</option>
				<option>Математические методы</option>
			</select>
		</div>
	);
}

export default SelectCategory;

//тут надо подумать можно ли формировать пункты с помомщью пропсов.
