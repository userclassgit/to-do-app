

function TodoItem({ item, deleteItem }) {
  return (
    <li key={item.id}>
      {item.value}
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;