"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoice = exports.createInvoice = void 0;
const InvoiceService_1 = require("./InvoiceService");
const createInvoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_name, sales_person, selected_product, payment_type } = req.body;
        yield (0, InvoiceService_1.createInvoiceService)({
            customer_name,
            sales_person,
            selected_product,
            payment_type,
        });
        return res.status(201).send({
            error: false,
            message: 'Invoice Created',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createInvoice = createInvoice;
const getInvoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage } = req.query;
        const { totalPage, getInvoiceData } = yield (0, InvoiceService_1.getInvoiceService)(Number(currentPage));
        return res.status(200).send({
            error: false,
            message: 'Get Invoice',
            data: {
                invoiceData: getInvoiceData,
                totalPage,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getInvoice = getInvoice;
