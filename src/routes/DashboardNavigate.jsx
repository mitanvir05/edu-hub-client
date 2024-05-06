import React from 'react';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';

const DashboardNavigate = () => {
    const {currentUser, isLoading}=useUser()
    const role = currentUser?.role
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(role ==='admin')return<Navigate to ="/dashboard/admin-home"/>
    if(role ==='instructor')return<Navigate to ="/dashboard/instructor-cp"/>
    if(role ==='user')return<Navigate to ="/dashboard/student-cp"/>
    return (
        <div>
            jghj
        </div>
    );
};

export default DashboardNavigate;