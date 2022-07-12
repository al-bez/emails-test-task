import React, { FC, useEffect, useState } from 'react';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import './Overview.scss'


import emails from '../../static-data/emails.json';
import IMail from '../../types/Mail';
import RepliedLead from '../../components/RepliedLead/RepliedLead';

const Overview: FC = () => {

    const navigate = useNavigate()
    const [mails, setMails] = useState<IMail[] | []>(JSON.parse(localStorage.getItem('emails') || '[]'))

    // get count of mails with same status
    const getStatusCount = (status: string): number => {
        const mails: IMail[] = JSON.parse(localStorage.getItem('emails') || "[]")
        return mails.filter((mail: IMail) => mail.status === status).length
    }

    // reset emails status 
    const onResetMailsData = (): void => {
        localStorage.setItem("emails", JSON.stringify(emails))
        setMails(JSON.parse(localStorage.getItem('emails') || '[]'))
    }

    return (
        <div className="overview">
            <div className="overview__header">
                <Button text="reset" onClick={onResetMailsData} />
                <span className="overview__title">Overview</span>
                <Button text="back" onClick={() => navigate(-1)} />
            </div>



            <div className="overview__statistics">
                <span>Positive replies: {getStatusCount("positive")} </span>
                <span>Natural replies: {getStatusCount("neutral")} </span>
                <span>Not a lead:  {getStatusCount("not-a-lead")} </span>
            </div>

            <div className="overview__leads">
                <span>
                    {
                        mails.map(({ subject, body, repliedBy, status }: IMail, ind: number) => {
                            return repliedBy && status !== "expired time" && <RepliedLead title={subject} body={body} repliedBy={repliedBy} key={subject + ind} />
                        })
                    }
                </span>
            </div>
        </div>
    )
}

export default Overview