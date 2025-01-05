import React, { useState } from 'react';
import styles from "./steps.module.css";
import axios from "axios";
import useFormData from "../../hooks/useFormData.js";
import {useNavigate} from "react-router-dom";

function Step2({ onBack}) {
    const {formData, updateFormData, clearFormData} = useFormData()
    const [name, setName] = useState(formData.name);
    const [email, setEmail] = useState(formData.email);
    const [position, setPosition] = useState(formData.position);
    const navigate = useNavigate()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChangeName = (e) => {
        setName(e.target.value);
        updateFormData({name: e.target.value})
    };

    const handleChangePosition = (e) => {
        setPosition(e.target.value);
        updateFormData({position: e.target.value})
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        updateFormData({email: e.target.value})
    };

    const handleClearFields = () => {
        clearFormData()
    }

    const handleRegister = async () => {
        if (!emailPattern.test(email)) {
            alert('Неправильный Email');
            return;
        }

        try {
            const response = await axios.post('https://marketplace-800v.onrender.com/api/Admin/FormForSeller', {
                name,
                email,
                position,
                CompanyName: formData.shopName,
                WebsiteLink: formData.shopAddress,
            }, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log(response.data);
            alert('Добро пожаловать!');
            handleClearFields()
            navigate('/api/product');

        } catch (e) {
            console.error(e.response ? e.response.data : e);
            alert('Извините, ошибка. Повторите еще раз');
        }
    };

    const isFormValid = name && email && position; // Перевірка на валідність форми

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Контактная информация</h1>
            <input
                placeholder='Имя'
                className={styles.formInput}
                value={name}
                onChange={handleChangeName}
            />
            <input
                placeholder='Позиция'
                className={styles.formInput}
                value={position}
                onChange={handleChangePosition}
            />
            <input
                placeholder='E-mail'
                className={styles.formInput}
                value={email}
                onChange={handleChangeEmail}
            />

            {(name === '' || email === '' || position === '') && (
                <label style={{ color: 'red' }}>Все поля для ввода обязательны</label>
            )}

            <div className={styles.buttonContainer}>
                <button onClick={onBack} className={styles.button}>Назад</button>
                <button
                    onClick={handleRegister}
                    className={styles.registerButton}
                    disabled={!isFormValid} // Кнопка буде недоступною, якщо форма не заповнена

                >
                    Загерестрироваться
                </button>
            </div>
        </div>
    );
}

export default Step2;
