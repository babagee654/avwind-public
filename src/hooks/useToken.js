import React from 'react';

export default function useToken() {

    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }

    const [token, setToken] = React.useState(getToken());


    function saveToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(getToken())
    }

    return {
        saveToken: saveToken,
        token
    }
}