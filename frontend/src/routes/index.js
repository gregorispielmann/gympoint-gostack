import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Student from '~/pages/Student';
import Plans from '~/pages/Plans';
import Plan from '~/pages/Plan';
import Registrations from '~/pages/Registrations';
import Registration from '~/pages/Registration';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/student" component={Student} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/plan" component={Plan} isPrivate />

      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/registration" component={Registration} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />

      <Route path="" component={() => <h1>404</h1>} />
    </Switch>
  );
}
