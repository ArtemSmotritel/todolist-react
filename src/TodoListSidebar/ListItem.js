import './ListOfLists.css';

export default function ListItem(params) {
  const { name, id, highlighted } = params;
  return (
    <li className={`list-of-lists__item ${highlighted === id && "list-of-lists__item_highlighted"}`} id={`list-${id}`}>
      {name}
    </li>
  );
}