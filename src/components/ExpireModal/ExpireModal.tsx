import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ExpireModal.scss';



const ExpireModal: FC = () => {

    const navigate = useNavigate()

    return (
        <div className="modal">
            <div className="modal__content">
                <p className="modal__title">Session expired!</p>
                <p className="modal__text">Page will be refreshed because time has expired</p>
                <button className="modal__button" onClick={() => navigate(-1)}>OK</button>
            </div>
        </div>
    )
}

export default ExpireModal
