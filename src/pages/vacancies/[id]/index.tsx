import styles from './vacancy.module.scss';
import { VacancyService } from '@/Http/vacancies';
import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { FilledStartIcon } from '@/components/Icons/filledStarIcon';
import { EmptyStartIcon } from '@/components/Icons/epmptyStarIcon';
import { LocationIcon } from '@/components/Icons/locationIcon';
import { VacancyWithDescriptionType } from '@/types/mainTypes';

export default function Vacancy() {
  const [vacancy, setVacancy] = useState<VacancyWithDescriptionType | null>(
    null
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const id = router.query.id ? +router.query.id : null;
    if (!id) {
      setIsLoading(false);
    } else {
      (async () => {
        try {
          const { data } = await VacancyService.getVacancyById(id);
          if (data) {
            setVacancy({
              id: data.id,
              profession: data.profession,
              payment_from: data.payment_from,
              currency: data.currency,
              schedule: data.type_of_work.title,
              location: data.town.title,
              description: data.vacancyRichText,
            });
          }
        } catch (e) {
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [router.query.id]);

  useEffect(() => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (favoritesVacancies) {
      const isVacancyFavorite = JSON.parse(favoritesVacancies).find(
        (id: number) => id === vacancy?.id
      );
      if (isVacancyFavorite) {
        setIsFavorite(true);
      }
    }
  }, [vacancy]);

  const addToFavorites = () => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (favoritesVacancies) {
      const parsedArray = JSON.parse(favoritesVacancies);
      const isVacancyAlreadyAdded = parsedArray.find(
        (id: number) => id === vacancy?.id
      );
      if (isVacancyAlreadyAdded) {
        return;
      }
      parsedArray.push(vacancy?.id);
      localStorage.setItem('favoritesVacancies', JSON.stringify(parsedArray));
      setIsFavorite(true);
    } else {
      localStorage.setItem('favoritesVacancies', JSON.stringify([vacancy?.id]));
      setIsFavorite(true);
    }
  };

  const removeFromFavorites = () => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (favoritesVacancies) {
      const parsedArray = JSON.parse(favoritesVacancies);
      const vacancyIndex = parsedArray.findIndex(
        (id: number) => id === vacancy?.id
      );
      parsedArray.splice(vacancyIndex, 1);
      localStorage.setItem('favoritesVacancies', JSON.stringify(parsedArray));
      setIsFavorite(false);
    }
  };
  if (isLoading) {
    return (
      <div className={styles.content_centre}>
        <LinearProgress sx={{ width: '100%' }} />
      </div>
    );
  }

  if (!vacancy) {
    return <div className={styles.content_centre}>Not found</div>;
  }

  return (
    <div>
      <div className={styles.vacancy_item} key={vacancy.id}>
        <div className={styles.vacancy_heading}>
          <div className={styles.vacancy_title}>{vacancy.profession}</div>
          {!isFavorite ? (
            <button
              onClick={addToFavorites}
              data-elem={`vacancy-${vacancy.id}-shortlist-button`}
            >
              <EmptyStartIcon />
            </button>
          ) : (
            <button
              onClick={removeFromFavorites}
              data-elem={`vacancy-${vacancy.id}-shortlist-button`}
            >
              <FilledStartIcon />
            </button>
          )}
        </div>
        <div className={styles.vacancy_description}>
          <div className={styles.vacancy_salary}>
            з/п от {vacancy.payment_from} {vacancy.currency}
          </div>
          <div className={styles.dot}></div>
          <div className={styles.vacancy_workTime}>{vacancy.schedule}</div>
        </div>
        <div className={styles.vacancy_location}>
          <LocationIcon />
          <p>{vacancy.location}</p>
        </div>
      </div>
      <div
        className={styles.vacancy_full_description}
        dangerouslySetInnerHTML={{
          __html: vacancy.description.replace(/<br\s*\/?>/g, ''),
        }}
      ></div>
    </div>
  );
}
