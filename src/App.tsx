import { useState } from 'react';

import axios from 'axios';
import './index.css';

import { Form } from './components/Form/Form';
import { ConeGeometry } from './types';
import { Cone } from './components/Cone/Cone';

const serverUrl = 'http://localhost:4000';

function App() {
  const [coneGeometry, setConeGeometry] = useState<null | ConeGeometry>(null);

  const updateConeGeometry = (data: {
    height: number;
    radius: number;
    segments: number;
  }) => {
    setConeGeometry(null);
    axios
      .post(`${serverUrl}/calc`, { data })
      .then((res) => setConeGeometry(res.data));
  };

  const content =
    coneGeometry === null ? (
      <div className="loading">Loading...</div>
    ) : (
      <Cone {...coneGeometry} />
    );

  return (
    <div>
      <Form updateConeGeometry={updateConeGeometry} />
      {content}
    </div>
  );
}

export { App };
