import styles from './vacancy.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EmptyStartIcon } from '@/components/icons/epmptyStarIcon';
import { FilledStartIcon } from '@/components/icons/filledStarIcon';
import { LocationIcon } from '@/components/icons/locationIcon';
import { PropsType } from './types';

export const Vacancy = ({ vacancy, callback }: PropsType) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (favoritesVacancies) {
      const isVacancyFavorite = JSON.parse(favoritesVacancies).find(
        (id: number) => id === vacancy.id
      );
      if (isVacancyFavorite) {
        setIsFavorite(true);
      }
    }
  }, []);

  const addToFavorites = () => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (favoritesVacancies) {
      const parsedArray = JSON.parse(favoritesVacancies);
      const isVacancyAlreadyAdded = parsedArray.find(
        (id: number) => id === vacancy.id
      );
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
  };

  const removeFromFavorites = () => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (favoritesVacancies) {
      const parsedArray = JSON.parse(favoritesVacancies);
      const vacancyIndex = parsedArray.findIndex(
        (id: number) => id === vacancy.id
      );
      parsedArray.splice(vacancyIndex, 1);
      localStorage.setItem('favoritesVacancies', JSON.stringify(parsedArray));
      setIsFavorite(false);
      if (callback) {
        callback();
      }
    }
  };

  return (
    <div className={styles.vacancy_item}>
      <div className={styles.vacancy_heading}>
        <Link className={styles.vacancy_title} href={`vacancies/${vacancy.id}`}>
          {vacancy.profession}
        </Link>
        {!isFavorite ? (
          <div onClick={addToFavorites}>
            <EmptyStartIcon
              data-elem={`vacancy-${vacancy.id}-shortlist-button`}
            />
          </div>
        ) : (
          <div onClick={removeFromFavorites}>
            <FilledStartIcon
              data-elem={`vacancy-${vacancy.id}-shortlist-button`}
            />
          </div>
        )}
      </div>
      <div className={styles.vacancy_description}>
        <div className={styles.vacancy_salary}>
          з/п{' '}
          {vacancy.payment_from !== 0
            ? `от ${vacancy.payment_from} ${vacancy.currency}`
            : 'не указана'}
        </div>
        <div className={styles.dot}></div>
        <div className={styles.vacancy_workTime}>{vacancy.schedule}</div>
      </div>
      <div className={styles.vacancy_location}>
        <LocationIcon />
        <p>{vacancy.location}</p>
      </div>
    </div>
  );
};
