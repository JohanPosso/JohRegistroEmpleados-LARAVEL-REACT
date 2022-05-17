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

const Edit = () => {
  const { contact, organizations } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    organization_id: contact.organization_id || '',
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    city: contact.city || '',
    region: contact.region || '',
    country: contact.country || '',
    postal_code: contact.postal_code || ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('contacts.update', contact.id));
  }

  function destroy() {
    if (confirm('Desea eliminar al empleado?')) {
      Inertia.delete(route('contacts.destroy', contact.id));
    }
  }

  function restore() {
    if (confirm('Desea restaurar al empleado?')) {
      Inertia.put(route('contacts.restore', contact.id));
    }
  }

  return (
    <div>
      <Helmet title={`${data.first_name} ${data.last_name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('contacts')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Empleados
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.first_name} {data.last_name}
      </h1>
      {contact.deleted_at && (
        <TrashedMessage onRestore={restore}>
          El empleado ha sido eliminado.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="First Name"
              name="first_name"
              errors={errors.first_name}
              value={data.first_name}
              onChange={e => setData('first_name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Last Name"
              name="last_name"
              errors={errors.last_name}
              value={data.last_name}
              onChange={e => setData('last_name', e.target.value)}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Email"
              name="organization_id"
              errors={errors.organization_id}
              value={data.organization_id}
              onChange={e => setData('organization_id', e.target.value)}
            >
              <option value=""></option>
              {organizations.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </SelectInput>
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Address"
              name="address"
              type="text"
              errors={errors.email}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Salary"
              name="phone"
              type="text"
              errors={errors.phone}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Phone"
              name="email"
              type="text"
              errors={errors.address}
              value={data.address}
              onChange={e => setData('address', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Position"
              name="city"
              type="text"
              errors={errors.city}
              value={data.city}
              onChange={e => setData('city', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Skills"
              name="region"
              type="text"
              errors={errors.region}
              value={data.region}
              onChange={e => setData('region', e.target.value)}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Country"
              name="country"
              errors={errors.country}
              value={data.country}
              onChange={e => setData('country', e.target.value)}
            >
              <option value=""></option>
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </SelectInput>
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Postal Code"
              name="postal_code"
              type="text"
              errors={errors.postal_code}
              value={data.postal_code}
              onChange={e => setData('postal_code', e.target.value)}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!contact.deleted_at && (
              <DeleteButton onDelete={destroy}>Eliminar Empleado</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Actualizar Empleado
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
