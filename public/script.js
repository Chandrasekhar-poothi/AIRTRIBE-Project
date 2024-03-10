document.addEventListener("DOMContentLoaded", function() {
    // Function to handle navigating to details page when clicking on a task
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.id;
            window.location.href = `details.html?id=${taskId}`;
        });
    });

    // Function to update the count of cards in each column
    function updateCardCount() {
        const notStartedCount = document.querySelectorAll('.not-started .card').length;
        const inProgressCount = document.querySelectorAll('.in-progress .card').length;
        const completedCount = document.querySelectorAll('.completed .card').length;
        
        document.querySelector('.not-started .count').textContent = notStartedCount;
        document.querySelector('.in-progress .count').textContent = inProgressCount;
        document.querySelector('.completed .count').textContent = completedCount;
    }

    // Call the function to update counts initially
    updateCardCount();

    // Function to handle dragging cards
    function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    // Function to allow dropping cards
    function allowDrop(e) {
        e.preventDefault();
    }

    // Function to handle dropping cards
    function drop(e) {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("text/plain");
        const card = document.getElementById(cardId);
        const destinationColumn = e.target.closest('.column');
        destinationColumn.appendChild(card);

        // Update card counts after dropping
        updateCardCount();
    }

    // Assign dragstart event listener to all cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('dragstart', dragStart);
    });

    // Add event listeners to the "+ New" buttons to navigate to details page
    document.querySelectorAll('.add-new').forEach(button => {
        button.addEventListener('click', function() {
            const status = this.closest('.column').id;
            window.location.href = `details.html?status=${status}`;
        });
    });
});

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
        } else {
            // Generate a unique ID for the new task
            const newTaskId = '_' + Math.random().toString(36).substr(2, 9);
            // Create new task object
            const newTask = { id: newTaskId, title, status, description };
            // Add new task to localStorage
            taskDetails[newTaskId] = newTask;
            localStorage.setItem('tasks', JSON.stringify(taskDetails));
            // Add new task to the index page
            const notStartedColumn = document.querySelector('.not-started');
            const newTaskCard = document.createElement('div');
            newTaskCard.className = 'card';
            newTaskCard.id = newTaskId;
            newTaskCard.textContent = title;
            notStartedColumn.appendChild(newTaskCard);
            // Update card counts after adding new task
            updateCardCount();
        }

        // Navigate back to the task board
        window.location.href = 'index.html';
    });

    // Delete button event listener
    const deleteButton = document.getElementById('delete-btn');
    deleteButton.addEventListener('click', function() {
        if (confirm("Are you sure you want to delete this task?")) {
            delete taskDetails[taskId];
            localStorage.setItem('tasks', JSON.stringify(taskDetails));
            window.location.href = 'index.html';
        }
    });
});
