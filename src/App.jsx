import { useState } from 'react';
import './css/styles.css';
import './css/reset.css';

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
      id: Math.floor(Math.random() * 1000),
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

  return (
    <>
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
            <li key={item.id}>
              {item.value}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default App;