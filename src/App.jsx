import { useState } from 'react';
import TodoItem from './component/TodoItems';
import './css/styles.css';
import './css/reset.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  function addItem() {
    if (!newItem) {
      // *****Add validation for when the input is empty.
    }
    // *****Create a new component instead.
    const item = {
      // *****Find a better way to generate unique ids later.
      id: uuidv4(),
      value: newItem
    };

    setItems(oldList => [...oldList, item]);
    setNewItem('');

    console.log(items);
  }

  function deleteItem(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  function updateItem(id, newValue) {
    setItems((prevItems) =>
      // {...item, value: abc} creates a modified copy of the item object
      //  but with the value property set to newValue
      prevItems.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  }

  return (
    <div className='container horizontally-center-column'>
      <h1>To-do list app</h1>
      <div className="input-and-btn">
        <input
          type="text"
          placeholder="Add an item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={() => addItem()}>Add</button>
      </div>
      <ul>
        {items.map(item => {
          return (
            <TodoItem key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem} />
          )
        })}
      </ul>
    </div>
  );
}

export default App;