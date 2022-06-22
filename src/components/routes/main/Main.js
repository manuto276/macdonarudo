import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../../header/Header";

import { Home } from '../home/Home';
import { Menu } from "../menu/Menu";

function Main() {
    return (
        <main>
            <Header />
        </main>
    );
}

export { Main };