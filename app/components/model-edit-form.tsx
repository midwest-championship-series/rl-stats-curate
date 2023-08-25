import React, { useState } from 'react';
import dayjs from 'dayjs';
import ArrayFieldEditor from './array-field-editor';
import { renderInputField } from './render-input-field';

const EditPlayerForm: React.FC<{ playerSchema: any, playerData: any, onSubmit: (data: any) => void }> = ({ playerSchema, playerData, onSubmit }) => {
  const [formData, setFormData] = useState(playerData);

  const formatDateForInput = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };

  // const renderInputField = (key: string, schemaItem: any) => {
  //   switch(schemaItem.type) {
  //     case 'string':
  //       return (
  //         <input 
  //           type="text" 
  //           name={key || ''}
  //           value={formData[key] || ''}
  //           onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
  //           className="w-full p-2 border rounded"
  //         />
  //       );
  //     case 'array':
  //       return (
  //         <ArrayFieldEditor 
  //           schema={schemaItem.schema}
  //           data={formData[key]}
  //           onChange={updatedData => setFormData(prev => ({ ...prev, [key]: updatedData }))}
  //         />
  //       );
  //     case 'date':
  //       return (
  //         <input 
  //           type="date" 
  //           value={formData[key] ? formatDateForInput(formData[key]) : ''}
  //           onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
  //         />
  //       );
  //     default:
  //       return <div>{JSON.stringify(formData[key])}</div>;
  //   }
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mb-4">
    <form onSubmit={handleSubmit}>
      {Object.entries(playerSchema).map(([key, schemaItem]) => (
        <div key={key}>
          {renderInputField(key, schemaItem, formData, setFormData)}
        </div>
      ))}
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Update
      </button>
    </form>
    </div>
  );
}

export default EditPlayerForm;