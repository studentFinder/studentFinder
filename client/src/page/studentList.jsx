import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StudentItemBox from '../component/studentItemsBox.jsx/studentItemBox';
import stuItems from '../data/studentItems.json';
import useOnError from '../hook/useOnError';

const buttonStyle = {


    width: "50%",
    height: "2.5rem",
    fontWeight: "700",
    fontSize: "1rem",
    borderRadius: "50px",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
}



const StudentList = ({dataService}) => {

    const params = useParams();
    const courseId = params.courseId;

    const [error, onError] = useOnError('');
    const [joined, setJoined] = useState(false);
    const [courseInfo, setCourseInfo] = useState();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        dataService
        .getStudents(courseId)
        .then((students) => setStudents([...students]))
        .catch(onError);
    }, [dataService, joined]);

    // useEffect(() => {
    //     console.log(courseInfo.name);
    // }, [courseInfo])


    useEffect(() => {
        dataService
        .getJoinInfo(courseId)
        .then((data) => data && setJoined(true))
        .catch(onError);

        dataService
        .getCourseInfo(courseId)
        .then((courseInfo) => setCourseInfo(courseInfo))
        .catch(onError);
    }, [dataService]);





    const handleClick = () => {
        if(joined) {
            dataService
            .deleteJoin(courseId)
            .then(() => setJoined(false))
            .catch(onError);

        }else {
            dataService
            .postJoin(courseId)
            .then(() => setJoined(true))
            .catch(onError);
        }
        
    }
    
    return (
        <div>
            <h1>
                {courseInfo && courseInfo.name}
            </h1>
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
                    />))}
                </Stack>
            }
        </div>
    );
}

export default StudentList;