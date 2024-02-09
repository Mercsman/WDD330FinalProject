let inventory = [];

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inventory-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        addItem();
    });

    displayInventory();
});

document.addEventListener('DOMContentLoaded', function () {
    loadInventory(); // Load saved inventory on page load
});

function addItem() {
    const itemNameInput = document.getElementById('itemName');
    const itemName = itemNameInput.value.trim();

    if (itemName) {
        inventory.push(itemName);
        displayInventory();
        itemNameInput.value = ''; // Clear the input field

        // Save the updated inventory
        saveInventory();
    }
}

function removeItem(index) {
    inventory.splice(index, 1);
    displayInventory();

    // Save the updated inventory
    saveInventory();
}

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function loadInventory() {
    const savedInventory = localStorage.getItem('inventory');

    if (savedInventory) {
        inventory = JSON.parse(savedInventory);
        displayInventory(); // Display the loaded inventory
    }
}

function displayInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    for (let i = 0; i < inventory.length; i++) {
        const listItem = document.createElement('li');
        listItem.classList.add('inventory-item');

        const itemName = document.createElement('span');
        itemName.textContent = inventory[i];

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function () {
            removeItem(i);
        });

        listItem.appendChild(itemName);
        listItem.appendChild(removeButton);
        inventoryList.appendChild(listItem);
    }
}