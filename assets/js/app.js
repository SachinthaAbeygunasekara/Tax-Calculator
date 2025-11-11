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


document.getElementById('payableForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearError('payableError');

    const salary = document.getElementById('monthlySalary').value;

    const error = validateNumber(salary, 'Salary');
    if (error) {
        showError('payableError', error);
        return;
    }

    const numSalary = parseFloat(salary);
    let totalTax = 0;
    let breakdown = '';

    const brackets = [
        { min: 0, max: 100000, rate: 0 },
        { min: 100001, max: 141667, rate: 6 },
        { min: 141668, max: 183333, rate: 12 },
        { min: 183334, max: 225000, rate: 18 },
        { min: 225001, max: 266667, rate: 24 },
        { min: 266668, max: 308333, rate: 30 },
        { min: 308334, max: Infinity, rate: 36 }
    ];

    let remaining = numSalary;
    for (let bracket of brackets) {
        if (remaining <= 0) break;

        if (numSalary > bracket.min) {
            const taxableInBracket = Math.min(remaining, bracket.max - bracket.min + 1);
            const taxInBracket = taxableInBracket * (bracket.rate / 100);

            if (bracket.rate > 0) {
                totalTax += taxInBracket;
                breakdown += `<div class="result-item">
                            <div class="result-label">${bracket.rate}% on ${formatCurrency(taxableInBracket)}</div>
                            <div class="result-value">${formatCurrency(taxInBracket)}</div>
                        </div>`;
            }

            remaining -= taxableInBracket;
        }
    }

    const netSalary = numSalary - totalTax;

    const resultHTML = `
                <h4><i class="fas fa-check-circle"></i> Monthly Tax Calculation</h4>
                <div class="result-item">
                    <div class="result-label">Gross Monthly Salary</div>
                    <div class="result-value">${formatCurrency(numSalary)}</div>
                </div>
                ${breakdown}
                <div class="result-item">
                    <div class="result-label">Total Tax</div>
                    <div class="result-value">${formatCurrency(totalTax)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Net Salary After Tax</div>
                    <div class="result-value">${formatCurrency(netSalary)}</div>
                </div>
            `;

    const resultCard = document.getElementById('payableResult');
    resultCard.innerHTML = resultHTML;
    resultCard.classList.add('show');
});

document.getElementById('incomeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearError('incomeError');

    const income = document.getElementById('annualIncome').value;

    const error = validateNumber(income, 'Income');
    if (error) {
        showError('incomeError', error);
        return;
    }

    const numIncome = parseFloat(income);
    let totalTax = 0;
    let breakdown = '';

    const brackets = [
        { min: 0, max: 1200000, rate: 0 },
        { min: 1200001, max: 1700000, rate: 6 },
        { min: 1700001, max: 2200000, rate: 12 },
        { min: 2200001, max: 2700000, rate: 18 },
        { min: 2700001, max: 3200000, rate: 24 },
        { min: 3200001, max: 3700000, rate: 30 },
        { min: 3700001, max: Infinity, rate: 36 }
    ];

    let remaining = numIncome;
    for (let bracket of brackets) {
        if (remaining <= 0) break;

        if (numIncome > bracket.min) {
            const taxableInBracket = Math.min(remaining, bracket.max - bracket.min + 1);
            const taxInBracket = taxableInBracket * (bracket.rate / 100);

            if (bracket.rate > 0) {
                totalTax += taxInBracket;
                breakdown += `<div class="result-item">
                            <div class="result-label">${bracket.rate}% on ${formatCurrency(taxableInBracket)}</div>
                            <div class="result-value">${formatCurrency(taxInBracket)}</div>
                        </div>`;
            }

            remaining -= taxableInBracket;
        }
    }

    const netIncome = numIncome - totalTax;

    const resultHTML = `
                <h4><i class="fas fa-check-circle"></i> Annual Tax Calculation</h4>
                <div class="result-item">
                    <div class="result-label">Gross Annual Income</div>
                    <div class="result-value">${formatCurrency(numIncome)}</div>
                </div>
                ${breakdown}
                <div class="result-item">
                    <div class="result-label">Total Tax</div>
                    <div class="result-value">${formatCurrency(totalTax)}</div>
                </div>
                <div class="result-item">
                    <div class="result-label">Net Income After Tax</div>
                    <div class="result-value">${formatCurrency(netIncome)}</div>
                </div>
            `;

    const resultCard = document.getElementById('incomeResult');
    resultCard.innerHTML = resultHTML;
    resultCard.classList.add('show');
});

document.getElementById('ssclForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearError('ssclError');

    const value = document.getElementById('ssclValue').value;

    const error = validateNumber(value, 'Value');
    if (error) {
        showError('ssclError', error);
        return;
    }

    const numValue = parseFloat(value);
    const saleTax = numValue * 0.025;
    const afterSaleTax = numValue + saleTax;
    const vat = afterSaleTax * 0.15;
    const sscl = saleTax + vat;

    const resultHTML = `
                <h4><i class="fas fa-check-circle"></i> SSCL Tax Breakdown</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <div class="result-label">Original Value</div>
                        <div class="result-value">${formatCurrency(numValue)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Sale Tax (2.5%)</div>
                        <div class="result-value">${formatCurrency(saleTax)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">After Sale Tax Amount</div>
                        <div class="result-value">${formatCurrency(afterSaleTax)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">VAT (15%)</div>
                        <div class="result-value">${formatCurrency(vat)}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Final SSCL Value</div>
                        <div class="result-value">${formatCurrency(sscl)}</div>
                    </div>
                </div>
            `;

    const resultCard = document.getElementById('ssclResult');
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