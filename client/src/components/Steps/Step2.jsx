import React, {useState} from 'react';
import styles from "./steps.module.css";
import Input from 'react-phone-number-input/input'

function Step2({onBack}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [value, setValue] = useState(undefined)

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleRegister = () => {
        if (!emailPattern.test(email)) {
            alert('Неправильный Email')
        } else {
            alert('Welcome)')
        }
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Контактная информация</h1>
            <input placeholder='Имя' className={styles.formInput} value={name} onChange={handleChangeName}/>
            <input placeholder='E-mail' className={styles.formInput} value={email} onChange={handleChangeEmail}/>
            <Input country='UA' placeholder='Номер телефона' className={styles.formInput} value={value}
                   onChange={setValue}/>

            {(name === '' || email === '' || value === undefined) ? (
                <label style={{color: 'red'}}>Все поля для ввода обязательны</label>
            ) : null}

            <div className={styles.buttonContainer}>
                <button onClick={onBack} className={styles.button}>Назад</button>
                {(name === '' || email === '' || value === undefined) ? (
                    <button onClick={onBack} className={styles.registerButton} disabled>Загерестрироваться</button>
                ) : (
                    <button onClick={ handleRegister} className={styles.registerButton}>Загерестрироваться</button>
                )}
            </div>


        </div>
    );
}

export default Step2;