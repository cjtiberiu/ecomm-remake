import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

// Firebase
import firebase from 'firebase'

// ANT Design imports
import { Menu } from 'antd';
import { MailOutlined, HeartOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import SearchInput from '../forms/SearchInput';

const { SubMenu, Item } = Menu // Menu.SubMenu

const styles = {
    cartItemsContainer : {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(220,53,69, 0.6)',
        borderRadius: '50%',
        height: '20px',
        width: '20px',
        textAlign: 'center',
        color: 'white'
    },
    cartItemsNumber: {
        color: 'white',
        position: 'relative',
        top: '-65%',
    }
}

const Header = props => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const [current, setCurrent] = useState('');
    const [refresh, setRefresh] = useState(false);
    const nav = useSelector(state => state.nav);
    
    const handleClick = (e) => {
        setCurrent(e.key);
    }

    // set the active header item based on window location
    useEffect(() => {
        if (!history.location.pathname.split('/')[1]) {
            setCurrent('home');
            dispatch({ type: 'SET_CURRENT', payload: 'home'});
        }
        setCurrent(history.location.pathname.split('/')[1]);
        dispatch({ type: 'SET_CURRENT', payload: history.location.pathname.split('/')[1]});
    }, [history.location.pathname])

    // set the number of cart items
    useEffect(() => {
        setRefresh(!refresh)
    }, [cart.itemsCount])

    // logout the user
    const logout = () => {
        firebase.auth().signOut();

        dispatch({ type: "USER_LOGOUT", payload: null });

        dispatch({ type: "CLEAR_CART" });

        toast.dark('You have been signed out')

        history.push('/login');
    }

    return (
        
        <Menu theme='dark' onClick={handleClick} selectedKeys={[nav.current]} mode="horizontal">
            
            
            <Item key='home'>
                <Link to='/'>Home</Link>
            </Item>
            <Item key='products' icon={<ShopOutlined />}>
                <Link to='/products'>Shop</Link>
            </Item>
            <Item key='cart' icon={<ShoppingCartOutlined />}>
                <div style={styles.cartItemsContainer}>
                    <div style={styles.cartItemsNumber}>{cart.itemsCount}</div>
                </div>
                <Link to='/cart'>Cart</Link>
            </Item>
            <Item key='wishlist' icon={<HeartOutlined />}>
                <Link to='/wishlist'>Wishlist</Link>
            </Item>

            {
                !user && (
                    <>

                        <Item key='login' icon={<UserOutlined />} className='float-right'>
                            <Link to='/login'>Login</Link>
                        </Item>

                        <Item key='register' icon={<UserAddOutlined />} className='float-right'>
                            <Link to='/register'>Register</Link>
                        </Item>

                        <SearchInput setCurrent={setCurrent} />
                    </>
                )
            }

            {
                user && (

                    <> 

                        <SubMenu className='float-right' key="SubMenu" icon={<SettingOutlined />} title={user.email.split('@')[0]}>
                            
                            {user && user.role === "client" && (
                                <Item>
                                    <Link to="/user/dashboard">Dashboard</Link>
                                </Item>
                            )}

                            {user && user.role === "admin" && (
                                <Item>
                                    <Link to="/admin/dashboard">Dashboard</Link>
                                </Item>
                            )}
                            <Item icon={<LogoutOutlined />} onClick={() => logout()}>Logout</Item>
    
                        </SubMenu>

                        <SearchInput setCurrent={setCurrent} />

                    </>
                )
            }
            
        </Menu>
        
    )
};

export default Header;