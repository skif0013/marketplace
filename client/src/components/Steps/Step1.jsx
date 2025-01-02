import React, { useState } from 'react';
import styles from './steps.module.css';

function Step1({ onNext }) {
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [isShop, setIsShop] = useState(false);
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(\/[^\s]*)?$/;

    const handleShopNameChange = (event) => {
        setShopName(event.target.value);
    };

    const handleShopAddressChange = (event) => {
        setShopAddress(event.target.value)
    };

    const handleRadioChange = () => {
        setIsShop((prevIsShop) => !prevIsShop);
    };

    const handleNextClick = () => {
        if (!isShop && !urlPattern.test(shopAddress)) {
            alert('Неправильный ввод ссылки....')
            return
        }
        onNext();
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Данные о магазине</h1>

            <input
                placeholder="Название вашего магазина"
                className={styles.formInput}
                value={shopName}
                onChange={handleShopNameChange}
            />

            <input
                placeholder="Адрес магазина"
                type='url'
                className={styles.formInput}
                value={shopAddress}
                onChange={handleShopAddressChange}
                disabled={isShop}
            />

            <div className={styles.radioBtnContainer}>
                <input
                    type="checkbox"
                    checked={isShop}
                    onChange={handleRadioChange}
                />
                <label>У меня нет магазина</label>
            </div>

            {shopName === '' || (!isShop && shopAddress === '') ? (
                <label style={{ color: 'red' }}>Все поля для ввода обязательны</label>
            ) : null}

            {shopName === '' || (!isShop && shopAddress === '') ?
                <button className={styles.button} onClick={handleNextClick} disabled>
                  Дальше
                </button> :
                <button className={styles.button} onClick={handleNextClick}>
                    Дальше
                </button>
        }
        </div>
    );
}

export default Step1;
