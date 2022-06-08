import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActionItem } from '../../ActionItem';
import { DrawerLayout } from '../drawer/drawerlayout/DrawerLayout';
import { Footer } from '../footer/Footer';

import { Header } from '../header/Header';
import { Home } from './home/Home';

function Main(props) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const menuitems = [
        new ActionItem('My account', () => null),
        new ActionItem('Orders', () => null),
        new ActionItem('Log out', () => null)
    ]; 

    return (
        <DrawerLayout active={isDrawerOpen} onDismiss={() => setDrawerOpen(false)}>
            <Header onMenuClick={() => setDrawerOpen(true)} menuItems={menuitems} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='menu' element={<div>Menu</div>} />
                    <Route path='about' element={<div>About us</div>} />
                </Routes>
            <Footer />
        </DrawerLayout>
    );
}

export { Main };