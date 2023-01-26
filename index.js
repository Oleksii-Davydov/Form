const form = document.querySelector('.contact-form')

form.onchange = ({target}) => {
    if (target.matches('input')) {
        validateInput(target);
    }
}

form.onsubmit = (event) => {
    event.preventDefault()

    const elements = [...form.elements]
    const isValid = elements.reduce((acc, elem) => {
        if (elem.matches('input')) {
            const isValidField = validateInput(elem);
            return acc ? isValidField : acc;
        }
        return acc;
    }, true);

    if (isValid) {
        alert('succes')
    }

}

/**
 *
 * @param {HTMLInputElement} input
 * @return {boolean}
 */



function validateInput(input) {
    const {required, minlength, maxlength, value, nextElementSibling: validationMessage} = input;

//показывает ошибку
    function showError(text) {
        input.classList.add('is-invalid')
        validationMessage.classList.add('invalid-feedback')
        validationMessage.innerText = text;
    }

    function showSuccess () {
        validationMessage.classList.remove('invalid-feedback');
        validationMessage.innerText = '';
        input.classList.remove('is-invalid');
        input.classList.add('is-valid')
    }

// если  required и value равно пустой строке - выводим ошибке 'это поле обязательно для заполнения'
    if (required && value === '') {
        showError('This field is required')
        return false
    }

    if (!required && value === '') {
        showSuccess () ;
        return true
    }
// если мин. длина есть и мин. длина больше длины вводимого значения - выводим ошибку
    if (minlength && minlength > value.length) {
        showError(`Should have minimum ${minlength} symbols`)
        return false
    }
// если мах. длина есть и мах. длина меньше длины вводимого значения - выводим ошибку
    if (maxlength && maxlength > value.length) {
        showError(`Should have maximum ${maxlength} symbols`)
        return false
    }

    showSuccess ()
    return true;
  //  showSuccess ()

}