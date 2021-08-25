import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getAllMessages } from '../../services/Graphql/Messages/Queryes';

interface ParamsData {
  roomName: string;
}

const InitialForm: React.FC = () => {
  const { roomName } = useParams<ParamsData>();
  const { error, loading, data } = useQuery(getAllMessages);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <p>Room {roomName}</p>
    </div>
  );
};

export default InitialForm;
