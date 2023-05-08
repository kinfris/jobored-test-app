import styles from './numberInput.module.scss'
import {ChangeEvent, useState} from "react";
import {KeyboardArrowUpRounded, KeyboardArrowDownRounded} from '@mui/icons-material';

type PropsType = {
    title: string;
    name: string;
    value: string | number;
    callback: (name: string, value: string | number) => void;
}

export function NumberInput({title, name, value, callback}: PropsType) {
    const [isActive, setIsActive] = useState(false);

    const onInputFocus = () => {
        setIsActive(true)
    }

    const onInputBlur = () => {
        setIsActive(false)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        const re = /\D/;
        if (!re.test(value)) {
            callback(name, +value)
        }
    }

    const increment = () => {
        callback(name, +value + 1)
    }
    const decrement = () => {
        if (+value > 0) {
            callback(name, +value - 1)
        }
    }

    return (
        <div className={`${styles.wrapper} ${isActive && styles.wrapper_active}`}>
            <input className={styles.input} placeholder={title} onClick={onInputFocus}
                   onBlur={onInputBlur} value={value} onChange={onChangeHandler}/>
            <div className={styles.buttons_wrapper}>
                <KeyboardArrowUpRounded onClick={increment} className={styles.arrow}/>
                <KeyboardArrowDownRounded onClick={decrement} className={styles.arrow}/>
            </div>
        </div>
    );
}
