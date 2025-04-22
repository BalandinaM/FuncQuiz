/* eslint-disable react/prop-types */
import styles from './selectTime.module.css'

const SelectTime = ({selectedTime, handleSelectedTime, optionsGameTime}) => {
	return (
		<div className={styles.wrap}>
			<h3>Время игры:</h3>
			<select className={styles.select} value={selectedTime} onChange={handleSelectedTime}>
				{optionsGameTime}
			</select>
		</div>
	);
};


export default SelectTime;
