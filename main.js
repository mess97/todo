import { TODO_COOKIE_KEY } from "./constants/todo.js";
import { get, getAll } from "./utils/dom.js";
const getLocalInfo = JSON.parse(localStorage.getItem(TODO_COOKIE_KEY)) || [];

const input = get(".todo-input"); //인풋창을 가져오기
const subBtn = get(".todo-submit-button"); //전송버튼 가져오기
const todoList = get(".task-item-box");
const count = get(".task-count");

//checked 상태를 바꿔주는 함수
const toggleCheckBox = (item) => {
  if (item.checked == true) {
    item.checked = false;
  } else if (item.checked == false) {
    item.checked = true;
  }
  //새로운 배열을 local storage에 저장함
  localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));
  //로컬스토리지의 데이터를 가져오고 dom을 다시생성
  renderTodoList(getLocalInfo);
};

//confirmModal - 모달창이 뜨는 함수
const confirmModal = (index) => {
  const modalBack = document.createElement("section");
  modalBack.classList.add("modal-back");
  modalBack.innerHTML = `
  <div class="modal-container">
    <div class="title">진짜로 삭제하겠습니까?</div>
        <div class="btn-box">
            <button id='yes-btn'class="modal-btn">yes</button>
            <button id='no-btn' class="modal-btn">no</button>
        </div>
    </div>`;
  document.body.appendChild(modalBack);
  const yesBtn = get("#yes-btn");
  const noBtn = get("#no-btn");
  //yes 클릭시
  yesBtn.onclick = () => {
    //현재 리스트를 삭제 하는 함수
    deleteList(index);
    document.body.removeChild(modalBack);
  };
  //no 클릭시
  noBtn.onclick = () => {
    document.body.removeChild(modalBack);
  };
};

//현재 리스트를 삭제 하는 함수
const deleteList = (index) => {
  getLocalInfo.splice(index, 1);

  localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));
  renderTodoList(getLocalInfo);
};

//로컬스토리지의 데이터를 가져오고 dom을 생성하는 함수
const renderTodoList = (newTodo) => {
  //todoList라는 listbox의 값을 비워줌
  todoList.innerHTML = "";

  count.innerHTML = `${newTodo.length} task`;
  //로컬 스토리지에 KEY의 value 배열 만큼 순회
  newTodo.forEach((item, index) => {
    //list tag를 만들어주고 클라스 네임은 "task-item"
    const creatItemDOM = document.createElement("li");
    creatItemDOM.className = "task-item";
    //list tag 매번 순회한 데이터를 넣고 DOM을 생성함
    creatItemDOM.innerHTML = ` 
        <input type="checkbox" class= "item-check" ${
          item.checked ? "checked" : ""
        }>
        <div class="item-title ">
         ${item.text}
        </div>
        <button class="task-delete"></button>`;
    //if item.checked ==true的情况 给creatItemDOM 加上 className
    if (item.checked) {
      creatItemDOM.classList.add("title-check");
    }
    //------------------------------------------------------
    //todoList라는 listbox의 list를 맨 마지막 자식요소롤 넣어줌
    todoList.appendChild(creatItemDOM);
    //input DOM을 가져옴
    const checkBox = creatItemDOM.querySelector(".item-check");
    //checkBox을 클릭시
    checkBox.addEventListener("click", () => {
      //checked 상태를 바꿔주는 함수
      toggleCheckBox(item);
    });
    //delete btn DOM을 가져오기
    const deleteBtn = creatItemDOM.querySelector(".task-delete");
    //deleteBtn 클릭시
    deleteBtn.addEventListener("click", () => {
      //modal return 값
      //모달창이 뜹니다//
      confirmModal(index);
    });
  });
};

//시작하는  함수
const init = () => {
  renderTodoList(getLocalInfo);
  subBtn.addEventListener("click", () => {
    //전송버튼 클릭시
    //input에 빈 값이면 리턴
    if (!input.value) return;
    //input value를 투두정보에 저장
    const todoInfo = {
      text: input.value,
      checked: false,
    };
    //로컬스토리지에 배열 형식으로  값을 넣어줌
    getLocalInfo.push(todoInfo);
    //인풋창 vaule를 없애줌
    input.value = "";
    //새로운 배열을 local storage에 저장함
    localStorage.setItem(TODO_COOKIE_KEY, JSON.stringify(getLocalInfo));

    //로컬스토리지의 데이터를 가져오고 dom을 다시생성
    renderTodoList(getLocalInfo);
  });
};

init();
