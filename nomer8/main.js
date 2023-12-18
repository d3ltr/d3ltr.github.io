function saveFormValues() {
    localStorage.setItem('fullname', document.getElementById('fullname').value);
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('phone', document.getElementById('phone').value);
    localStorage.setItem('organization', document.getElementById('organization').value);
    localStorage.setItem('message', document.getElementById('message').value);
}

function restoreFormValues() {
    document.getElementById('fullname').value = localStorage.getItem('fullname');
    document.getElementById('email').value = localStorage.getItem('email');
    document.getElementById('phone').value = localStorage.getItem('phone');
    document.getElementById('organization').value = localStorage.getItem('organization');
    document.getElementById('message').value = localStorage.getItem('message');
}


document.addEventListener("DOMContentLoaded", () => {
    let popup = document.getElementById("popup");
    let btn = document.getElementById("popup_btn");
    let form = document.getElementById("form");
    let inputs = document.querySelectorAll("input");
    popup.style.display = "none";

    btn.addEventListener("click", () => {
        popup.style.display = "flex";
        history.pushState({"show_form": true}, "show_form", "?show_form=true")
    });

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            saveFormValues();
        })
    })


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        fetch("https://formcarry.com/s/REoprrJt5R", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(
                {
                    fullname: document.getElementById('fullname').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    organization: document.getElementById('organization').value,
                    message: document.getElementById('message').value,
                }
            )
        })
        .then((response) => {
            if(response.ok) {
                alert("Форма отправлена успешно!");
                form.reset();
                localStorage.clear();
            } else {
                throw new Error('Ошибка при отправке формы.');
            }
        })
        .catch((err) => {
            alert(err);
        })

        history.back();
    });

    window.addEventListener("popstate", () => {
        popup.style.display = "none";
    })


    restoreFormValues();
});