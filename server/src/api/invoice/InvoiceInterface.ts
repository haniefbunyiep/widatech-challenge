import { PaymentTypes } from '@prisma/client';

export interface ProductItem {
  product_id: number;
  quantity: number;
  product_price: number;
}

type SelectedProduct = ProductItem[];

export interface CreateInvoiceParams {
  customer_name: string;
  sales_person: string;
  selected_product: SelectedProduct;
  payment_type: PaymentTypes;
}

export interface findProduct {
  id: number;
  product_name: string;
  product_price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
