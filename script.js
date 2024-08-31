const list = document.querySelector(".List");


document.querySelector(".open").addEventListener("click", () => {
    document.querySelector(".Popup").style.display = "flex";
});

document.querySelector(".red").addEventListener("click", () => {
    document.querySelector(".Popup").style.display = "none";
});

function addto() {
    const inp = document.querySelector("#input");
    if (inp.value.trim() === "") {
        alert("The input box is empty.");
    } else {
        const neww = document.createElement("div");
        neww.className = "to";
        neww.innerHTML = `
            <div class="an">
                <input type="checkbox" class="check">
                <p class="text">${inp.value}</p>
            </div>
            <p class="cancel">X</p>`;
        list.appendChild(neww);

        saveToLocalStorage();

        document.querySelector(".Popup").style.display = "none";
    }
    inp.value = "";
}

function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll(".List .to").forEach(item => {
        items.push({
            text: item.querySelector('.text').textContent,
            checked: item.querySelector('.check').checked
        });
    });
    localStorage.setItem('listItems', JSON.stringify(items));
}

function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('listItems')) || [];
    items.forEach(item => {
        const neww = document.createElement("div");
        neww.className = "to";
        neww.innerHTML = `
            <div class="an">
                <input type="checkbox" class="check" ${item.checked ? 'checked' : ''}>
                <p class="text">${item.text}</p>
            </div>
            <p class="cancel">X</p>`;
        list.appendChild(neww);
    });
}


window.addEventListener('load', loadFromLocalStorage);


list.addEventListener('change', (e) => {
    if (e.target.classList.contains('check')) {
        const div = e.target.closest('.to');
        div.querySelector('.text').textContent = "Completed!";
        div.querySelector(".check").style.display = "none";
        div.style.background = "green";
        div.style.backgroundColor="green"
        div.style.transition = "all ease 2s";
        const cancel = div.querySelector(".cancel");
        cancel.style.display = "none";
        saveToLocalStorage();
    }
});


list.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel')) {
        const targetElement = e.target.closest('.to');
        if (targetElement) {
            targetElement.remove();
            saveToLocalStorage();
        }
    }
});


document.getElementById("deleteAll").addEventListener("click", () => {
    document.querySelectorAll(".List .to").forEach(item => item.remove());
    saveToLocalStorage();
});