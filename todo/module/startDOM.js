import { getItemDOM } from "./itemDOM.js";
import { getTodoInfo } from "./submitBtn.js";

export const startTodoInfo = getTodoInfo();
const taskCountDOM = document.getElementsByClassName("task-count")[0];

export const taskCount = startTodoInfo.length;

export const startTodoInfoDOM = () => {
  startTodoInfo.forEach((todoInfo) => {
    getItemDOM(todoInfo);
  });

  taskCountDOM.innerHTML = `${taskCount} task`;
};
