$(document).ready(function () {
    $('.question-icon').popover({
        placement: 'top',
        trigger: 'click',
        html: true
    });
});

function submitForm() {
    const age = $('#age').val();
    const income = parseFloat($('#income').val());
    const extraIncome = parseFloat($('#extraIncome').val());
    const deductions = parseFloat($('#deductions').val());

    let hasError = false;
    if (!age) {
        setError('age', 'Age is required');
        hasError = true;
    }
    if (isNaN(income)) {
        setError('income', 'Please enter numbers only');
        hasError = true;
    }
    if (isNaN(extraIncome)) {
        setError('extraIncome', 'Please enter numbers only');
        hasError = true;
    }
    if (isNaN(deductions)) {
        setError('deductions', 'Please enter numbers only');
        hasError = true;
    }
    if (hasError) {
        return;
    }

    clearErrors();

    const overallIncome = income + extraIncome - deductions;
    let tax = 0;
    let taxMessage = '';

    if (overallIncome > 800000) {
        const taxableIncome = income - 800000;
        switch (age) {
            case '<40':
                tax = taxableIncome * 0.3;
                break;
            case '≥40&<60':
                tax = taxableIncome * 0.4;
                break;
            case '≥60':
                tax = taxableIncome * 0.1;
                break;
        }
        taxMessage = `<h3 class="text-center">Your Overall income will be</h3><h4>${income.toFixed(2)-tax}₹</h4><h5>after tax detection.</h5>`;
    } else {
        taxMessage = `<h4 class="text-center">You do not have to pay any income tax</h4><h5>Total Income:${overallIncome.toFixed(2)}₹</h5>.`;
    }
    

    $('#modalBody').html(`<p>${taxMessage}</p>`);
    $('#resultModal').modal('show');
}

function setError(inputId, message) {
    const input = $(`#${inputId}`);
    const errorIcon = input.next('.error-icon');
    errorIcon.css('display', 'inline-block');
    errorIcon.attr('title', message);
}

function clearErrors() {
    $('.error-icon').css('display', 'none');
    $('.error-icon').attr('title', '');
}



var timeoutID; 
function showMessage(message, element, show) {
    var messageBox = document.getElementById('messageBox');
    messageBox.innerText = message;
    var iconRect = element.getBoundingClientRect();
    if (show) {
        messageBox.style.display = 'block';
        messageBox.style.top = (iconRect.top - messageBox.offsetHeight) + 'px';
        messageBox.style.left = (iconRect.left + (iconRect.width / 2) - (messageBox.offsetWidth / 2)) + 'px';
        
        clearTimeout(timeoutID);
        
        timeoutID = setTimeout(function() {
            messageBox.style.display = 'none';
        }, 5000); 
    } else {
        messageBox.style.display = 'none';
    }
}

