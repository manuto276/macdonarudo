import './App.css';
import { useState } from 'react';
import { ActionItem } from './ActionItem';
import { DrawerLayout } from './components/drawer/drawerlayout/DrawerLayout';

import { Header } from './components/header/Header';
import { Home } from './components/pages/home/Home';

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navActionItems = [
    new ActionItem(null, 'Home', () => null),
    new ActionItem(null, 'Our menu', () => null),
    new ActionItem(null, 'About us', () => null)
  ];

  const userActionItems = [
    new ActionItem(null, 'My account', () => null),
    new ActionItem(null, 'My orders', () => null),
    new ActionItem(null, 'Log out', () => null)
  ]; 

  return (
    <div className="App">
      <DrawerLayout 
        active={isDrawerOpen} 
        onDismiss={() => setDrawerOpen(false)}
        items={[navActionItems, userActionItems]}>
          <Header onMenuClick={() => setDrawerOpen(true)} navItems={navActionItems} />
          <Home />
      </DrawerLayout>
    </div>
  );
}

export default App;
