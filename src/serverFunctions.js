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
  try {
    const { data } = await makeRequest("/dashboard");
    return data.undone_tasks_by_list;
  } catch (error) {
    throw new Error("Something went very wrong on the server. Cannot request a list of lists");
  }
}

async function getListById(id) {
  try {
    const { data } = await makeRequest(urlListId(id));
    return data;
  } catch (error) {
    throw new Error("Something went very wrong on the server. Cannot request this list");
  }
}

async function updateTaskOnServer(id, updatedFields) {
  try {
    await makeRequest(urlTaskId(id), "patch", updatedFields);
  } catch (error) {
    throw new Error("Something went very wrong on the server. Cannot check this task");
  }
}

async function deleteTaskOnServer(id) {
  try {
    await makeRequest(urlTaskId(id), "delete");
  } catch (error) {
    throw new Error("Something went very wrong on the server. Cannot delete this task");
  }
}

async function addTaskOnServer(task, listId) {
  try {
    const { data } = await makeRequest(urlListId(listId), "post", task);
    return data;
  } catch (error) {
    throw new Error("Something went very wrong on the server. Cannot add this task");
  }
}

export {
  getLists,
  getListById,
  updateTaskOnServer,
  deleteTaskOnServer,
  addTaskOnServer,
};
