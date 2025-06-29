
import Order from '../models/Order.js';
import Product from '../models/Product.js';


export const getOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({}).populate('customer', 'fullName email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(400).json({ success: false, message: 'Failed to update order status' });
  }
};

export const getMyOrders = async (req, res) => {
    try {
        // Find orders belonging to the logged-in user
        const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const createOrder = async (req, res) => {
    
    const { items, address } = req.body;
    const deliveryFee = 50; 

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: "Your cart is empty." });
    }
    if (!address || address.trim() === '') {
         return res.status(400).json({ success: false, message: "A delivery location is required." });
    }

    try {
        let itemsTotal = 0;
        const orderItems = [];
        const productUpdates = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) { return res.status(404).json({ success: false, message: `Product not found.` }); }
            if (product.stock < item.quantity) { return res.status(400).json({ success: false, message: `Not enough stock for ${product.name}.` }); }

            itemsTotal += product.price * item.quantity;
            
            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                imageUrl: product.imageUrl
            });

            productUpdates.push({ updateOne: { filter: { _id: product._id }, update: { $inc: { stock: -item.quantity } } } });
        }

        const finalAmount = itemsTotal + deliveryFee;

        const newOrder = new Order({
            customer: req.user._id,
            items: orderItems,
            amount: finalAmount,
            address: address, 
        });

        await newOrder.save();
        await Product.bulkWrite(productUpdates);
        
        res.status(201).json({ success: true, message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error("Order creation failed:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
};

export const getOrderById = async (req, res) => {
  try {
   
    const order = await Order.findById(req.params.id).populate('customer', 'fullName email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching single order:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};