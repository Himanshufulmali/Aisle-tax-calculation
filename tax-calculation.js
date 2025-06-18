const { checkDataValidation, roundTheAmount } = require("./utils");

// working code with broot force
// exports.taxCalculation = (products) => {
//     if (!products || !Array.isArray(products)) {
//         return {
//             error: 'Products are not avaible or it is not passed in an array'
//         }
//     }
//     let productPriceAfterTax;

//     const mapResult = products.map(data => {
//         if (
//             !data.category || !data.name || !data.price || typeof data.price !== 'number' || typeof data.isImported !== 'boolean' || data.quantity <= 0 || typeof data.quantity !== 'number'
//         ) {
//             return {
//                 error: 'Please check the request body'
//             }
//         }

//         if (data.category === 'books' || data.category === 'food' || data.category === 'medical') {

//             if (data.isImported) {
//                 let rawImportTax = data.price * (Number(process.env.IMPORT_TAX) / 100);
//                 let roundedImportTax = Math.ceil(rawImportTax * 20) / 20;

//                 productPriceAfterTax = (data.price + roundedImportTax) * data.quantity;
//                 productPriceAfterTax = productPriceAfterTax.toFixed(2);
//             }
//             else {
//                 productPriceAfterTax = data.price * data.quantity;
//                 productPriceAfterTax = productPriceAfterTax.toFixed(2);
//             }
//         }
//         else {
//             let rawSalesTax = data.price * (Number(process.env.SALES_TAX) / 100);
//             let roundedSalesTax = Math.ceil(rawSalesTax * 20) / 20;

//             let totalPriceWithSalesTax = (data.price + roundedSalesTax) * data.quantity;
//             productPriceAfterTax = totalPriceWithSalesTax;

//             if (data.isImported) {
//                 let rawImportTax = data.price * (Number(process.env.IMPORT_TAX) / 100);
//                 let roundedImportTax = Math.ceil(rawImportTax * 20) / 20;

//                 productPriceAfterTax += roundedImportTax * data.quantity;

//             }

//             productPriceAfterTax = productPriceAfterTax.toFixed(2);

//         }
//         return productPriceAfterTax;
//     });

//     for (const item of mapResult) {
//         if (typeof item === 'object' && item !== null && item.error) {
//             return {
//                 error: 'Please check the request body'
//             };
//         }
//     }

//     productPriceAfterTax = mapResult.reduce((acc, num) => {
//         acc += Number(num);
//         return acc;
//     }, 0);

//     return productPriceAfterTax.toFixed(2);
// }


/**
 *  Let's optimised it now for better readability
 */ 
const categoriesToExclude = process.env.EXCLUDE_CATEGORIES || ['food', 'medical', 'books'];
const imposedSalesTax = process.env.SALES_TAX || 10;
const imposedImportTax = process.env.IMPORT_TAX || 5;

exports.taxCalculation = (products) => {
    const checkInputFields = checkDataValidation(products);
    let totalTax = 0;
    let totalBillAmount = 0;
    let productInformationStorageArray = [];

    if (checkInputFields?.error) {
        return { error: 'Please check the input fileds' }
    }

    products.forEach((data) => {

        const productPrice = data.price;
        const productQuantity = data.quantity;
        let calculatedSalesTax = 0;
        let calculatedImportTax = 0;

        if (!categoriesToExclude.includes(data.category)) {
            calculatedSalesTax = roundTheAmount(productPrice * (imposedSalesTax / 100));
        }
        if (data.isImported) {
            calculatedImportTax = roundTheAmount(productPrice * (imposedImportTax / 100));
        }

        let taxOnEachProduct = (calculatedSalesTax + calculatedImportTax) * productQuantity;
        totalTax += taxOnEachProduct;

        let eachProductAmountAfterTax = (productPrice + calculatedSalesTax + calculatedImportTax) * productQuantity;
        totalBillAmount += eachProductAmountAfterTax;

        productInformationStorageArray.push(
            `${productQuantity} ${data.isImported ? 'imported ' : ''}${data.name}: ${eachProductAmountAfterTax.toFixed(2)}`
        )

    });

    productInformationStorageArray.push(
        `Sales taxes: ${totalTax.toFixed(2)}`, `Total: ${totalBillAmount.toFixed(2)}`
    );
    return productInformationStorageArray;

}
