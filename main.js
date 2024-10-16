const container = document.querySelector(".container");
const eraser_ = document.querySelector(".eraser");
const clear_ = document.querySelector(".clear");
const colorMode_ = document.querySelector(".color-mode");

const colorChange = document.querySelector("#color-changer")
let clrRange = colorChange.value

const given = document.querySelector("#range");
const para = document.querySelector(".para");

let range = given.value;
let colorMode = true;

para.innerHTML = `${given.value} * ${given.value}`;
addingBox();

eraser_.addEventListener("click", () => { colorMode = false; });
clear_.addEventListener("click", clear);
colorMode_.addEventListener("click", () => { colorMode = true; });

container.addEventListener("mousemove", (e) => {
    if (e.target.classList.contains("box")) {
        if (colorMode) {
            e.target.style.background = `${clrRange}`
        } else {
            e.target.style.background = `#ffffff`
        }
    }
});

function createBox(value) {
    return value ** 2;
}

given.oninput = function() {
    range = this.value;
    para.innerHTML = `${this.value} * ${this.value}`;
    addingBox();
}

colorChange.oninput = function() {
    clrRange = this.value
    console.log(clrRange)
}


function addingBox() {
    container.style.gridTemplateColumns = `repeat(${range}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${range}, 1fr)`;

    container.innerHTML = "";
    for (let i = 1; i <= createBox(range); i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        container.appendChild(div);
    }
}

function clear() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.background = "#ffffff"
    });
}
