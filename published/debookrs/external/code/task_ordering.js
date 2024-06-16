document.addEventListener('DOMContentLoaded', (event) => {
    let correctOrder = ["task1", "task2", "task3", "task4"];
    let userOrder = [];

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        if (ev.target.classList.contains('dropzone')) {
            ev.target.appendChild(document.getElementById(data));
            checkOrder();
        }
    }

    function checkOrder() {
        userOrder = [];
        document.querySelectorAll('.dropzone').forEach((zone) => {
            if (zone.children.length > 0) {
                userOrder.push(zone.children[0].id);
            }
        });
        if (arraysEqual(correctOrder, userOrder)) {
            document.getElementById('feedback').innerText = "Correct Order!";
        } else {
            document.getElementById('feedback').innerText = "Try Again!";
        }
    }

    function arraysEqual(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    function createDragAndDropElements() {
        const taskContainer = document.getElementById('task-container');
        const dropZoneContainer = document.getElementById('drop-zone-container');

        const tasks = [
            { id: "task1", text: "Task 1" },
            { id: "task2", text: "Task 2" },
            { id: "task3", text: "Task 3" },
            { id: "task4", text: "Task 4" },
        ];

        tasks.forEach(task => {
            const taskElement = document.createElement('p');
            taskElement.id = task.id;
            taskElement.className = 'draggable';
            taskElement.draggable = true;
            taskElement.textContent = task.text;
            taskContainer.appendChild(taskElement);

            const dropZone = document.createElement('p');
            dropZone.id = `zone${task.id.charAt(task.id.length - 1)}`;
            dropZone.className = 'dropzone';
            dropZoneContainer.appendChild(dropZone);
        });

        // Event listeners for drag and drop
        document.querySelectorAll('.draggable').forEach((item) => {
            item.addEventListener('dragstart', drag);
        });
        document.querySelectorAll('.dropzone').forEach((zone) => {
            zone.addEventListener('dragover', allowDrop);
            zone.addEventListener('drop', drop);
        });
    }

    createDragAndDropElements();
});
