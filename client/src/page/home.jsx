import React from 'react';
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';

const Home = (props) => {

    return (
        <div>
            <h1>Home</h1>
            <div className="my-5 d-flex justify-content-evenly">
                <img style={{width: "25%", height: "25%"}} src={img1} alt="img1" />
                <img style={{width: "25%", height: "25%"}}src={img2} alt="img2" />
                <img style={{width: "25%", height: "25%"}} src={img3} alt="img3" />
            </div>
        </div>
    )
}

export default Home;