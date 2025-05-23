import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Search from './Search';
import ImportView from './ImportView';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="nav-menu">
                    <Link to="/">Buscar</Link>
                    <Link to="/import">Importar</Link>
                </nav>
                <Switch>
                    <Route path="/import" component={ImportView} />
                    <Route path="/" exact component={Search} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;