const express = require('express');
const { welcomeUser, getBillReceiptWithTaxes } = require('../controllers/tax-calculation-controller');

const router = express.Router();

router.route('/tax-calculation').get(welcomeUser);
router.route('/tax-calculation').post(getBillReceiptWithTaxes);

module.exports = { router }