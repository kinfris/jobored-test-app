import styles from './vacancy.module.scss'
import Link from "next/link";
import Image from "next/image";
import location from "../../../public/location.svg";
import {useEffect, useState} from "react";

type Props = {
    vacancy: {
        id: number,
        profession: string,
        payment_from: number,
        currency: string,
        schedule: string,
        location: string,
    },
    callback?: () => void;
}

const EmptyStartIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={styles.empty_star}>
            <path
                d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z"
                stroke="currentColor" strokeWidth="1.5"/>
        </svg>
    )
}

const FilledStartIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={styles.star}>
            <path
                d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z"
                fill="currentColor" stroke="#5E96FC" strokeWidth="1.5"/>
        </svg>
    )
}

export function Vacancy({vacancy, callback}: Props) {
    const [isFavorite, setIsFavorite] = useState(false)
    useEffect(() => {
        const favoritesVacancies = localStorage.getItem('favoritesVacancies');
        if (favoritesVacancies) {
            const isVacancyFavorite = JSON.parse(favoritesVacancies).find((id: number) => id === vacancy.id);
            if (isVacancyFavorite) {
                setIsFavorite(true);
            }
        }
    }, [])

    const addToFavorites = () => {
        const favoritesVacancies = localStorage.getItem('favoritesVacancies');
        if (favoritesVacancies) {
            const parsedArray = JSON.parse(favoritesVacancies);
            const isVacancyAlreadyAdded = parsedArray.find((id: number) => id === vacancy.id);
            if (isVacancyAlreadyAdded) {
                return;
            }
            parsedArray.push(vacancy.id);

            localStorage.setItem('favoritesVacancies', JSON.stringify(parsedArray));
            setIsFavorite(true);
        } else {
            localStorage.setItem('favoritesVacancies', JSON.stringify([vacancy.id]));
            setIsFavorite(true);
        }
    }

    const removeFromFavorites = () => {
        const favoritesVacancies = localStorage.getItem('favoritesVacancies');
        if (favoritesVacancies) {
            const parsedArray = JSON.parse(favoritesVacancies);
            const vacancyIndex = parsedArray.findIndex((id: number) => id === vacancy.id);
            parsedArray.splice(vacancyIndex, 1);
            localStorage.setItem('favoritesVacancies', JSON.stringify(parsedArray));
            setIsFavorite(false);
            if(callback){
                callback()
            }
        }
    }

    return (
        <div className={styles.vacancy_item}>
            <div className={styles.vacancy_heading}>
                <Link className={styles.vacancy_title}
                      href={`vacancies/${vacancy.id}`}>{vacancy.profession}</Link>
                {!isFavorite ? <div onClick={addToFavorites}><EmptyStartIcon/></div> :
                    <div onClick={removeFromFavorites}><FilledStartIcon/></div>}
            </div>
            <div className={styles.vacancy_description}>
                <div
                    className={styles.vacancy_salary}>з/п {vacancy.payment_from !== 0 ? `от ${vacancy.payment_from} ${vacancy.currency}` : 'не указана'}</div>
                <div className={styles.dot}></div>
                <div className={styles.vacancy_workTime}>{vacancy.schedule}</div>
            </div>
            <div className={styles.vacancy_location}>
                <Image src={location} alt={''}/>
                <p>{vacancy.location}</p>
            </div>
        </div>
    )
}
