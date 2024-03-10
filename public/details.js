document.addEventListener("DOMContentLoaded", function() {
    const taskId = new URLSearchParams(window.location.search).get('id');
    const taskDetails = JSON.parse(localStorage.getItem('tasks')) || {};

    // Populate task details on the page
    if (taskId && taskDetails[taskId]) {
        const { title, status, description } = taskDetails[taskId];
        document.getElementById('title').value = title;
        document.getElementById('status').value = status;
        document.getElementById('description').value = description;
    }

    // Back button event listener
    const backButton = document.getElementById('back-btn');
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Go back to the task board
    });

    // Save button event listener
    const saveButton = document.getElementById('save-btn');
    saveButton.addEventListener('click', function() {
        const title = document.getElementById('title').value;
        const status = document.getElementById('status').value;
        const description = document.getElementById('description').value;

        // Update task details in localStorage
        if (taskId) {
            taskDetails[taskId] = { title, status, description };
            localStorage.setItem('tasks', JSON.stringify(taskDetails));

            // Move the card to the corresponding column on the index page
            const card = document.getElementById(taskId);
            const destinationColumn = document.getElementById(status);
            destinationColumn.appendChild(card);

            // Navigate back to the task board
            window.location.href = 'index.html';
        }
    });

    // Delete button event listener
    const deleteButton = document.getElementById('delete-btn');
    deleteButton.addEventListener('click', function() {
        if (confirm("Are you sure you want to delete this task?")) {
            delete taskDetails[taskId];
            localStorage.setItem('tasks', JSON.stringify(taskDetails));

            // Remove the corresponding card from the index page
            const card = document.getElementById(taskId);
            card.parentNode.removeChild(card);

            window.location.href = 'index.html';
        }
    });
});
