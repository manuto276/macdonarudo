import './App.css';
import { useState } from 'react';
import { ActionItem } from './ActionItem';
import { DrawerLayout } from './components/drawer/drawerlayout/DrawerLayout';

import { Header } from './components/header/Header';
import { Home } from './components/pages/home/Home';

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navActionItems = [
    new ActionItem('Home', () => null),
    new ActionItem('Our menu', () => null),
    new ActionItem('About us', () => null)
  ];

  const menuActionItems = [
    new ActionItem('My account', () => null),
    new ActionItem('My orders', () => null),
    new ActionItem('Log out', () => null)
  ]; 

  return (
    <div className="App">
      <DrawerLayout 
        active={isDrawerOpen} 
        onDismiss={() => setDrawerOpen(false)}
        items={[navActionItems, menuActionItems]}>
          <Header onMenuClick={() => setDrawerOpen(true)} navItems={navActionItems} menuItems={menuActionItems} />
          <Home />
      </DrawerLayout>
    </div>
  );
}

export default App;
