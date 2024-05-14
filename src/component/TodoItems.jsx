import React, { useReducer } from 'react';

const initialState = { isEditing: false, editedValue: '', isCompleted: false };

function reducer(state, action) {
  switch (action.type) {
    case 'set_editing':
      return { ...state, isEditing: action.payload };
    case 'set_edited_value':
      return { ...state, editedValue: action.payload };
    case 'toggle_completed':
      return { ...state, isCompleted: !state.isCompleted };
    default:
      throw new Error();
  }
}

function TodoItem({ item, deleteItem, updateItem }) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, editedValue: item.value });

  return (
    <li key={item.id} className="list-item horizontal-space-between">
      {state.isEditing ? (
        <>
          <input
            type="text"
            value={state.editedValue}
            onChange={(e) => dispatch({ type: 'set_edited_value', payload: e.target.value })}
          />
          <button
            onClick={() => {
              if (!state.editedValue.trim()) {
                return;
              }
              updateItem(item.id, state.editedValue);
              dispatch({ type: 'set_editing', payload: false });
            }}
          >
            Save
          </button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </>
      ) : (
        <>
          <button onClick={() => dispatch({ type: 'toggle_completed' })}>Complete</button>
          <span className={state.isCompleted ? 'completed' : ''}>{item.value}</span>
          <button onClick={() => dispatch({ type: 'set_editing', payload: true })}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;