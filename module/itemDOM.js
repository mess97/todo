import { TODO_COOKIE_KEY } from "../constants/todo.js";
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";

const taskItemBoxDOM = document.getElementsByClassName("task-item-box")[0];
const taskCount = document.getElementsByClassName("task-count")[0];
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

  //-------------------------------------
  //changeState
  checkInpt.onclick = () => {
    const getTaskItemDOM = document.querySelectorAll(".task-item");
    const getItemTitleDOM = document.querySelectorAll(".item-title");
    const getLocalInfo =
      JSON.parse(localStorage.getItem(TODO_COOKIE_KEY)) || [];
    const select = getLocalInfo[checkInpt.id];
    if (select.state == "false") {
      select.state = "true";
      getTaskItemDOM[checkInpt.id].classList.add("list-check");
      getItemTitleDOM[checkInpt.id].classList.add("title-check");
    } else {
      select.state = "false";
      getTaskItemDOM[checkInpt.id].classList.remove("list-check");
      getItemTitleDOM[checkInpt.id].classList.remove("title-check");
    }
    localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));
  };
  //-------------------------

  //remove

  taskDelete.onclick = () => {
    const getLocalInfo =
      JSON.parse(localStorage.getItem(TODO_COOKIE_KEY)) || [];
    taskItem.remove();
    getLocalInfo.splice(checkInpt.id, 1);
    console.log(getLocalInfo);
    localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));
    taskCount.innerHTML = `${getLocalInfo.length} task`;
  };
};

// export const changeState = () => {
//   const getInputCheack = document.querySelectorAll(".item-check");

//   getInputCheack.forEach((input) => {
//     const getTaskItemDOM = document.querySelectorAll(".task-item");
//     const getItemTitleDOM = document.querySelectorAll(".item-title");
//     input.onclick = () => {
//       const getLocalInfo =
//         JSON.parse(localStorage.getItem(TODO_COOKIE_KEY)) || [];
//       const select = getLocalInfo[input.id];
//       if (select.state == "false") {
//         select.state = "true";
//         getTaskItemDOM[input.id].classList.add("list-check");
//         getItemTitleDOM[input.id].classList.add("title-check");
//       } else {
//         select.state = "false";
//         getTaskItemDOM[input.id].classList.remove("list-check");
//         getItemTitleDOM[input.id].classList.remove("title-check");
//       }
//       localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));
//     };
//   });
// };

// getTaskDelete[input.id].onclick = () => {
//   getTaskItemDOM[input.id].remove();
// };
// export const deleteTask = () => {
//   const getInputCheack = document.querySelectorAll(".item-check");

//   getInputCheack.forEach((input) => {
//     const getTaskItemDOM = document.querySelectorAll(".task-item");
//     const getTaskDelete = document.querySelectorAll(".task-delete");
//     getTaskDelete[input.id].onclick = () => {
//       console.log(getTaskDelete[input.id]);
//       getTaskItemDOM[input.id].remove();
//     };
//   });
// };
