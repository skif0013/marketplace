import React from 'react';
import styles from "./steps.module.css";

function Step2({onBack}) {
    return (
        <div className={styles.formContainer}>
            <h1 className = {styles}>Контактная информация</h1>
            <input placeholder='ФИО' className={styles.formInput}/>
            <input placeholder='Должность' className={styles.formInput}/>
            <input placeholder='E-mail' className={styles.formInput}/>
            <input placeholder='Номер телефона' className={styles.formInput}/>
            <button onClick={onBack} className={styles.button}>Назад</button>
        </div>
    );
}

export default Step2;