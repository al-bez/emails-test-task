import React, { FC, useEffect } from 'react';
import './DropDown.scss'
import users from '../../static-data/users.json'

interface DropdownProps {
    onSelectUser: React.Dispatch<React.SetStateAction<{ name: string, index: number }>>
}

const DropDown: FC<DropdownProps> = ({ onSelectUser }) => {

    //@ts-ignore    
    const fetchedUsers = JSON.parse(localStorage.getItem("users")) || users
    useEffect(() => {

        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(users))
        }

    }, [])

    return (
        <div>
            <select defaultValue={'Select User'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onSelectUser({ name: event.target.value, index: event.target.selectedIndex })}>
                {
                    fetchedUsers.map((user: { name: string, status: string }, ind: number) => {
                        return <option disabled={user.status === 'active'} key={user.name + ind} value={user.name}>{user.name}</option>
                    })
                }
            </select>
        </div>
    )
}

export default DropDown