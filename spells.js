document.addEventListener('DOMContentLoaded', function () {
    loadSpells(); // Load spells on page load
});

function loadSpells() {
    const spellsList = document.getElementById('spells-list');
    const searchInput = document.getElementById('searchInput');

    fetch('spells.json') // Fetch the spells from the JSON file
        .then(response => response.json())
        .then(spells => {
            searchInput.value = ''; // Clear search input on page load
            displaySpells(spells);

            // Add event listener for search input
            searchInput.addEventListener('input', function () {
                const searchTerm = searchInput.value.trim().toLowerCase();
                const filteredSpells = filterSpells(spells, searchTerm);
                displaySpells(filteredSpells);
            });
        })
        .catch(error => console.error('Error fetching spells:', error));
}

function displaySpells(spells) {
    const spellsList = document.getElementById('spells-list');
    spellsList.innerHTML = '';

    const spellsByLevel = groupSpellsByLevel(spells);

    for (const level in spellsByLevel) {
        if (spellsByLevel.hasOwnProperty(level)) {
            const levelGroup = spellsByLevel[level];

            const columnContainer = document.createElement('div');
            columnContainer.classList.add('spell-column');

            const levelHeader = document.createElement('h2');
            levelHeader.textContent = `Level ${level}`;
            columnContainer.appendChild(levelHeader);

            const spellList = document.createElement('ul');
            spellList.classList.add('spell-list');

            for (const spell of levelGroup) {
                const listItem = document.createElement('li');
                listItem.textContent = spell.name;
                spellList.appendChild(listItem);
            }

            columnContainer.appendChild(spellList);
            spellsList.appendChild(columnContainer);
        }
    }
}

function groupSpellsByLevel(spells) {
    return spells.reduce((grouped, spell) => {
        const level = spell.level;
        if (!grouped[level]) {
            grouped[level] = [];
        }
        grouped[level].push(spell);
        return grouped;
    }, {});
}


function filterSpells(spells, searchTerm) {
    return spells.filter(spell => spell.name.toLowerCase().includes(searchTerm));
}
