import { TODO_COOKIE_KEY } from "../constants/todo.js";
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { startTodoInfo } from "./startDOM.js";
import { getTodoInfo } from "./submitBtn.js";
const taskItemBoxDOM = document.getElementsByClassName("task-item-box")[0];

// startTodoInfo

export const getItemDOM = (inputValue) => {
  const taskItem = makeDOMwithProperties("li", {
    className: "task-item",
  });

  const itemTitle = makeDOMwithProperties("div", {
    className: "item-title",
    innerHTML: inputValue.title,
  });
  const taskDelete = makeDOMwithProperties("button", {
    className: "task-delete",
  });

  const checkInpt = makeDOMwithProperties("input", {
    type: "checkbox",
    className: "item-check",
    id: inputValue.id,
    // checked: "true",
  });

  console.log(taskItem);
  if (inputValue.state == "true") {
    taskItem.classList.add("list-check");
    itemTitle.classList.add("title-check");
    checkInpt.setAttribute("checked", "true");
  } else {
    taskItem.classList.remove("list-check");
    itemTitle.classList.remove("title-check");
  }

  appendChildrenList(taskItem, [checkInpt, itemTitle, taskDelete]);
  taskItemBoxDOM.appendChild(taskItem);

  changeState();
};

export const changeState = () => {
  const getInputCheack = document.querySelectorAll(".item-check");

  getInputCheack.forEach((input) => {
    const getTaskItemDOM = document.querySelectorAll(".task-item");
    const getItemTitleDOM = document.querySelectorAll(".item-title");
    const getTaskDelete = document.querySelectorAll(".task-delete");

    input.onclick = () => {
      const getLocalInfo =
        JSON.parse(localStorage.getItem(TODO_COOKIE_KEY)) || [];
      const select = getLocalInfo[input.id];
      if (select.state == "false") {
        select.state = "true";
        getTaskItemDOM[input.id].classList.add("list-check");
        getItemTitleDOM[input.id].classList.add("title-check");
      } else {
        select.state = "false";
        getTaskItemDOM[input.id].classList.remove("list-check");
        getItemTitleDOM[input.id].classList.remove("title-check");
      }
      localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));
    };
  });
};
