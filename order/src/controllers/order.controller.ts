import { RequestHandler } from "express";
import orderService from "../services/order.services";

const newOrder: RequestHandler = async (req, res, next) => {
    try {
        const orderData = req.body;

        const result = await orderService.newOrder(orderData);

        res.status(201).json(result)
    } catch (error) {
        console.log(error);

        next(error)
    }
}

const getOrderById: RequestHandler = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const result = await orderService.getOrderById(orderId);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const newItemsToOrder: RequestHandler = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { newItems } = req.body;

        const order = await orderService.newItemsToOrder(orderId, newItems);

        res.status(201).json(order)
    } catch (error) {
        next(error)
    }
}

const removeItemFromOrder: RequestHandler = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { productId } = req.body;

        const order = await orderService.removeItemFromOrder(orderId, productId)
        res.status(201).json(order)
    } catch (error) {
        next(error)
    }
}

const confirmNewOrder: RequestHandler = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const order = await orderService.confirmNewOrder(orderId)
        res.status(201).json(order)

    } catch (error) {
        next(error)
    }
}

const completeOrder:RequestHandler = async(req,res,next) => {
    try {
        const { orderId } = req.params;
        const { paymentMethod } = req.body;
        
        const order = await orderService.completeOrder(orderId,paymentMethod)
        res.status(201).json(order) 
    } catch (error) {
        next(error)
    }
}

const updateQuantity: RequestHandler = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { productId, quantity } = req.body;

        const order = await orderService.updateQuantity(orderId, productId, quantity);
        res.status(201).json(order)
    } catch (error) {
        next(error)
    }
}

const deleteOrder: RequestHandler = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const result = await orderService.deleteOrder(orderId)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const orderController = {
    newOrder,
    getOrderById,
    newItemsToOrder,
    removeItemFromOrder,
    updateQuantity,
    deleteOrder,
    confirmNewOrder,
    completeOrder
}

export default orderController