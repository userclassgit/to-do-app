import React, { useState } from 'react';

function TodoItem({ item, deleteItem, updateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(item.value);

  return (
    <li key={item.id} className="list-item horizontal-space-between">
      {isEditing ? (
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        item.value
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      {isEditing ? (
        <button
          onClick={() => {
            updateItem(item.id, editedValue);
            setIsEditing(false);
          }}
        >
          Save
        </button>
      ) : (
        <button onClick={() => deleteItem(item.id)}>Delete</button>
      )}
    </li>
  );
}

export default TodoItem;