import React from 'react';
import dayjs from 'dayjs';
import ArrayFieldEditor from './array-field-editor';

export const formatDateForInput = (dateString: string) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

export const renderInputField = (key: string, schemaItem: any, formData: any, setFormData: (data: any) => void) => {
  let inputComponent;

  switch (schemaItem.type) {
    case 'string':
    case 'objectId':
      inputComponent = (
        <input
          type="text"
          name={key}
          value={formData[key] || ''}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-2 border rounded"
        />
      );
      break;
    case 'array':
      inputComponent = (
        <ArrayFieldEditor
          schema={schemaItem.schema}
          data={formData[key]}
          onChange={updatedData => setFormData(prev => ({ ...prev, [key]: updatedData }))}
        />
      );
      break;
    case 'date':
      inputComponent = (
        <input
          type="date"
          value={formData[key] ? formatDateForInput(formData[key]) : ''}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        />
      );
      break;
    default:
      inputComponent = <div>{JSON.stringify(formData[key])}</div>;
  }

  return (
    <div key={key}>
      <label className="block mb-2 text-sm font-bold" htmlFor={key}>{key} ({schemaItem.type})</label>
      <div className='mb-4'>
        {inputComponent}
      </div>
    </div>
  );
}