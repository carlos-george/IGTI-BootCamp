import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Composto from './pages/Composto';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/composto" component={Composto} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;