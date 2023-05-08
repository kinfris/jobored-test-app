import styles from './customButton.module.scss'

type Props = {
    content: string;
    callback: () => void;
    fullwidth?: boolean;
}

export function CustomButton({content, callback, fullwidth = false}: Props) {
    return (
        <button className={`${styles.button} ${fullwidth && styles.fullwidth}`} onClick={callback}>
            {content}
        </button>
    )
}
