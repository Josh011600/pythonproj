let taskId = 1;
        function addTask() {
            const tableBody = document.querySelector("#taskTable tbody");
            const taskInput = document.getElementById("add_task");
            const dateInput = document.getElementById("party");
            const taskName = taskInput.value.trim();
            const scheduleDate = dateInput.value;
            const today = new Date().toLocaleString();
            if (taskName === "" || scheduleDate === "") {
                alert("Please enter a task and select a date.");
                return;
            }
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${today}</td>
                <td>${taskId}</td>
                <td>${taskName}</td>
                <td>${scheduleDate}</td>
                <td>
                    <button onclick="editTask(this)" style="font-size: 1rem">Edit</button>
                    <button onclick="removeTask(this)" style="font-size: 1rem">Remove</button>
                </td>
            `;
            tableBody.appendChild(row);
            taskInput.value = "";
            dateInput.value = "";
            taskId++;
        }
        function editTask(button) {
            const row = button.closest("tr");
            const taskCell = row.children[2];
            const newTaskName = prompt("Edit task:", taskCell.textContent);
            if (newTaskName !== null) {
                taskCell.textContent = newTaskName;
            }
        }
        function removeTask(button) {
            const row = button.closest("tr");
            row.remove();
        }
        function toggleNavbar() {
            const navbar = document.getElementById('navbar');
            const content = document.getElementById('content');
            const toggleBtn = document.querySelector('.toggle-nav-btn');
            navbar.classList.toggle('hidden');
            content.classList.toggle('shifted');
            if (navbar.classList.contains('hidden')) {
                toggleBtn.innerHTML = '☰';
                toggleBtn.style.left = '10px';
            } else {
                toggleBtn.innerHTML = '✖';
                toggleBtn.style.left = '260px';
            }
        }


        function toggleContent(page) {
            if (page === 'view') {
                fetch('/view')
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById('content').innerHTML = html;
                    })
                    .catch(error => {
                        console.error('Failed to load tasks:', error);
                    });
            } else {
                document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
                const target = document.getElementById(page);
                if (target) target.style.display = 'block';
            }
        }
        

// Default page to show on load
document.addEventListener('DOMContentLoaded', () => {
    toggleContent('home');
});

// Function to add tasks
function addTask() {
    const taskName = document.getElementById('add_task').value;
    const scheduleDate = document.getElementById('party').value;
    const taskTable = document.querySelector('#taskTable tbody');

    if (!taskName || !scheduleDate) {
        alert('Please fill in both fields before adding a task.');
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${new Date().toLocaleString()}</td>
        <td>${Math.floor(Math.random() * 1000)}</td>
        <td>${taskName}</td>
        <td>${scheduleDate}</td>
        <td>
            <button class="remove_btn" onclick="removeTask(this)">Remove</button>
        </td>
    `;

    taskTable.appendChild(row);
}

// Function to move removed tasks to "Failed Tasks"
function removeTask(button) {
    const row = button.parentElement.parentElement; // Get the row to remove
    const failedTasksSection = document.getElementById('failedTasks');

    const failedTaskRow = document.createElement('div');
    failedTaskRow.classList.add('failed-task-item');
    failedTaskRow.innerHTML = `
        <table>
            <tr>
                <td>${row.children[0].textContent}</td>
            </tr>
            <tr>
                <td>${row.children[3].textContent}</td>
            </tr>
            <tr>
                <td>Failed</td>
            </tr>
        </table>
    `;

    failedTasksSection.appendChild(failedTaskRow); // Move to Failed Tasks
    row.remove(); // Remove from Task List
}


/*Toogle navs end */