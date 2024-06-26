import { useEffect, useReducer } from 'react';
import TodoItem from './component/TodoItems';
import './css/styles.css';
import './css/reset.css';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  newItem: '',
  items: JSON.parse(localStorage.getItem('items')) || [],
  isValid: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_new_item':
      return { ...state, newItem: action.payload, isValid: true };
    case 'add_item':
      if (!action.payload) {
        return { ...state, isValid: false };
      } else {
        const item = {
          id: uuidv4(),
          value: action.payload,
          isCompleted: false,
        };
        return { ...state, items: [...state.items, item], newItem: '', isValid: true };
      }
    case 'delete_item':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'update_item':
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ?
          { ...item, value: action.payload.newValue } : item))
      };
    case 'toggle_completed':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, isCompleted: !item.isCompleted } : item
        ),
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = () => {
    dispatch({ type: 'add_item', payload: state.newItem });
  };

  const deleteItem = (id) => {
    dispatch({ type: 'delete_item', payload: id });
  };

  const updateItem = (id, newValue) => {
    dispatch({ type: 'update_item', payload: { id, newValue } });
  };

  const toggleCompleted = (id) => {
    dispatch({ type: 'toggle_completed', payload: id });
  };

  return (
    <div className='container horizontally-center-column'>
      <h1>To-do List</h1>
      <div className="input-and-btn">
        <input
          className={!state.isValid ? 'error-placeholder' : ''}
          type="text"
          placeholder={!state.isValid ? 'Please enter a value.' : 'Add an item'}
          value={state.newItem}
          onChange={(e) => dispatch({ type: 'set_new_item', payload: e.target.value })}
        />
        <button className='add-btn' onClick={() => addItem()}></button>
      </div>
      <ul>
        <ul>
          {state.items.map(item => {
            return (
              <TodoItem key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem} toggleCompleted={toggleCompleted} />
            )
          })}
        </ul>
      </ul>
    </div>
  );
}

export default App;