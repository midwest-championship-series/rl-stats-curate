import React, { useState } from 'react';

const EditPlayerForm: React.FC<{ playerSchema: any, playerData: any, onSubmit: (data: any) => void }> = ({ playerSchema, playerData, onSubmit }) => {
  const [formData, setFormData] = useState(playerData);

  const renderInputField = (key: string, schemaItem: any) => {
    switch(schemaItem.type) {
      case 'string':
        return (
          <input 
            type="text" 
            name={key || ''}
            value={formData[key] || ''}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        );
      case 'array':
        // For now, we'll just return a basic string for arrays. 
        // Complex handling for array types can be added.
        return <div>{JSON.stringify(formData[key])}</div>;
      case 'date':
        return (
          <input 
            type="date" 
            value={formData[key] || ''}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          />
        );
      default:
        return <div>{JSON.stringify(formData[key])}</div>;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mb-4">
    <form onSubmit={handleSubmit}>
      {Object.entries(playerSchema).map(([key, schemaItem]) => (
        <div key={key}>
          <label className="block mb-2 text-sm font-bold" htmlFor="screen_name">{key}</label>
          {renderInputField(key, schemaItem)}
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