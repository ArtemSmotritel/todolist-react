import axios from "axios";

const urlTaskId = (id) => `/tasks/${id}`;
const urlListId = (id) => `/lists/${id}/tasks?all=true`;

async function makeRequest(url, method = "get", data) {
  const reqConfig = {
    method,
    baseURL: "http://localhost:3001",
    url,
  };
  if (data && method !== "get") reqConfig.data = data;

  const response = await axios(reqConfig);
  return response;
}

async function getLists() {
  const { data } = await makeRequest("/dashboard");
  return data.undone_tasks_by_list;
}

async function getListById(id) {
  const { data } = await makeRequest(urlListId(id));
  return data;
}

async function updateTaskOnServer(id, updatedFields) {
  await makeRequest(urlTaskId(id), "patch", updatedFields);
}

async function deleteTaskOnServer(id) {
  await makeRequest(urlTaskId(id), "delete");
}

async function addTaskOnServer(task, listId) {
  const { data } = await makeRequest(urlListId(listId), "post", task);
  return data;
}

export {
  getLists,
  getListById,
  updateTaskOnServer,
  deleteTaskOnServer,
  addTaskOnServer,
};
