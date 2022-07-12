import React, { FC } from 'react'

import './RepliedLead.scss';

interface RepliedLeadProps {
    title: string;
    body: string;
    repliedBy: string;
}

const RepliedLead: FC<RepliedLeadProps> = ({ title, repliedBy }) => {
    return (
        <div className="replied_lead">
            <p className="replied_lead__title"><span>Subject:</span> {title}</p>
            <p className="replied_lead__reply"><span>Replied by</span>: {repliedBy}</p>
        </div>
    )
}

export default RepliedLead