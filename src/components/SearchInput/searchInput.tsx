import search from '../../../public/search.svg'
import Image from 'next/image'
import styles from './searchInput.module.scss'
import {ChangeEvent, useState} from "react";
import {CustomButton} from "@/components/CustomButton/customButton";

type PropsType = {
    callback: (value: string) => void;

}

export function InputSearch({callback}: PropsType) {
    const [state, setState] = useState('');
    const [isActive, setIsActive] = useState(false);
    const onInputFocus = () => {
        setIsActive(true)
    }

    const onInputBlur = () => {
        setIsActive(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value)
    }

    const onSearchHandle = () => {
        callback(state)
    }

    return (
        <div className={`${styles.wrapper} ${isActive && styles.wrapper_active}`}>
            <div className={styles.input_container}>
                <Image src={search} alt=''/>
                <input className={styles.input} placeholder='Введите название вакансии' onClick={onInputFocus}
                       onBlur={onInputBlur} value={state} onChange={onChangeHandler}/>
            </div>
            <CustomButton content='Поиск' callback={onSearchHandle}/>
        </div>
    );
}
