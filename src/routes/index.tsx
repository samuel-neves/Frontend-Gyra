import React from 'react';

import { Switch, Route } from 'react-router-dom';

import InitialForm from '../modules/InitialForm';
import ChatRoom from '../modules/ChatRoom';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={InitialForm} />
    <Route path="/chats/:roomName" exact component={ChatRoom} />
  </Switch>
);

export default Routes;
