import React, { memo } from 'react'
import styles from './grid.module.css'



const Grid = memo(() => {
    return (
        <div  className={styles.host}>
            <div className={styles.container}>
                <div className={`${styles.dot} ${styles['dot--1']}`}/>
                <div className={`${styles.dot} ${styles['dot--2']}`}/>
                <div className={`${styles.dot} ${styles['dot--3']}`}/>
                <div className={`${styles.dot} ${styles['dot--4']}`}/>
                <div className={`${styles.dot} ${styles['dot--5']}`}/>
                <div className={`${styles.dot} ${styles['dot--6']}`}/>
                <div className={`${styles.dot} ${styles['dot--7']}`}/>
                <div className={`${styles.dot} ${styles['dot--8']}`}/>
                <div className={`${styles.dot} ${styles['dot--9']}`}/>
                <div className={`${styles.dot} ${styles['dot--10']}`}/>
                <div className={`${styles.dot} ${styles['dot--11']}`}/>
                <div className={`${styles.dot} ${styles['dot--12']}`}/>
                <div className={`${styles.dot} ${styles['dot--13']}`}/>
                <div className={`${styles.dot} ${styles['dot--14']}`}/>
                <div className={`${styles.dot} ${styles['dot--15']}`}/>
                <div className={`${styles.dot} ${styles['dot--16']}`}/>
            </div>
        </div>
    )
})

Grid.displayName = 'Grid'

export default Grid