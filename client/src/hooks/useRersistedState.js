import {useEffect, useState} from "react";


function useRersistedState(key, initialValue) {
    const [state, setState] = useState(() => {
        const savedValue = localStorage.getItem(key)
        return savedValue ? JSON.parse(savedValue) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state]);

    return [state, setState]
}

export default useRersistedState;