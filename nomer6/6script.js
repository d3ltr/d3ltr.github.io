const food_prices = {
    "Лук репчатый": 30,
    "Картошка": 35,
    "Морковь": 23,
};

const potato_prices = {
    "Молодая": 25,
    "Обычная": 0
};

function updatePrice() {
    let VALUE = 0;
    let radios = document.getElementsByName("r");
    let radio_val = "Лук репчатый";

    radios.forEach((radio) => {
        if(radio.checked) {
            radio_val = radio.value;
            let radio_price = food_prices[radio.value];

            if (radio_price !== undefined) {
                VALUE += radio_price;
            }
        }
    });

    let sel = document.getElementById("add");
    sel.style.display = (radio_val == "Картошка") ? "block" : "none";
    let selection = document.getElementById("additional");

    VALUE += potato_prices[selection.value];

    let check = document.getElementById("check");
    check.style.display = (radio_val == "Морковь" ? "block" : "none");

    document.getElementById("checkbox").checked ? VALUE += 25 : null; 

    let input = document.getElementById("summa-usl");
    (input.value !== undefined) ?
        /^[0-9]+$/.test(input.value) ? VALUE *= Number(input.value) : null : null;

    document.getElementById("result-usl").innerHTML = `${VALUE} Рублей`;
}

function reset() {
    document.getElementById("additional").value = "Обычная";
    document.getElementById("checkbox").checked = false;
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded");
    reset();
    let radios = document.getElementsByName("r");

    let additionals = document.getElementById("add");
    let additional_select = document.getElementById("additional");
    let check = document.getElementById("check");
    let input = document.getElementById("summa-usl");

    additional_select.value="Обычная";

    additionals.style.display = "none";
    check.style.display = "none";

    input.addEventListener("input", () => {
        updatePrice();
    })

    additional_select.addEventListener("change", (event) => {
        updatePrice();
    });

    radios.forEach((radio) => {
        radio.checked = false;
        radio.addEventListener("change", (event) => {
            reset();
            updatePrice();
        })
    });

    document.getElementById("checkbox").addEventListener("change", (event) => {
        updatePrice();
    });
});