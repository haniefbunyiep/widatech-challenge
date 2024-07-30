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
const PrismaClient_1 = require("./../config/PrismaClient");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield PrismaClient_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.product.createMany({
            data: [
                {
                    product_name: 'Book',
                    product_price: 10000,
                    stock: 20,
                    image_url: 'https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=',
                },
                {
                    product_name: 'Pencil',
                    product_price: 15000,
                    stock: 25,
                    image_url: 'https://media.istockphoto.com/id/1216610305/vector/pencil-icon-eraser-pen-flat-design-and-back-to-school-concept-on-white-background.jpg?s=612x612&w=0&k=20&c=mICIEriPcqGMPydZM1_gayHn4vuUK2KydQ8iygXFG7w=',
                },
                {
                    product_name: 'Eraser',
                    product_price: 8000,
                    stock: 40,
                    image_url: 'https://media.istockphoto.com/id/1391798346/id/vektor/ikon-penghapus.jpg?s=612x612&w=0&k=20&c=tCxKYJ_szOp-tZm4VdIjOMjgt6VNZhRLOgruwYmu81k=',
                },
            ],
        });
        const products = yield tx.product.findMany({
            where: {
                product_name: {
                    in: ['Book', 'Pencil', 'Eraser'],
                },
            },
        });
        const productMap = {};
        products.forEach((product) => {
            productMap[product.product_name] = {
                id: product.id,
                product_price: product.product_price,
            };
        });
        yield tx.invoice.createMany({
            data: [
                {
                    customer_name: 'Nabil',
                    order_date: new Date(),
                    payment_type: 'CREDIT',
                    product_id: productMap['Book'].id,
                    quantity: 3,
                    sales_person: 'Admin 1',
                    total_price: 3 * productMap['Book'].product_price,
                },
                {
                    customer_name: 'Nabil',
                    order_date: new Date(),
                    payment_type: 'CREDIT',
                    product_id: productMap['Pencil'].id,
                    quantity: 2,
                    sales_person: 'Admin 1',
                    total_price: 2 * productMap['Pencil'].product_price,
                },
                {
                    customer_name: 'Nabil',
                    order_date: new Date(),
                    payment_type: 'CASH',
                    product_id: productMap['Eraser'].id,
                    quantity: 5,
                    sales_person: 'Admin 1',
                    total_price: 5 * productMap['Eraser'].product_price,
                },
                {
                    customer_name: 'Given',
                    order_date: new Date(),
                    payment_type: 'NOTCASHORCREDIT',
                    product_id: productMap['Pencil'].id,
                    quantity: 5,
                    sales_person: 'Admin 3',
                    total_price: 5 * productMap['Pencil'].product_price,
                },
                {
                    customer_name: 'Given',
                    order_date: new Date(),
                    payment_type: 'CASH',
                    product_id: productMap['Eraser'].id,
                    quantity: 5,
                    sales_person: 'Admin 3',
                    total_price: 5 * productMap['Eraser'].product_price,
                },
                {
                    customer_name: 'Given',
                    order_date: new Date(),
                    payment_type: 'CASH',
                    product_id: productMap['Book'].id,
                    quantity: 5,
                    sales_person: 'Admin 2',
                    total_price: 5 * productMap['Book'].product_price,
                },
                {
                    customer_name: 'Jeremy',
                    order_date: new Date(),
                    payment_type: 'NOTCASHORCREDIT',
                    product_id: productMap['Pencil'].id,
                    quantity: 5,
                    sales_person: 'Admin 2',
                    total_price: 5 * productMap['Pencil'].product_price,
                },
                {
                    customer_name: 'Jeremy',
                    order_date: new Date(),
                    payment_type: 'CASH',
                    product_id: productMap['Eraser'].id,
                    quantity: 5,
                    sales_person: 'Admin 2',
                    total_price: 5 * productMap['Eraser'].product_price,
                },
            ],
        });
    }));
});
main()
    .catch((error) => {
    console.log(error);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield PrismaClient_1.prisma.$disconnect();
}));
