'use strict';

const addTaskBtn = document.getElementById('addTaskBtn');
const taskToAdd = document.getElementById('taskText');
const taskSection = document.querySelector('.added-task-sec');
const errorText = document.querySelector('.error-text');

let taskId = 0;

addTaskBtn.addEventListener('click', () => {
  const taskText = taskToAdd.value;

  //   creating a div for task
  const divEl = document.createElement('div');
  divEl.setAttribute('id', `task${taskId}`);
  divEl.setAttribute('class', 'form-check added-task');
  divEl.innerHTML = `<input class="checkbox" id="input${taskId}" type="checkbox" />
    <label class="form-check-label" id="label${taskId}">
    ${taskText}
    </label>
    <button class="task-dlt-btn" id="btn${taskId}">Delete</button>`;

  if (taskText !== '') {
    errorText.classList.add('hidden');
    taskSection.prepend(divEl);
    taskToAdd.value = '';
    taskId++;
  } else {
    errorText.classList.remove('hidden');
  }

  //   executing check btn operation after adding tasks
  const checkBtns = document.querySelectorAll('.checkbox');
  checkBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const taskId = e.target.id;
      const tId = taskId.split('input')[1];
      const tlabel = document.getElementById(`label${tId}`);
      if (e.target.checked) {
        // console.log(tId, tlabel, tBtn);
        tlabel.style.textDecoration = 'line-through';
      } else {
        tlabel.style.textDecoration = 'none';
      }
    });
  });

  //   use delete btns
  const deleteBtns = document.querySelectorAll('.task-dlt-btn');
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', e => {
      const taskId = e.target.id;
      const tId = taskId.split('btn')[1];
      const taskDiv = document.getElementById(`task${tId}`);
      taskSection.removeChild(taskDiv);
    });
    break;
  }
});
