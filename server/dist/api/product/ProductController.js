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
exports.getProductById = exports.getProduct = void 0;
const ProductService_1 = require("./ProductService");
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const getProductResult = yield (0, ProductService_1.getProductService)(name);
        return res.status(200).send({
            error: false,
            message: 'Get Product',
            data: getProductResult,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
        console.log(req.query);
        const getProductResult = yield (0, ProductService_1.getProductByIdService)(Number(productId));
        return res.status(200).send({
            error: false,
            message: 'Get Product By Id',
            data: getProductResult,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
