import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Inicio" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Crear Correo" link="organizations" icon="office" />
      <MainMenuItem text="Empleados" link="contacts" icon="users" />
    </div>
  );
};
