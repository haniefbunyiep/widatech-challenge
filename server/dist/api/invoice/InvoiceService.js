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
exports.createInvoiceService = void 0;
const PrismaClient_1 = require("../../config/PrismaClient");
const createInvoiceService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ customer_name, sales_person, selected_product, payment_type, }) {
    yield PrismaClient_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const findProduct = [];
        for (let item of selected_product) {
            const findProductById = yield prisma.product.findUnique({
                where: {
                    id: item.product_id,
                },
            });
            if (!findProductById)
                throw new Error(`Product for id ${item.product_id} doesn't exist`);
            findProduct.push(findProductById);
        }
        for (let i = 0; i < selected_product.length; i++) {
            if (selected_product[i].quantity > findProduct[i].stock)
                throw new Error(`Insufficient stock for ${findProduct[i].product_name} products `);
        }
        for (let i = 0; i < selected_product.length; i++) {
            yield prisma.invoice.create({
                data: {
                    order_date: new Date(),
                    customer_name,
                    payment_type,
                    quantity: selected_product[i].quantity,
                    sales_person,
                    product_id: selected_product[i].product_id,
                    total_price: selected_product[i].product_price * selected_product[i].quantity,
                },
            });
            yield prisma.product.update({
                where: {
                    id: selected_product[i].product_id,
                },
                data: {
                    stock: ((_a = findProduct[i]) === null || _a === void 0 ? void 0 : _a.stock) - selected_product[i].quantity,
                },
            });
        }
    }));
});
exports.createInvoiceService = createInvoiceService;
