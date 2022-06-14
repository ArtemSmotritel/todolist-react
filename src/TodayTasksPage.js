import List from "./List/List";
import { getListOrToday } from "./serverFunctions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TodayTaskPage() {
    const [data, setData] = useState({}),
    [list, setList] = useState([]);
  const { id: listId } = useParams();

  const getData = async (listId) => {
    const data = await getListOrToday(listId);
    setData(data);
    setList(data.tasks);
  };

  useEffect(() => {
    getData(listId);
  }, [listId]);

  return <List list={list} title={data.name} setList={setList}/>;
}
