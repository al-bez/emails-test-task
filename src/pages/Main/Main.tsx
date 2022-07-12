import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface MainProps {
    isAuth: boolean;
}

const Main: FC<MainProps> = ({ isAuth }) => {
    return (
        <div>
            {
                isAuth ? <Navigate to="/leads" /> : <Navigate to="/login" />
            }
        </div>
    )
}

export default Main