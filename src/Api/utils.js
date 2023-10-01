import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

export const getAllUsers = () => axios.get(usersUrl);
export const updateUser = (id, data) => axios.patch(`${usersUrl}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${usersUrl}/${id}`);
export const deleteUserTodos = (id) => axios.delete(`${todosUrl}?userId=${id}`);
export const deleteUserPosts = (id) => axios.delete(`${postsUrl}?userId=${id}`);
