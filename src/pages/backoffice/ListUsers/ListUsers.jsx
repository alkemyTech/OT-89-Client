import React from 'react';
import apiService from '../../../services/server';

export const ListUsers = () => {

    React.useEffect(async () => {
        try{
            const users = await apiService.get("/users/");
        }
        catch(e){
            console.log(e.response.data);
        }
    }, []);

    return(
        <div>

        </div>
    );
};