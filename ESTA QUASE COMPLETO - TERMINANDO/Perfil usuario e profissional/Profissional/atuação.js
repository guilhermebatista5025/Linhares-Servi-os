// lista inicial de profissões
const professions = [
    "Eletricista",
    "Encanador",
    "Pedreiro",
    "Carpinteiro",
    "Pintor",
    "Serralheiro",
    "Jardineiro"
];

const searchInput = document.getElementById("searchInput");
const optionsBox = document.getElementById("optionsBox");
const selectedArea = document.getElementById("selectedArea");

let selected = [];

function renderOptions(filter = "") {
    optionsBox.innerHTML = "";

    const filtered = professions.filter(item =>
        item.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("option-item");

        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox-custom");
        if (selected.includes(item)) checkbox.classList.add("checked");

        checkbox.innerHTML = selected.includes(item) ? "✓" : "";

        const text = document.createElement("span");
        text.innerText = item;

        div.appendChild(checkbox);
        div.appendChild(text);

        div.onclick = () => toggleSelect(item);

        optionsBox.appendChild(div);
    });

    if (filtered.length > 0) {
        optionsBox.classList.remove("hidden");
    } else {
        optionsBox.classList.add("hidden");
    }
}

function toggleSelect(item) {
    if (selected.includes(item)) {
        selected = selected.filter(i => i !== item);
    } else {
        selected.push(item);
    }

    renderOptions(searchInput.value);
    renderSelected();
}

function renderSelected() {
    selectedArea.innerHTML = "";

    selected.forEach(item => {
        const tag = document.createElement("div");
        tag.classList.add("tag");

        tag.innerHTML = `${item} <span onclick="removeSelected('${item}')">X</span>`;

        selectedArea.appendChild(tag);
    });
}

function removeSelected(item) {
    selected = selected.filter(i => i !== item);
    renderOptions(searchInput.value);
    renderSelected();
}

// mostra a lista conforme digita
searchInput.addEventListener("input", e => {
    if (e.target.value.trim() === "") {
        optionsBox.classList.add("hidden");
        return;
    }
    renderOptions(e.target.value);
});

// abre lista ao focar
searchInput.addEventListener("focus", () => {
    renderOptions(searchInput.value);
    optionsBox.classList.remove("hidden");
});

// fecha lista ao clicar fora
document.addEventListener("click", e => {
    if (!optionsBox.contains(e.target) && e.target !== searchInput) {
        optionsBox.classList.add("hidden");
    }
});
