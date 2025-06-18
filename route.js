const express = require('express');
const { welcomeUser, getBillReceiptWithTaxes } = require('./controller');

const router = express.Router();

router.route('/tax-calculation').get(welcomeUser);
router.route('/tax-calculation').post(getBillReceiptWithTaxes);

module.exports = { router }