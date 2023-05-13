import { Vacancy } from '@/components/Vacancy/Vacancy';
import styles from './favorities.module.scss';
import not_found from '../../../public/not_found.png';
import Image from 'next/image';
import { PaginationContainer } from '@/components/PagitationContainer/pagitanionContainer';
import React, { useEffect, useState } from 'react';
import { VacancyService } from '@/Http/vacancies';
import Link from 'next/link';
import { LinearProgress } from '@mui/material';
import { VacancyType } from '../../types/mainTypes';
import { itemsPerPage } from '@/components/PagitationContainer/constants';

export default function Favorites() {
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancies, setVacancies] = useState<Array<VacancyType>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isVacancyChanged, setIsVacancyChanged] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const favoritesVacancies = localStorage.getItem('favoritesVacancies');
    if (
      favoritesVacancies &&
      JSON.parse(favoritesVacancies).length !== 0 &&
      isVacancyChanged
    ) {
      const asyncFunc = async () => {
        setIsLoading(true);
        try {
          const vacanciesOnPage = JSON.parse(favoritesVacancies).slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
          const vacanciesArray = await Promise.all(
            vacanciesOnPage.map(async (vacancyId: number) => {
              const { data } = await VacancyService.getVacancyById(vacancyId);
              return {
                id: data.id,
                profession: data.profession,
                payment_from: data.payment_from,
                currency: data.currency,
                schedule: data.type_of_work.title,
                location: data.town.title,
              };
            })
          );
          setVacancies(vacanciesArray);
          setTotalCount(JSON.parse(favoritesVacancies).length);
        } catch (e) {
        } finally {
          setIsLoading(false);
        }
      };
      asyncFunc();
      setIsVacancyChanged(false);
    }
  }, [currentPage, isVacancyChanged]);

  const onChangePage = (value: number) => {
    if (value !== currentPage) {
      setCurrentPage(value);
      setIsVacancyChanged(true);
    }
  };

  const onVacancyDeleteFromFavorites = () => {
    setIsVacancyChanged(true);
  };

  if (isLoading) {
    return (
      <div className={styles.content_centre}>
        <LinearProgress sx={{ width: '100%' }} />
      </div>
    );
  }

  if (vacancies.length === 0) {
    return (
      <div className={styles.not_found_container}>
        <Image alt={'not found'} src={not_found} />
        <p className={styles.not_found_text}>Упс, здесь еще ничего нет!</p>
        <Link href={'vacancies'} className={styles.link_button}>
          Поиск вакансий
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {vacancies.map((vacancy) => {
        return (
          <Vacancy
            vacancy={vacancy}
            key={vacancy.id}
            callback={onVacancyDeleteFromFavorites}
          />
        );
      })}
      {totalCount > itemsPerPage && (
        <div className={styles.pagination}>
          <PaginationContainer
            page={currentPage}
            callback={onChangePage}
            count={totalCount}
          />
        </div>
      )}
    </div>
  );
}
