import React, { FC, useState } from 'react'
import IMail from '../../types/Mail';
import './Lead.scss';


interface LeadProps {
    items: IMail[];
    mailIndex: number;
}

const Lead: FC<LeadProps> = ({ items, mailIndex }) => {


    return (
        <div className="lead">
            <p className="lead__title">{items[mailIndex]?.subject}</p>
            <p className="lead__text">
                {
                    items[mailIndex]?.body.split("\n").map(function (item, idx) {
                        return (
                            <span key={idx}>
                                {item}
                                <br />
                            </span>
                        )
                    })
                }
            </p>
        </div>
    )
}

export default Lead