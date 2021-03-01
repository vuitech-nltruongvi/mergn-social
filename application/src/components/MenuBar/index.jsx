// Libraries
import React, {useState, useEffect, useContext} from 'react';
import {Menu} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';

// Context
import {AuthContext} from '../../context/auth';

const MenuBar = () => {
    // NOTE: Context
    const {user, logout} = useContext(AuthContext);

    // NOTE: Variable
    const {pathname = ''} = window.location;
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    // NOTE: State
    const [activeItem, setActiveItem] = useState(path);

    useEffect(() => {
        setActiveItem(path);
    }, [path]);

    return user ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name={user.username}
                active={activeItem === 'home'}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                as={Link}
                to='/'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </Menu>
    );
};

MenuBar.propTypes = {};

export default withRouter(MenuBar);