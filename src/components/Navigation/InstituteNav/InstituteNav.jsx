import React from 'react';
import Navigation from '../Navigation';
import {Home, Users, MessageSquare, Settings} from 'react-feather';

const InstituteNav = props => {
    const nav = [
        {
            link: '/i/dashboard',
            Icon: Home
        },
        {
            link: '/i/users',
            Icon: Users
        },
        {
            link: '/i/messages',
            Icon: MessageSquare
        },
        {
            link: '/i/settings',
            Icon: Settings
        }
    ]
    return (
        <Navigation data={nav} />
    )
}

export default InstituteNav;