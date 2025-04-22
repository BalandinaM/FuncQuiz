/* eslint-disable react/prop-types */
import styles from './selectTime.module.css'

const SelectTime = ({selectedTime, handleSelectedTime, optionsGameTime, isGameStarted}) => {
	return (
		<div className={styles.wrap}>
			<h3>Время игры:</h3>
			<select className={styles.select} value={selectedTime} onChange={handleSelectedTime} disabled={isGameStarted}>
				{optionsGameTime}
			</select>
		</div>
	);
};


export default SelectTime;
