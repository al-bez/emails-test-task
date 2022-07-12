import React, { FC, useEffect, useState, useContext } from 'react'
import { Button, ExpireModal, Lead } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import emails from '../../static-data/emails.json'

import IMail from '../../types/Mail';
import './Leads.scss'

interface LeadsProps {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    user: { name: string, index: number };
}


const Leads: FC<LeadsProps> = ({ setIsAuth, isAuth, user }) => {

    // set 120 secods as default
    const [time, setTime] = useState<number>(120);

    // get mails from local storage
    //@ts-ignore
    let mails: IMail[] = JSON.parse(localStorage.getItem('emails')) || []

    // get mail index (the closest mail with "pending" status)
    const getIndexMail = () => {
        for (let i = 0; i < mails.length; i++) {
            if (mails[i].status === "pending") {
                return i
            }
        }

        return -1
    }

    // generate index
    const indexMail: number = getIndexMail()


    const onExit = (): void => {
        localStorage.setItem('lastUser', '');
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users[user.index].status = "inactive"
        localStorage.setItem('users', JSON.stringify(users))
        setIsAuth(false)
    }


    const onReply = (status: string, refreshTime: boolean = true): void => {
        const localMails: IMail[] = [...mails]
        localMails[indexMail].status = status
        localMails[indexMail].repliedBy = user.name
        localStorage.setItem('emails', JSON.stringify(localMails))
        refreshTime && setTime(120)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(sec => --sec)
        }, 1000)


        if (time === 0 || getIndexMail() === -1) {
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval)
        }
    })

    if (time === 0) {
        onReply('expired time', false)
        return <ExpireModal />
    }

    return (
        <div>
            {
                isAuth === false && <Navigate to="/login" />
            }
            <div className="leads__header">
                <span className="leads__user">Current user: {user.name}</span>
                <span className="leads__timer">{time}</span>

                <Link to="/overview">
                    <Button text="overview" background="rgb(136, 117, 117)" />
                </Link>

                <Button text="exit" onClick={onExit} />
            </div>
            <div className="leads__content">
                <div className="leads__buttons">
                    <Button text="Positive reply" onClick={() => onReply("positive")} background="#030303" width={180} />
                    <Button text="Neutral reply" onClick={() => onReply("neutral")} background="#030303" width={170} />
                    <Button text="Not a Lead" onClick={() => onReply("not-a-lead")} background="#030303" width={150} />
                </div>
            </div>
            {
                getIndexMail() === -1 ? (
                    <h1 className="leads__no-more">There are no more mails</h1>
                ) : <Lead items={mails} mailIndex={getIndexMail()} />
            }
        </div>
    )
};

export default Leads