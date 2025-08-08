let player = {
    name: "",
    class: "",
    hp: 100,
    mp: 50,
    inventory: [],
    gold: 0
};

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    intro();
}

function intro() {
    setOutput("Welcome to the Fantasy RPG!<br>First, choose your class.");
    setActions([
        { text: "Knight", action: () => chooseClass("Knight") },
        { text: "Mage", action: () => chooseClass("Mage") },
        { text: "Thief", action: () => chooseClass("Thief") }
    ]);
}

function chooseClass(chosenClass) {
    player.class = chosenClass;
    setOutput(`You are now a ${chosenClass}. Let’s start your adventure!`);
    setActions([
        { text: "Go to Battle", action: battleTutorial },
        { text: "Open Inventory", action: inventoryTutorial }
    ]);
}

function battleTutorial() {
    setOutput("Combat Tutorial: Choose Attack to damage enemies, Defend to reduce damage, Skills for special moves, and Items to heal or buff.");
    setActions([
        { text: "Attack", action: () => battleAction("attack") },
        { text: "Defend", action: () => battleAction("defend") },
        { text: "Skills", action: () => battleAction("skill") },
        { text: "Items", action: () => battleAction("item") }
    ]);
}

function battleAction(action) {
    setOutput(`You chose to ${action}. (This is a placeholder combat system.)`);
}

function inventoryTutorial() {
    setOutput("Inventory Tutorial: You can equip items to boost your stats or use them in battle. Some items can be crafted from materials.");
    setActions([
        { text: "Back", action: chooseClass.bind(null, player.class) }
    ]);
}

function setOutput(text) {
    document.getElementById("output").innerHTML = text;
}

function setActions(actions) {
    const container = document.getElementById("actions");
    container.innerHTML = "";
    actions.forEach(a => {
        let btn = document.createElement("button");
        btn.textContent = a.text;
        btn.onclick = a.action;
        container.appendChild(btn);
    });
}

function saveGame() {
    localStorage.setItem("rpgSave", JSON.stringify(player));
}

function loadGame() {
    let data = localStorage.getItem("rpgSave");
    if (data) {
        player = JSON.parse(data);
        startGame();
    } else {
        alert("No save found!");
    }
}
