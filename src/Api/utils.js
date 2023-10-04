import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

//create
export const addUser = (data) => axios.post(usersUrl, data);
//get
export const getAllUsers = () => axios.get(usersUrl);
export const getAllToDos = () => axios.get(todosUrl);
export const getAllPosts = () => axios.get(postsUrl);
export const getToDoById = (id) => axios.get(`${todosUrl}/${id}`);
//update
export const updateUser = (id, data) => axios.patch(`${usersUrl}/${id}`, data);
export const markTodoAsCompleted = (id, data) =>
  axios.patch(`${todosUrl}/${id}`, data);
//detete
export const deleteUser = (id) => axios.delete(`${usersUrl}/${id}`);

export const deleteUserTodos = (id) => axios.delete(`${todosUrl}?userId=${id}`);
export const deleteUserPosts = (id) => axios.delete(`${postsUrl}?userId=${id}`);
