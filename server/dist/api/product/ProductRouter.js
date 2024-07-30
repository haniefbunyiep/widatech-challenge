"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("./ProductController");
const router = (0, express_1.Router)();
router.get('/', ProductController_1.getProduct);
exports.default = router;
