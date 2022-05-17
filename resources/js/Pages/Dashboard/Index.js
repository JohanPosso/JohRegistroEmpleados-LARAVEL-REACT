import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Inicio</h1>
      <p className="mb-12 leading-normal">
        Hola, Bienvenidos a Developers SAS.
      </p>
    </div>
  );
};

Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default Dashboard;
