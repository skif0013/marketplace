import React, {useState} from 'react';
import Header from "../../components/Header/Header.jsx";
import Step1 from "../../components/Steps/Step1.jsx";
import Step2 from "../../components/Steps/Step2.jsx";

function Sell() {
    const [step, setStep] = useState(1);
    const handleClickNext = () => {
        setStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep))
        console.log(step)

    }

    const handlePrevClick = () => {
        setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep))
        console.log(step)
    }
    return (
        <div>
            <Header/>
            {step === 1 && <Step1 onNext={() => handleClickNext()}/>}
            {step === 2 && <Step2 onBack={() => handlePrevClick() }/>}
        </div>
    );
}

export default Sell;