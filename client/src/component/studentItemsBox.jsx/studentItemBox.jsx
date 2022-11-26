import React from 'react';
import styles from './studentItemBox.module.css';

const StudentItemBox = ({item}) => {

    return(
        <div className={styles.box}>
            <p>{item.name}</p>
            <p>{item.email}</p>
        </div>
    )
}

export default StudentItemBox;