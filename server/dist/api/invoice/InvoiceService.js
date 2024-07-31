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
exports.getRevenueInMonthService = exports.getRevenueByDateRangeService = exports.getInvoiceService = exports.createInvoiceService = void 0;
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
                throw new Error(`Insufficient stock for ${findProduct[i].product_name} products stock ${findProduct[i].stock} `);
        }
        for (let i = 0; i < selected_product.length; i++) {
            yield prisma.invoice.create({
                data: {
                    order_date: new Date(),
                    customer_name,
                    payment_type,
                    quantity: Number(selected_product[i].quantity),
                    sales_person,
                    product_id: selected_product[i].product_id,
                    total_price: findProduct[i].product_price * selected_product[i].quantity,
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
const getInvoiceService = (pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const LIMIT_PAGE = 5;
    const findAllInvoice = yield PrismaClient_1.prisma.invoice.findMany();
    const totalPage = Math.ceil(findAllInvoice.length / LIMIT_PAGE);
    const getInvoiceData = yield PrismaClient_1.prisma.invoice.findMany({
        include: {
            product: true,
        },
        skip: (Number(pageNumber) - 1) * LIMIT_PAGE,
        take: LIMIT_PAGE,
        orderBy: {
            order_date: 'desc',
        },
    });
    return {
        totalPage,
        getInvoiceData,
    };
});
exports.getInvoiceService = getInvoiceService;
const getRevenueByDateRangeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstDate, endDate, }) {
    var _b;
    console.log(firstDate);
    const allProducts = yield PrismaClient_1.prisma.product.findMany({
        select: {
            id: true,
            product_name: true,
        },
    });
    const productIdToName = new Map();
    for (const product of allProducts) {
        productIdToName.set(product.id, product.product_name);
    }
    const salesData = yield PrismaClient_1.prisma.invoice.groupBy({
        by: ['order_date', 'product_id'],
        _sum: {
            quantity: true,
        },
        where: {
            order_date: {
                gte: new Date(firstDate),
                lt: new Date(endDate),
            },
        },
    });
    const formattedData = {};
    for (const sale of salesData) {
        const date = sale.order_date.toISOString().split('T')[0];
        if (!formattedData[date]) {
            formattedData[date] = {
                date,
            };
        }
        const productName = productIdToName.get(sale.product_id);
        if (productName) {
            formattedData[date][productName] = (_b = sale._sum.quantity) !== null && _b !== void 0 ? _b : 0;
        }
    }
    for (const date of Object.keys(formattedData)) {
        for (const [productId, productName] of productIdToName.entries()) {
            if (!(productName in formattedData[date])) {
                formattedData[date][productName] = 0;
            }
        }
    }
    const result = Object.values(formattedData);
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return result;
});
exports.getRevenueByDateRangeService = getRevenueByDateRangeService;
const getRevenueInMonthService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstDate, endDate, }) {
    // return await prisma.invoice.groupBy({
    //   by: ['product_id'],
    //   _sum: {
    //     quantity: true,
    //   },
    //   where: {
    //     order_date: {
    //       gte: new Date(firstDate),
    //       lt: new Date(endDate),
    //     },
    //   },
    // });
    // return await prisma.invoice.groupBy({
    //   by: ['order_date'],
    //   _sum: {
    //     quantity: true,
    //   },
    //   where: {
    //     order_date: {
    //       gte: new Date(firstDate),
    //       lt: new Date(endDate),
    //     },
    //   },
    //   orderBy: {
    //     order_date: 'asc',
    //   },
    // });
    // return await prisma.invoice.groupBy({
    //   by: ['product_id'],
    //   _sum: {
    //     quantity: true,
    //   },
    //   where: {
    //     order_date: {
    //       gte: new Date(firstDate),
    //       lt: new Date(endDate),
    //     },
    //   },
    // });
    const groupedData = yield PrismaClient_1.prisma.invoice.groupBy({
        by: ['product_id'],
        _sum: {
            quantity: true,
        },
        where: {
            order_date: {
                gte: new Date(firstDate),
                lt: new Date(endDate),
            },
        },
    });
    const productIds = groupedData.map((item) => item.product_id);
    const products = yield PrismaClient_1.prisma.product.findMany({
        where: {
            id: { in: productIds },
        },
    });
    const result = groupedData.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return {
            product_name: product ? product.product_name : 'Unknown',
            total_quantity: item._sum.quantity,
        };
    });
    return result;
});
exports.getRevenueInMonthService = getRevenueInMonthService;
