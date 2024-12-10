import './input.css';

const InputMain = ({ type, placeholder }) => {
   return (
      <>
         <input placeholder={placeholder} type={type} />
      </>
   )
}

export default InputMain;