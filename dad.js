document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.box');
    const droppables = document.querySelectorAll('.droppable');
    const itemPool = document.getElementById('item-pool');
    const totalItems = draggables.length;

    // Attach Drag Start & End listeners to all draggable items
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', draggable.id);
            draggable.classList.add('draggableFormat');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('draggableFormat');
        });
    });

    // Configure drop zones
    droppables.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');

            const id = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);

            if (!draggedElement) return;

            const targetCategory = zone.getAttribute('data-category');
            const itemCategory = draggedElement.getAttribute('data-category');

            // Validate match
            if (targetCategory === itemCategory) {
                zone.appendChild(draggedElement);
                checkWinCondition();
            } else {
                // Flash error shake animation on wrong category
                draggedElement.classList.add('shake');
                setTimeout(() => {
                    draggedElement.classList.remove('shake');
                }, 400);
            }
        });
    });

    // Allow items to be dragged back to the top pool area
    itemPool.addEventListener('dragover', (e) => e.preventDefault());
    itemPool.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        if (draggedElement) {
            itemPool.appendChild(draggedElement);
        }
    });

    // Win condition check
    function checkWinCondition() {
        let correctlyPlaced = 0;
        droppables.forEach(zone => {
            const category = zone.getAttribute('data-category');
            const items = zone.querySelectorAll('.box');
            items.forEach(item => {
                if (item.getAttribute('data-category') === category) {
                    correctlyPlaced++;
                }
            });
        });

        if (correctlyPlaced === totalItems) {
            setTimeout(() => {
                document.getElementById('win-modal').classList.add('show');
            }, 300);
        }
    }
});
