let input = require('sync-input');

let currencyList = {
    USD : 1.0,
    JPY : 113.5,
    EUR : 0.89,
    RUB : 74.36,
    GBP: 0.75,
};

mainApp();

function mainApp() {
    offerMessage(currencyList);
    while (true) {
        printMenu();
        let option = input();
        switch (option) {
            case "1":
                break;
            case "2":
                console.log("Have a nice day!");
                return;
            default:
                console.log("Unknown input");
                continue;
        }

        while (true) {
            let isSuccessful = processWithConversion();
            if (isSuccessful) {
                break;
            }
        }
    }
}

function offerMessage(currencyList) {
    console.log('Welcome to Currency Converter!');
    for (const currency in currencyList) {
        console.log(`1 USD equals ${currencyList[currency]} ${currency}`);
    }
}

function printMenu() {
    console.log("What do you want to do?");
    console.log("1-Convert currencies 2-Exit program");
}

function processWithConversion() {
    console.log('What do you want to convert?');
    let currency1 = input('From: ').toUpperCase();
    if (!validateCurrency(currency1)) {
        return false;
    }
    let currency2 = input('To: ').toUpperCase();
    if (!validateCurrency(currency2)) {
        return false;
    }
    let amount = Number(input('Amount: '));
    if (!validateAmount(amount)) {
        return false;
    }
    convert(currency1, currency2, amount);
    return true;
}

function validateCurrency(currency) {
    let isValid = currency in currencyList;
    if (!isValid) {
        console.log('Unknown currency');
        return false;
    }
    return true;
}

function validateAmount(amount) {
    if (isNaN(amount)) {
        console.log('The amount has to be a number');
        return false;
    }
    if (amount < 1) {
        console.log('The amount cannot be less than 1');
        return false;
    }
    return true;
}

function convert(currency1, currency2, amount) {
    let convertedAmount = amount / currencyList[currency1] * currencyList[currency2];
    console.log(`Result: ${amount} ${currency1} equals ${(convertedAmount).toFixed(4)} ${currency2}`);
}
