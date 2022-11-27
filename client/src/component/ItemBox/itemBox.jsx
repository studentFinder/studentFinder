import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './itemBox.module.css';
import useOnError from '../../hook/useOnError';

const ItemBox = ({item, auth, dataService}) => {

    const navigate = useNavigate();
    const [studentsNum, setStudentsNum] = useState();
    const [error, onError] = useOnError('');

    useEffect(() => {
        dataService
        . getStudentsNum(item.id)
        .then((num) => setStudentsNum([...num]))
        .catch(onError);
    
    }, [dataService, item]);

    useEffect(() => {
        console.log(studentsNum&&studentsNum[0]?studentsNum[0].studentNum:0);
    })



    

    const handleClick = () => {
        if(!auth) return;

        navigate(`/courses/${item.id}`);
    }

    return (
        <div>
            <div className={styles.box} onClick={handleClick}>
                <p>{item.name}</p>
                <p>Number of Students joined: {studentsNum&&studentsNum[0]?studentsNum[0].studentNum:0} </p>
            </div>
        </div>
    )
}

export default ItemBox;