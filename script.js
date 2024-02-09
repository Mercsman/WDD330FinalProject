function randomRaceAndClass() {
    const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome'];
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Wizard'];

    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];

    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `<p>Random Race: ${randomRace}</p><p>Random Class: ${randomClass}</p>`;
}

function rollDice() {
    const selectedDice = document.getElementById('dice').value;
    const result = Math.floor(Math.random() * (parseInt(selectedDice.slice(1)) + 1));

    document.getElementById('dice-result').innerText = `Result: ${result}`;
}

document.addEventListener('DOMContentLoaded', function () {
    loadStats(); // Load saved stats on page load
});

function adjustStat(stat) {
    const statValueElement = document.getElementById(`${stat}-value`);
    const statValue = parseInt(statValueElement.value);

    // Validate that the entered value is a number
    if (!isNaN(statValue)) {
        // Adjust the stat value
        statValueElement.value = statValue + 1;

        // Save the updated stats
        saveStats();
    }
}

function saveStats() {
    const stats = {
        strength: document.getElementById('strength-value').value,
        dexterity: document.getElementById('dexterity-value').value,
        constitution: document.getElementById('constitution-value').value,
        intelligence: document.getElementById('intelligence-value').value,
        wisdom: document.getElementById('wisdom-value').value,
        charisma: document.getElementById('charisma-value').value,
    };

    localStorage.setItem('stats', JSON.stringify(stats));
}

function loadStats() {
    const savedStats = localStorage.getItem('stats');

    if (savedStats) {
        const stats = JSON.parse(savedStats);

        // Set the saved values to the input elements
        document.getElementById('strength-value').value = stats.strength;
        document.getElementById('dexterity-value').value = stats.dexterity;
        document.getElementById('constitution-value').value = stats.constitution;
        document.getElementById('intelligence-value').value = stats.intelligence;
        document.getElementById('wisdom-value').value = stats.wisdom;
        document.getElementById('charisma-value').value = stats.charisma;

        updateModifiers(); // Update the modifiers after loading stats
    }
}

function updateModifiers() {
    const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

    for (const stat of stats) {
        const statValue = parseInt(document.getElementById(`${stat}-value`).value);
        const modifierElement = document.getElementById(`${stat}-modifier`);
        const modifier = calculateModifier(statValue);

        modifierElement.textContent = `(${modifier})`;
    }
}

function calculateModifier(value) {
    const modifier = Math.floor((value - 10) / 2);
    return (modifier >= 0) ? `+${modifier}` : modifier.toString();
}

function toggleMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
}
