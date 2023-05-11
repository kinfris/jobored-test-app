import styles from './vacancies.module.scss'
import {NumberInput} from "@/components/NumberInput/numberInput";
import {CustomButton} from "@/components/CustomButton/customButton";
import {InputSearch} from "@/components/SearchInput/searchInput";
import Image from "next/image";
import {Vacancy} from "@/components/Vacancy/Vacancy";
import React, {useEffect, useState} from "react";
import {VacancyService} from "@/Http/vacancies";
import {PaginationContainer} from "@/components/PagitationContainer/pagitanionContainer";
import {LinearProgress} from "@mui/material";
import not_found from "../../../public/not_found.png";
import {CrossIcon} from "@/components/icons/crossIcon";
import {MySelect} from "@/components/MySelect/mySelect";


type VacancyType = {
    id: number;
    profession: string;
    payment_from: number;
    currency: string;
    schedule: string;
    location: string;
}

type FiltersType = {
    department: { label: string, isHidden?: boolean, key?: number };
    salaryFrom: string | number;
    salaryTo: string | number;
}

const defaultFilters: FiltersType = {
    department: {label: 'Выберите отрасль', isHidden: true},
    salaryFrom: '',
    salaryTo: '',
}

export default function Vacancies() {
    const [vacancies, setVacancies] = useState<Array<VacancyType> | null>(null)
    const [filters, setFilters] = useState(defaultFilters)
    const [searchingVacancy, setSearchingVacancy] = useState('')
    const [vacanciesCount, setVacanciesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltersOpened, setIsFiltersOpened] = useState(false);

    useEffect(() => {
        const asyncFunc = async () => {
            setIsLoading(true)
            try {
                const response = await VacancyService.getVacancies();
                const data = response.data.objects.map((vacancyDescription: any) => {
                    return {
                        id: vacancyDescription.id,
                        profession: vacancyDescription.profession,
                        payment_from: vacancyDescription.payment_from,
                        currency: vacancyDescription.currency,
                        schedule: vacancyDescription.type_of_work.title,
                        location: vacancyDescription.town.title,
                    }
                })
                setVacancies(data);
                setVacanciesCount(response.data.total);
            } catch (e) {

            } finally {
                setIsLoading(false)
            }
        }
        asyncFunc()
    }, [])

    const applyFilters = async () => {
        setIsLoading(true)
        try {
            const {data} = await VacancyService.getVacancies({
                salaryFrom: filters.salaryFrom,
                salaryTo: filters.salaryTo,
                catalogues: filters.department.key,
                keyword: searchingVacancy
            });
            setVacancies(data.objects);
            setVacanciesCount(data.total);
            setCurrentPage(1);
        } catch (e) {

        } finally {
            setIsLoading(false)
        }


    }

    const changeStateValue = (name: string, value: string | number) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const clearAllFilters = async () => {
        setIsLoading(true);
        try {
            const {data} = await VacancyService.getVacancies();
            setVacancies(data.objects);
            setVacanciesCount(data.total);
            setCurrentPage(1);
            setFilters(defaultFilters);
            setSearchingVacancy('');
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    const searchKeywordHandler = async (value: string) => {
        setIsLoading(true);
        try {
            setSearchingVacancy(value);
            const {data} = await VacancyService.getVacancies({
                salaryFrom: filters.salaryFrom,
                salaryTo: filters.salaryTo,
                catalogues: filters.department.key,
                keyword: value
            });
            setVacancies(data.objects);
            setVacanciesCount(data.total);
            setCurrentPage(1);
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    const onChangePage = async (value: number) => {
        if (value !== currentPage) {
            setCurrentPage(value);
            const {data} = await VacancyService.getVacancies({
                salaryFrom: filters.salaryFrom,
                salaryTo: filters.salaryTo,
                catalogues: filters.department.key,
                keyword: searchingVacancy,
                page: value,
            });
            setVacancies(data.objects);
            setVacanciesCount(data.total);
        }
    }

    const closeFilters = () => {
        setIsFiltersOpened(false)
    }

    const openFilters = () => {
        setIsFiltersOpened(true)
    }


    const VacanciesWrapper = () => {
        return (
            <>
                {!vacancies || vacancies.length === 0
                    ? <div className={styles.not_found}>
                        <Image alt={'not found'} src={not_found}/>
                        <p className={styles.not_found_text}>Упс, вакансий с такими параметрами не найдено!</p>
                    </div>
                    : <div className={styles.vacancies_wrapper}>{vacancies.map(vacancy => {
                        return (
                            <div key={vacancy.id}>
                                {
                                    vacancy && <Vacancy vacancy={vacancy} data-elem={`vacancy-${vacancy.id}`}/>
                                }
                            </div>
                        )
                    })}
                        {vacanciesCount > 4 &&
                            <div className={styles.pagination}><PaginationContainer page={currentPage}
                                                                                    count={vacanciesCount}
                                                                                    callback={onChangePage}/></div>}
                    </div>}

            </>
        )
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.filters} ${isFiltersOpened && styles.is_filters_opened}`}>
                <div className={styles.heading_container}>
                    <p className={styles.filters_heading}>Фильтры</p>
                    <div className={styles.clear} onClick={clearAllFilters}>
                        <p>Сбросить все</p>
                        <CrossIcon/>
                    </div>
                </div>
                <div className={styles.filters_item}>
                    <p className={styles.filters_type}>Отрасль</p>
                    <div className={styles.select_wrapper}>
                        <MySelect name={'department'} value={filters.department} callback={changeStateValue}/>
                    </div>
                </div>
                <div className={styles.filters_item}>
                    <p className={styles.filters_type}>Оклад</p>
                    <NumberInput title={'От'} name={'salaryFrom'} value={filters.salaryFrom}
                                 callback={changeStateValue}/>
                    <NumberInput title={'До'} name={'salaryTo'} value={filters.salaryTo}
                                 callback={changeStateValue}/>
                </div>
                <CustomButton content='Применить' callback={applyFilters} fullwidth/>
                <div className={styles.open_close_filters_btn}><CustomButton content='Закрыть фильтры' callback={closeFilters} fullwidth/></div>
            </div>
            <div className={styles.vacancies_container}>
                <InputSearch callback={searchKeywordHandler}/>
                <div className={styles.open_close_filters_btn}><CustomButton content='Фильтры' callback={openFilters}/></div>
                {isLoading
                    ? <LinearProgress sx={{width: "100%"}}/>
                    : <VacanciesWrapper/>}
            </div>
        </div>
    )
}
