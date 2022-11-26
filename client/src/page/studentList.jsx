import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StudentItemBox from '../component/studentItemsBox.jsx/studentItemBox';
import stuItems from '../data/studentItems.json';

const buttonStyle = {


    width: "50%",
    height: "2.5rem",
    fontWeight: "700",
    fontSize: "1rem",
    borderRadius: "50px",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
}



const StudentList = ({dataService, accountService}) => {

    const params = useParams();

    const [joined, setJoined] = useState(false);


    //const [students, setStudents] = useState([]);
    const [students, setStudents] = useState(stuItems.filter(e => e.courseId == params.courseId));

    //student joined course data랑
    //student info 정보 따로 가져와야함.


    const handleClick = () => {
        console.log("Joined!");
        setJoined(true);
    }
    
    return (
        <div>
            <div className="d-flex justify-content-center mb-3">
                <Button 
                style={buttonStyle}
                variant={!joined?"primary":"success"}
                onClick={handleClick}>
                    {!joined?"Join": "Joined"}
                </Button>
            </div>
            {
                students &&
                <Stack gap={4}>
                    {students.map(i => (<StudentItemBox key={i.id} item={i} 
                    dataService={dataService}
                    accountService={accountService}/>))}
                </Stack>
            }
        </div>
    );
}

export default StudentList;