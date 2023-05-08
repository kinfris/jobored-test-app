import styles from './vacancies.module.scss'
import {CustomSelect} from "@/components/Select/select";
import {NumberInput} from "@/components/NumberInput/numberInput";
import {CustomButton} from "@/components/CustomButton/customButton";
import {InputSearch} from "@/components/SearchInput/searchInput";
import Image from "next/image";
import cross from '../../../public/cross.svg'
import {Vacancy} from "@/components/Vacancy/Vacancy";
import React, {useState} from "react";
import {VacancyService} from "@/Http/vacancies";
import {PaginationContainer} from "@/components/PagitationContainer/pagitanionContainer";
import {LinearProgress} from "@mui/material";


type Props = {
    data: Array<{
        id: number,
        profession: string,
        payment_from: number,
        currency: string,
        schedule: string,
        location: string,
    }>
    vacanciesAmount: number;
}

type StateType = {
    department: { value: string, label: string, isHidden?: boolean, key?: number };
    salaryFrom: string | number;
    salaryTo: string | number;
}

const defaultState: StateType = {
    department: {value: '', label: 'Выберите отрасль', isHidden: true},
    salaryFrom: '',
    salaryTo: '',
}

export default function Vacancies({data, vacanciesAmount}: Props) {
    const [vacancies, setVacancies] = useState(data)
    const [state, setState] = useState(defaultState)
    const [searchingVacancy, setSearchingVacancy] = useState('')
    const [vacanciesCount, setVacanciesCount] = useState(vacanciesAmount);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const applyFilters = async () => {
        setIsLoading(true)
        try {
            const {data} = await VacancyService.getVacancies({
                salaryFrom: state.salaryFrom,
                salaryTo: state.salaryTo,
                catalogues: state.department.key,
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
        setState({
            ...state,
            [name]: value
        })
    }

    const clearAllFilters = async () => {
        setState(defaultState);
        setSearchingVacancy('');
        const {data} = await VacancyService.getVacancies();
        setVacancies(data.objects);
        setVacanciesCount(data.total);
        setCurrentPage(1);
    }

    const searchKeywordHandler = async (value: string) => {
        setSearchingVacancy(value);
        const {data} = await VacancyService.getVacancies({
            salaryFrom: state.salaryFrom,
            salaryTo: state.salaryTo,
            catalogues: state.department.key,
            keyword: value
        });
        setVacancies(data.objects);
        setVacanciesCount(data.total);
        setCurrentPage(1);
    }

    const onChangePage = async (value: number) => {
        if (value !== currentPage) {
            setCurrentPage(value);
            const {data} = await VacancyService.getVacancies({
                salaryFrom: state.salaryFrom,
                salaryTo: state.salaryTo,
                catalogues: state.department.key,
                keyword: searchingVacancy,
                page: value,
            });
            setVacancies(data.objects);
            setVacanciesCount(data.total);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <div className={styles.heading_container}>
                    <p className={styles.filters_heading}>Фильтры</p>
                    <div className={styles.clear} onClick={clearAllFilters}>
                        <p>Сбросить все</p>
                        <Image src={cross} alt={''}/>
                    </div>
                </div>
                <div className={styles.filters_item}>
                    <p className={styles.filters_type}>Отрасль</p>
                    <div className={styles.select_wrapper}>
                        <CustomSelect name={'department'} value={state.department} callback={changeStateValue}/>
                    </div>
                </div>
                <div className={styles.filters_item}>
                    <p className={styles.filters_type}>Оклад</p>
                    <NumberInput title={'От'} name={'salaryFrom'} value={state.salaryFrom} callback={changeStateValue}/>
                    <NumberInput title={'До'} name={'salaryTo'} value={state.salaryTo} callback={changeStateValue}/>
                </div>
                <CustomButton content='Применить' callback={applyFilters} fullwidth/>
            </div>
            <div className={styles.vacancies_container}>
                <InputSearch callback={searchKeywordHandler}/>
                {isLoading
                    ? <LinearProgress sx={{width: "100%"}}/>
                    : <div className={styles.vacancies_wrapper}>{vacancies.map(vacancy => {
                        return (
                            <div key={vacancy.id}>
                                {
                                    vacancy && <Vacancy vacancy={vacancy}/>
                                }
                            </div>
                        )
                    })}
                        {vacanciesAmount > 4 &&
                            <div className={styles.pagination}><PaginationContainer page={currentPage}
                                                                                    count={vacanciesCount}
                                                                                    callback={onChangePage}/></div>}
                    </div>}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
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
    const vacanciesAmount = response.data.total;


    return {props: {data, vacanciesAmount}}
}
