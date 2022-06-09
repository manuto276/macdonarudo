import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DrawerLayout } from '../drawer/drawerlayout/DrawerLayout';
import { Footer } from '../footer/Footer';

import { Header } from '../header/Header';
import { Home } from './home/Home';

function Main(props) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <DrawerLayout active={isDrawerOpen} onDismiss={() => setDrawerOpen(false)}>
            <Header onMenuClick={() => setDrawerOpen(true)} />
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