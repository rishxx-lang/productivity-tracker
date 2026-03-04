let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            ${task.text}
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    document.getElementById("total").textContent = tasks.length;
    document.getElementById("completed").textContent =
        tasks.filter(task => task.completed).length;

    saveTasks();
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, completed: false });
    input.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();