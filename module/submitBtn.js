import { TODO_COOKIE_KEY } from "../constants/todo.js";
import { getItemDOM } from "./itemDOM.js";

const taskCountDOM = document.getElementsByClassName("task-count")[0];

const inputData = document.getElementsByClassName("todo-input")[0];
const submitBtn = document.getElementsByClassName("todo-submit-button")[0];
export const getTodoInfo = () =>
  JSON.parse(localStorage.getItem(TODO_COOKIE_KEY)) || [];

const getTaskCount = () => {
  const taskCountDOMInner = taskCountDOM.innerHTML;
  taskCountDOM.innerHTML = `${
    Number(taskCountDOMInner.replace(" task", "")) + 1
  } task`;
};

export const getInputValue = () => {
  submitBtn.addEventListener("click", () => {
    const startTodoInfo = getTodoInfo();
    const inputValue = {
      id: startTodoInfo.length,
      title: inputData.value,
      state: "false",
    };

    if (inputValue.title == "" || null) return;
    getItemDOM(inputValue);
    addTodoInfo(inputValue);
    inputData.value = "";
    getTaskCount();
  });
};

const addTodoInfo = (todoInfo) => {
  const originalTodoInfo = getTodoInfo();

  localStorage.setItem(
    TODO_COOKIE_KEY,
    JSON.stringify([...originalTodoInfo, todoInfo])
  );
};
