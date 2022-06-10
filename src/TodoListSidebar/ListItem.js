export default function ListItem(params) {
  const { name, id } = params;
  return (
    <li className="list-of-lists__item" id={`list-${id}`}>
      {name}
    </li>
  );
}
