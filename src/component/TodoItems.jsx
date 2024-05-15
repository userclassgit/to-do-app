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
          <button className={`toggle-completed ${state.isCompleted ? 
            'completed-true' : 'completed-false'}`} onClick={() => 
            dispatch({ type: 'toggle_completed' })}></button>
          <input
            type="text"
            value={state.editedValue}
            onChange={(e) => dispatch({ type: 'set_edited_value', payload: e.target.value })}
          />
          <div className="right-hand-buttons flex">
            <button
              className='save-edit-btn'
              onClick={() => {
                if (!state.editedValue.trim()) {
                  return;
                }
                updateItem(item.id, state.editedValue);
                dispatch({ type: 'set_editing', payload: false });
              }}
            >
            </button>
            <button className='delete-btn' onClick={() => deleteItem(item.id)}></button>
          </div>
        </>
      ) : (
        <>
          <button className={`toggle-completed ${state.isCompleted ? 
            'completed-true' : 'completed-false'}`} onClick={() => 
            dispatch({ type: 'toggle_completed' })}></button>
          <span className={`item-text ${state.isCompleted ? 'completed' : ''}`}>{item.value}</span>
          <div className="right-hand-buttons flex">
            <button className='edit-btn' onClick={() => 
              dispatch({ type: 'set_editing', payload: true })}></button>
            <button className='delete-btn' onClick={() => deleteItem(item.id)}></button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;