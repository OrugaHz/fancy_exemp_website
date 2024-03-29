const btnForm = document.querySelector('.btn-log');
const form = document.querySelector('.popup-log-wrapper');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const btnClear = document.querySelector('.clear');
const btnSend = document.querySelector('.send');
const btnCloseForm = document.querySelector('.btn-close-popup');
const popupConfirmed = document.querySelector('.popup-confirmed');

const modalShadow = document.querySelector('.modal-shadow');



const btns = document.querySelectorAll('.btn-section1');


//1. formularz rejestracyjny + modal z informacją
const clearForm = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
}

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text')

    formBox.classList.add('error');
    errorMsg.textContent = msg;
}

const checkForm = (input) => {
    input.forEach(el => {
        if (el.value === "") {
            showError(el, el.placeholder)
        } else {
            clearForm(el)
        }
    })
}

const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} powinno składać się z ${min} znaków.`)
    }
}

const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'Hasła do siebie nie pasują!')
    }
}

const checkEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regEx.test(email.value)) {
        checkForm()
    } else {
        showError(email, 'Email jest niepoprawny!')
    }
}

const showPopup = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCounts = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCounts++;
        }
    });

    if (errorCounts === 0) {
        popupConfirmed.classList.add('show-popup');
    }
}

//1. formularz rejestracyjny + modal z informacją
btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    checkForm([username, password, password2, email]);
    checkLength(username, 3);
    checkLength(password, 8);
    checkPassword(password, password2);
    checkEmail(email);
    showPopup();
    // setTimeout(function () {
    //     web_window.close();
    // }, 1000);
});

btnClear.addEventListener('click', (e) => {
    e.preventDefault(e);

    [username, password, password2, email].forEach(el => {
        el.value = "";
        clearForm(el);
    });
})
// setTimeout(function(){web_window.close();},1000);

const handleForm = (e) => {
    e.preventDefault();
    form.classList.toggle('show-popup-log-wrapper');
};

btnCloseForm.addEventListener('click', handleForm);
btnForm.addEventListener('click', handleForm);


//////////////////
const showModal = () => {
    if (!(modalShadow.style.display === 'block')) {
        modalShadow.style.display = 'block';
    } else {
        modalShadow.style.display = 'none';
    };

    modalShadow.classList.toggle('modal-animation')
}

window.addEventListener('click', e => e.target === popupConfirmed ? showModal() : false);
// window.addEventListener('click', e => e.target === modalShadow ? showModal() : false);

// 2. Sekcja buttons z circle

const btnAnimation = e => {
    const top = e.clientY;
    const left = e.clientX;

    const btnTop = e.target.offsetTop;
    const btnLeft = e.target.offsetLeft;

    const btnAnimationTop = top - btnTop;
    const btnAnimationLeft = left - btnLeft;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = btnAnimationTop + 'px';
    circle.style.left = btnAnimationLeft + 'px';

    e.target.appendChild(circle);

    setTimeout(() => {
        circle.remove()
    }, '300');
}

btns.forEach(btn => btn.addEventListener('click', btnAnimation));