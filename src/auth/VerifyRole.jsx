import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt from 'jsonwebtoken';

function VerifyRole() {

    const token = localStorage.getItem('credentials')
    const decoded = jwt.decode(token); 

    if(decoded.role !== 'stocker'){
        alert('MULTOSKY MULTOSKY! You are not a stocker...')
        return <Navigate to={'/dashboard'}></Navigate>
    }

    return <Outlet/>

}

export default VerifyRole;
