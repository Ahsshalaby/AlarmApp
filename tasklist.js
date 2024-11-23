// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var button = document.createElement("BUTTON");
//   var txt = document.createTextNode("\u00D7");
//   button.className = "close";
//   button.appendChild(txt);
//   myNodelist[i].appendChild(button);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("inputText").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("list").appendChild(li);
//   }
//   document.getElementById("inputText").value = "";

//   var button = document.createElement("BUTTON");
//   var txt = document.createTextNode("\u00D7");
//   button.className = "close";
//   button.appendChild(txt);
//   li.appendChild(button);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// } 

let lastDeletedTask = null; // Variable to store the last deleted task

function newElement() {
  const taskTitle = document.getElementById('inputText').value;
  const taskDate = document.getElementById('taskDate').value;

  if (taskTitle && taskDate) {
    addTaskToList(taskTitle, taskDate);
    if (calendar) {
      addTaskToCalendar(taskTitle, taskDate);
    }

    // Save task to localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title: taskTitle, start: taskDate, allDay: true });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    alert("Please enter both a task and a date.");
  }
}

function addTaskToList(title, date) {
  const li = document.createElement("li");
  li.textContent = `${title} - ${date}`;
  document.getElementById("list").appendChild(li);

  // Add delete button for task
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.onclick = function () {
    // Attempt to set lastDeletedTask and immediately log it
    lastDeletedTask = { title, date, element: li };
    console.log("After setting lastDeletedTask:", lastDeletedTask); // Check if this logs correctly
    li.remove(); // Remove the task from the list visually
    showUndoButton(); // Show the Undo button after deleting
  };
  li.appendChild(deleteBtn);
}



function showUndoButton() {
  const undoBtn = document.getElementById("undoBtn");
  undoBtn.style.display = "inline"; // Show the Undo button
  setTimeout(() => {
    undoBtn.style.display = "none"; // Hide the Undo button after 5 seconds
    lastDeletedTask = null; // Clear the last deleted task after timeout
  }, 5000);
}

function undoDelete() {
  console.log("undoDelete called"); // Check if this is printed when clicking "Undo"
  console.log("lastDeletedTask:", lastDeletedTask); // Check if lastDeletedTask has the expected data

  if (lastDeletedTask) {
    const { title, date, element } = lastDeletedTask;
    console.log(`Restoring task: ${title} - ${date}`);

    // Re-add the task to the list
    document.getElementById("list").appendChild(element);

    // Add the task back to the calendar
    addTaskToCalendar(title, date);

    // Restore the task in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, start: date, allDay: true });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Hide the Undo button and clear the last deleted task
    document.getElementById("undoBtn").style.display = "none";
    lastDeletedTask = null;
  }

}

