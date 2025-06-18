const { taxCalculation } = require("../handlers/tax-calculation")

exports.welcomeUser = (req,res) =>{
    res.status(200).send({
        message : 'Welcome To Product Tax Calculation'
    })
}

exports.getBillReceiptWithTaxes = (req,res) => {
    let result = taxCalculation(req.body.products);
    res.status(201).send(result);
}