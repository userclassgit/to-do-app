import { useState } from 'react';
import './css/styles.css';
import './css/reset.css';

function App() {
  const [newItem, setNewItem] = useState('');

  return (
    <div>
      <h1>To-do list app</h1>
      <input
        type="text"
        placeholder="Add an item"
        value = {newItem}
      />
      <button>Add</button>
      <ul>
        <li>take out the trash</li>
        <li>water the plants</li>
        <li>go to the gym</li>
      </ul>
    </div>
  );
}

export default App;