import React from 'react';

import { useParams } from 'react-router-dom';

interface ParamsData {
  roomName: string;
}

const InitialForm: React.FC = () => {
  const { roomName } = useParams<ParamsData>();

  return (
    <div className="App">
      <p>Room {roomName}</p>
    </div>
  );
};

export default InitialForm;
