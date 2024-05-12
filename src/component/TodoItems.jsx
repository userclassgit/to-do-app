

function TodoItem({ item, deleteItem }) {
  return (
    <li key={item.id} className="list-item horizontal-space-between">
      {item.value}
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;