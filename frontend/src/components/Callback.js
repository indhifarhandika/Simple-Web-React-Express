import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Callback = () => {
    const query = useQuery();
  const token = query.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token)
        localStorage.setItem('token', token);
        navigate('/membership');
    }, []);


    return (
        <div>
            Loading...
        </div>
    );
};

export default Callback;
