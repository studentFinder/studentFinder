import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './itemBox.module.css';

const ItemBox = ({item}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(true);

    const handleClick = () => {
        if(!user) return;
        
        navigate(`/courses/${item.id}`);
    }

    return (
        <div>
            <div className={styles.box} onClick={handleClick}>
                <p>{item.name}</p>
                <p>Number of Students joined: </p>
            </div>
        </div>
    )
}

export default ItemBox;