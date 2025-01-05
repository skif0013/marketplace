import {useEffect, useState} from "react";

function UseFormData() {
    const getInitialData = () => {
        const savedData = localStorage.getItem('formData')
        return savedData ? JSON.parse(savedData) : {
            shopName: '',
            shopAddress: '',
            name: '',
            email: '',
            position: '',
        }
    }

    const [formData, setFormData] = useState(getInitialData)

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const updateFormData = (newData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    }

    const clearFormData = () => {
        setFormData({
            shopName: '',
            shopAddress: '',
            name: '',
            email: '',
            position: '',
        })
    }

    return {formData, updateFormData, clearFormData}
}

export default UseFormData;