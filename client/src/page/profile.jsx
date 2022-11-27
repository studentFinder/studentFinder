import React, { useState } from 'react';
import { useEffect } from 'react';
import depItems from '../data/depItems.json';
import { Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useOnError from '../hook/useOnError';
import { useAuth } from '../context/AuthContent';
import ItemBox from '../component/ItemBox/itemBox';
import courseItems from '../data/courseItems.json';
import SelectBox from '../component/SelectBox/selectBox';
import ProfileBox from '../component/profileBox/profileBox';
import user_info from '../data/user.json';

const Profile = ({dataService}) => {


    
    const navigate = useNavigate();
    const auth = useAuth().user;

    const [error, onError] = useOnError('');
    const params = useParams();
    

    
    const [departments, setDepartments] = useState(depItems);
    const [courses, setCourses] = useState(courseItems);
    const [userInfo, setUserInfo] = useState([]);

    const [department, setDepartment] = useState();


    const handleSelectDep = (dep) => {
        navigate(`/courses/account/profile/departments/${dep}`);
    }

    useEffect(() => {
        setDepartment(params.departmentId);
    }, [params]);

    useEffect(() => {
        console.log(department);
    }, [department])


    
    useEffect(() => {
        dataService
        .getUserInfo()
        .then((userInfo) => setUserInfo(userInfo))
        .catch(onError);

    }, [dataService]);


    useEffect(() => {
        department?
        dataService
        .getJoinedCourseswithDepartment(department)
        .then((i) => setCourses(i))
        .catch(onError)
        :
        dataService
        .getJoinedCourses()
        .then((i) => setCourses(i))
        .catch(onError);
    }, [dataService, department]);




    return (
        <div>
            {userInfo && <ProfileBox userInfo={userInfo}/>}
            <SelectBox 
            name="department" 
            id="department-select" 
            items={departments}
            handleSelect={handleSelectDep}
            selectedValue={department}
            />
            {
                courses && 
                <Stack gap={4}>
                {courses.map(item => (
                    <ItemBox
                    key={item.id} 
                    item={item} 
                    course={courses.find(i => i.id == item.courseId)}
                    auth={auth}
                    dataService={dataService} />
                ))}
                </Stack>
            }
        </div>
    )
}

export default Profile;