document.getElementById('withholdingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearError('withholdingError');

    const amount = document.getElementById('withholdingAmount').value;
    const taxType = document.querySelector('input[name="taxType"]:checked').value;

    const error = validateNumber(amount, 'Amount');
    if (error) {
        showError('withholdingError', error);
        return;
    }

    const numAmount = parseFloat(amount);
    let tax = 0;
    let rate = 0;
    let taxName = '';

    if (taxType === 'rent') {
        taxName = 'Rent Tax';
        if (numAmount > 100000) {
            rate = 10;
            tax = numAmount * 0.10;
        }
    } else if (taxType === 'interest') {
        taxName = 'Bank Interest Tax';
        rate = 5;
        tax = numAmount * 0.05;
    } else if (taxType === 'dividend') {
        taxName = 'Dividend Tax';
        if (numAmount > 100000) {
            rate = 14;
            tax = numAmount * 0.14;
        }
    }

    const netAmount = numAmount - tax;

    const resultHTML = `
                <h4><i class="fas fa-check-circle"></i> ${taxName} Result</h4>
                <div class="result-item">
                    <div class="result-label">Gross Amount</div>
                    <div class="result-value">${formatCurrency(numAmount)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Tax Rate Applied</div>
                    <div class="result-value">${rate}%</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Tax Amount</div>
                    <div class="result-value">${formatCurrency(tax)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Net Amount After Tax</div>
                    <div class="result-value">${formatCurrency(netAmount)}</div>
                </div>
            `;

    const resultCard = document.getElementById('withholdingResult');
    resultCard.innerHTML = resultHTML;
    resultCard.classList.add('show');
});


function validateNumber(value, fieldName) {
    if (!value || value.trim() === '') {
        return `${fieldName} is required`;
    }
    if (isNaN(value) || parseFloat(value) <= 0) {
        return `${fieldName} must be a positive number`;
    }
    return null;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.remove('show');
}

function formatCurrency(amount) {
    return 'Rs. ' + parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function resetForm(form, error, result) {
    document.getElementById(form).reset();
    clearError(error);

    const resultCard = document.getElementById(result);
    if (resultCard) {
        resultCard.classList.remove('show');
        resultCard.innerHTML = '';
    }

    if (form === 'withholdingForm') {
        document.getElementById('rent').checked = true;
    }
}