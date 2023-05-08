import Image from "next/image";
import logo from "../../../public/Logo.png";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from './layout.module.scss'
import {ReactNode} from "react";

interface Props {
    children?: ReactNode;
}

const links = [
    {
        "link": "vacancies",
        "label": "Поиск вакансий"
    },
    {
        "link": "favorites",
        "label": "Избранное"
    },
]

export function Layout({children}: Props) {
    const router = useRouter();

    const items = links.map((link) => {
        const routeName = router.pathname.split('/')[1]
        return (
            <Link href={`/${link.link}`} key={link.label}
                  className={`${styles.link} ${routeName === link.link && styles.active_link}`}>
                {link.label}
            </Link>
        )
    });
    return (
        <>
            <div className={styles.root}>
                <div className={styles.header}>

                    <div className={styles.logo}>
                        <Image src={logo} alt={''}/>
                        Jobored
                    </div>

                    <div className={styles.links}>
                        {items}
                    </div>

                </div>
            </div>
            <div className={styles.main_container}>
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </>
    )
}