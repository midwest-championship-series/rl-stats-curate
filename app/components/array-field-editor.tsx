import React, { useState } from 'react';
import dayjs from 'dayjs';
import { renderInputField } from './render-input-field';

const ArrayFieldEditor: React.FC<{ schema: any, data: any[], onChange: (updatedData: any[]) => void }> = ({ schema, data, onChange }) => {
  
  // To track the item currently being edited (null when not editing)
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  
  // Local state for the form data
  const [formData, setFormData] = useState<any>({});

  const handleEdit = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault()
    setIsAdding(false)
    setEditingIndex(index);
    setFormData(data[index]);
  };

  const handleDelete = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault()
    const updatedData = [...data];
    updatedData.splice(index, 1);
    onChange(updatedData);
  };

  const handleSave = () => {
    const updatedData = [...data];
    if (editingIndex !== null) {
      updatedData[editingIndex] = formData;
    } else {
      updatedData.push(formData);
    }
    onChange(updatedData);
    setEditingIndex(null);
    setIsAdding(false)
    setFormData({});
  };

  const handleAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault()
    setEditingIndex(null);
    setIsAdding(true)
    setFormData({});
  };

  const formatDateForInput = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };

//   const renderInputField = (key: string, schemaItem: any) => {
//     let inputComponent;

//     switch(schemaItem.type) {
//       case 'string':
//         inputComponent = (
//           <input 
//             type="text" 
//             name={key}
//             value={formData[key] || ''}
//             onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//         );
//         break;
//       case 'array':
//         return (
//           <ArrayFieldEditor 
//             schema={schemaItem.schema}
//             data={formData[key]}
//             onChange={updatedData => setFormData(prev => ({ ...prev, [key]: updatedData }))}
//           />
//         );
//       case 'date':
//         inputComponent = (
//           <input 
//             type="date" 
//             value={formData[key] ? formatDateForInput(formData[key]) : ''}
//             onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//           />
//         );
//         break;
//       default:
//         inputComponent = <div>{JSON.stringify(formData[key])}</div>;
//     }

//     return (
//       <div key={key}>
//         <label className="block mb-2 text-sm font-bold" htmlFor={key}>{key}</label>
//         <div className='mb-4'>
//           {inputComponent}
//         </div>
//       </div>
//     );
// }

return (
    <div className="bg-gray-100 p-4 rounded-md shadow">
      <h3 className="mb-4 text-lg font-semibold">Array Items</h3>
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between bg-white p-3 mb-2 rounded shadow">
          <span className="text-gray-600">{JSON.stringify(item)}</span> 
          <div>
            <button onClick={(e) => handleEdit(index, e)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
              Edit
            </button>
            <button onClick={(e) => handleDelete(index, e)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
              Delete
            </button>
          </div>
        </div>
      ))}

        {editingIndex !== null && (
        <div className="mt-4 bg-white p-4 rounded shadow relative">
            <button 
                onClick={() => { 
                    setEditingIndex(null); 
                    setFormData({});
                }} 
                className="absolute text-lg top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                ×
            </button>
            <h4 className="mb-4 text-md font-semibold">Editing Item</h4>
            {Object.entries(schema).map(([key, schemaItem]) => renderInputField(key, schemaItem, formData, setFormData))}
            <button onClick={handleSave} className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Save
            </button>
        </div>
        )}
        {isAdding && (
        <div className="mt-4 bg-white p-4 rounded shadow relative">
            <button 
                onClick={() => { 
                    setIsAdding(false);
                    setFormData({});
                }} 
                className="absolute text-lg top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                ×
            </button>
            <h4 className="mb-4 text-md font-semibold">Adding New Item</h4>
            {Object.entries(schema).map(([key, schemaItem]) => renderInputField(key, schemaItem, formData, setFormData))}
            <button onClick={handleSave} className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Save
            </button>
        </div>
        )}

      <button onClick={(e) => handleAdd(e)} className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none">
        Add New Item
      </button>

    </div>
  );
};

export default ArrayFieldEditor;