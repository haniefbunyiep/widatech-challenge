"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InvoiceController_1 = require("./InvoiceController");
const router = (0, express_1.Router)();
router.get('/', InvoiceController_1.getInvoice);
router.post('/', InvoiceController_1.createInvoice);
exports.default = router;
