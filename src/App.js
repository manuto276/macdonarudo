import { useState } from 'react';
import './App.css';
import { DrawerLayout } from './components/drawer/drawerlayout/DrawerLayout';
import { DrawerView } from './components/drawer/drawerview/DrawerView';

import { Header } from './components/header/Header';
import { Home } from './components/pages/home/Home';

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="App">
      <DrawerLayout active={isDrawerOpen} dismiss={() => {if (isDrawerOpen) setDrawerOpen(false)}}>
        <DrawerView>
          <Header onMenuClick={() => setDrawerOpen(true)} />
          <Home />
        </DrawerView>
      </DrawerLayout>
    </div>
  );
}

export default App;
