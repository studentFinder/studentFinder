import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import {Stack} from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ItemBox from '../component/ItemBox/itemBox';
import SelectBox from '../component/SelectBox/selectBox';
import { useAuth } from '../context/AuthContent';
import courseItems from '../data/courseItems.json';
import depItems from '../data/depItems.json';
import useOnError from '../hook/useOnError';




const CourseList = ({dataService}) => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const params = useParams();

    const search = searchParams.get('search');

    const auth = useAuth().user;



    const [error, onError] = useOnError('');

    const [departments, setDepartments] = useState([]);
    //const [departments, setDepartments] = useState(depItems);

    const [depId, setDepId] = useState(params.departmentId);

    const [courses, setCourses] = useState([]);
    //const [courses, setCourses] = useState(courseItems);

    useEffect(() => {
        setDepId(params.departmentId);
    }, [params]);

    useEffect(() => {
        dataService
        .getDepartments()
        .then((departments) => setDepartments([...departments]))
        .catch(onError);
    }, [dataService]);

    const handleSelect = (depId) => {
        navigate(`/courses/departments/${depId}?search=${search}`);
        setDepId(depId);
    }

    useEffect(() => {
        depId?
        dataService
        .getCourseswithDepartment(depId, search)
        .then((courses) => setCourses([...courses]))
        .catch(onError)
        :
        dataService
        .getCourses(search)
        .then((courses) => setCourses([...courses]))
        .catch(onError);
        
    
    }, [dataService, search, depId]);




    const filteredItems = courses;


    return (
        <>
            <h1>
                {
                    (depId == 0 || !depId) && search === "" ?
                    `All Courses.`:
                    courses.length === 0 ?
                    `No courses with "${search}" in their name.`:
                    `${courses.length} courses with "${search}" in their name.`
                    
                }
            </h1>
            <div>
                <SelectBox
                name="department" 
                id="department-select" 
                items={departments}
                handleSelect={handleSelect}
                selectedValue={depId}
                />
            </div>
            {
                filteredItems &&
                <Stack gap={4}>
                    {filteredItems.map(i => (
                    <ItemBox key={i.id} 
                    item={i} 
                    dataService={dataService}
                    auth={auth}
                    />))}
                </Stack>
            }
        </>
    )
}

export default CourseList;