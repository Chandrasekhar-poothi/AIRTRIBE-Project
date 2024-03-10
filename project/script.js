document.addEventListener("DOMContentLoaded", function() {
    const notStartedColumn = document.querySelector('.not-started');
    const inProgressColumn = document.querySelector('.in-progress');
    const completedColumn = document.querySelector('.completed');

    const saveButton = document.getElementById('save-btn');
    const backButton = document.getElementById('back-btn');

    const addNewNotStarted = document.querySelector('.not-started .add-new');
    const addNewInProgress = document.querySelector('.in-progress .add-new');
    const addNewCompleted = document.querySelector('.completed .add-new');

    // Add event listeners to the "+ New" buttons
    addNewNotStarted.addEventListener('click', () => {
        navigateToDetailsPage();
    });

    addNewInProgress.addEventListener('click', () => {
        navigateToDetailsPage();
    });

    addNewCompleted.addEventListener('click', () => {
        navigateToDetailsPage();
    });

    // Function to navigate to the details.html page
    function navigateToDetailsPage() {
        window.location.href = 'details.html';
    }

    // Handle back button click event
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Go back to the task board
    });

    // Handle save button click event
    saveButton.addEventListener('click', function() {
        const title = document.getElementById('title').value;
        const status = document.getElementById('status').value;
        const description = document.getElementById('description').value;

        // Save task details to localStorage
        localStorage.setItem('taskDetails', JSON.stringify({title, status, description}));

        // Navigate back to the task board
        window.location.href = 'index.html';
    });

    // Function to handle dragging cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('dragstart', dragStart);
    });

    // Function to handle dragging start
    function dragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    // Function to allow dropping cards
    [notStartedColumn, inProgressColumn, completedColumn].forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });

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
    }
});
