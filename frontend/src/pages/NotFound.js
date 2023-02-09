import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        <div style={{ fontSize: '5em' }}>404</div>
        <div style={{ fontSize: '2em' }}>Page not found</div>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </PageLayout>
  );
};
export default NotFound;
