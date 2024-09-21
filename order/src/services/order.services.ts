import createHttpError from "http-errors";
import { CreateOrderDto, NewItem } from "../dtos/order.dto";
import { fetchProductsByIds } from "./product.services";
import Order, { IProduct } from "../models/order.model";
import { ApiResponseDto } from "../dtos/api.dto";
import { calculateTotalAmount } from "../utils/totalAmount";

const newOrder = async (orderData: CreateOrderDto) => {
    const products = await fetchProductsByIds(orderData.products.map(p => p.productId));

    if (products?.length === 0) {
        return createHttpError[400]('There is no products')
    }

    const orderedProducts = products.map((product: any) => {
        const orderItem = orderData.products.find(item => item.productId === product.id);

        return {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: orderItem ? orderItem.quantity : 0,
        };
    });

    const totalAmount = await calculateTotalAmount(orderedProducts);

    const order = new Order({
        tableId: orderData.tableId,
        companyId: orderData.companyId,
        products: orderedProducts,
        status: orderData.status,
        isNewOrder: true,
        totalAmount: totalAmount
    })

    await order.save();

    return new ApiResponseDto(true, order)
}

const getOrderById = async (orderId: string) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw createHttpError.NotFound('Order not found!')
    }

    return new ApiResponseDto(true, order)
}

const newItemsToOrder = async (orderId: string, newItems: NewItem[]) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw createHttpError(404, 'Order not found');
    }

    const productIds = newItems.map(item => item.productId);
    const products = await fetchProductsByIds(productIds);

    if (!products || products.length === 0) {
        throw createHttpError(400, 'No valid products found');
    }

    let total = order.totalAmount || 0;
    const productMap = new Map(products.map((product: any) => [product.id, product]));
    const existingProductsMap = new Map(order.products.map(p => [p.productId.toString(), p]));

    for (const newItem of newItems) {
        const newProduct: any = productMap.get(newItem.productId);
        if (newProduct) {
            const itemTotal = newProduct.price * newItem.quantity;
            const existingProduct = existingProductsMap.get(newProduct.id);

            if (existingProduct) {
                total -= existingProduct.price * existingProduct.quantity;
                existingProduct.quantity += newItem.quantity;
                total += existingProduct.price * existingProduct.quantity;
            } else {
                order.products.push({
                    productId: newProduct.id,
                    name: newProduct.name,
                    price: newProduct.price,
                    quantity: newItem.quantity
                });
                total += itemTotal;
            }
        }
    }

    order.totalAmount = total;
    order.isNewOrder = true;
    await order.save();

    return new ApiResponseDto(true, order);
};

const removeItemFromOrder = async (orderId: string, productId: string) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw createHttpError(404, 'Order not found');
    }

    order.products = order.products.filter(p => p.productId === productId);

    await order.save();

    return new ApiResponseDto(true, order)
}

const confirmNewOrder = async (orderId: string) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw createHttpError(404, 'Order not found');
    }

    order.isNewOrder = false;
    await order.save();

    return new ApiResponseDto(true, order)
}

const completeOrder = async (orderId: string, paymentMethod:string) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw createHttpError(404, 'Order not found');
    }

    order.status = "payment completed";
    order.paymentMethod = paymentMethod;
    await order.save();

    return new ApiResponseDto(true, order);
}

// Update with quantity 
const updateQuantity = async (orderId: string, productId: string, quantity: number) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw createHttpError(404, 'Order not found');
    }

    const productToUpdate = order.products.find(p => p.productId === productId);
    if (!productToUpdate) {
        throw createHttpError(404, 'Product not found in the order');
    }

    if (quantity <= 0) {
        order.products = order.products.filter(p => p.productId === productId);
    } else {
        productToUpdate.quantity = quantity;
    }

    await order.save();

    return new ApiResponseDto(true, order);
}

const deleteOrder = async (orderId: string) => {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
        throw createHttpError(404, 'Order not found');
    }

    return new ApiResponseDto(true, { message: 'Order successfully deleted!' })
}

const orderService = {
    newOrder,
    getOrderById,
    newItemsToOrder,
    removeItemFromOrder,
    updateQuantity,
    deleteOrder,
    confirmNewOrder,
    completeOrder
}

export default orderService;