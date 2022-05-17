import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

const Edit = () => {
  const { organization } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: organization.name || '',
    email: organization.email || '',
    phone: organization.phone || '',
    address: organization.address || '',
    city: organization.city || '',
    region: organization.region || '',
    country: organization.country || '',
    postal_code: organization.postal_code || ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('organizations.update', organization.id));
  }

  function destroy() {
    if (confirm('Desea elimiar este correo?')) {
      Inertia.delete(route('organizations.destroy', organization.id));
    }
  }

  function restore() {
    if (confirm('Desea restaurar este correo?')) {
      Inertia.put(route('organizations.restore', organization.id));
    }
  }

  return (
    <div>
      <Helmet title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('organizations')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Correo Electronico
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {organization.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Este Correo Electronico ha sido eliminado.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Correo Electronico"
              name="name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!organization.deleted_at && (
              <DeleteButton onDelete={destroy}>
                Eliminar Correo Electronico
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Actualizar Correo Electronico
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
