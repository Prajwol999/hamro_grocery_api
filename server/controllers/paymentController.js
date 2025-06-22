// import axios from 'axios';
// import Order from '../models/Order.js';
// import Product from '../models/Product.js';

// // NEW: Function to initiate payment and get a redirect URL from Khalti
// export const initiateKhaltiPayment = async (req, res) => {
//     const { amount, purchase_order_id, purchase_order_name, customer_info } = req.body;
    
//     // The URL the user will be redirected to after payment
//     const return_url = 'http://localhost:5173/dashboard/khalti-verify'; // Your verification page

//     const payload = {
//         return_url,
//         website_url: process.env.FRONTEND_URL || 'http://localhost:5173',
//         amount: amount * 100, // Amount in paisa
//         purchase_order_id,
//         purchase_order_name,
//         customer_info
//     };

//     try {
//         const khaltiResponse = await axios.post(
//             "https://a.khalti.com/api/v2/epayment/initiate/",
//             payload,
//             { headers: { 'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}` } }
//         );
        
//         // Send the payment URL back to the frontend
//         res.json(khaltiResponse.data);

//     } catch(error) {
//         console.error("Khalti initiation failed:", error.response?.data || error.message);
//         res.status(500).json({ success: false, message: "Failed to initiate Khalti payment." });
//     }
// };


// // This function is called AFTER the user pays and is redirected back to our site
// export const verifyKhaltiPayment = async (req, res) => {
//     // ... This function remains as previously defined to verify the transaction
//     const { pidx, address, items } = req.body;
//     const deliveryFee = 50;

//      try {
//         const verificationResponse = await axios.post(
//             "https://a.khalti.com/api/v2/epayment/lookup/",
//             { pidx },
//             { headers: { 'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}` } }
//         );
        
//         if (verificationResponse.data.status === 'Completed') {
//             // Payment is successful, now create the order
//             let itemsTotal = 0;
//             const orderItems = [];
//             const productUpdates = [];

//             for (const item of items) { /* ... order creation logic as before ... */ }
//              const finalAmount = itemsTotal + deliveryFee;

//             if (finalAmount * 100 !== verificationResponse.data.amount) {
//                 return res.status(400).json({ success: false, message: "Payment amount mismatch." });
//             }

//             const newOrder = new Order({ /* ... as before ... */ paymentType: 'Online', isPaid: true });
//             await newOrder.save();
//             await Product.bulkWrite(productUpdates);
            
//             res.status(201).json({ success: true, message: "Payment verified and order created!" });
//         } else {
//             res.status(400).json({ success: false, message: "Payment not completed." });
//         }

//     } catch (error) {
//         console.error("Khalti lookup error:", error);
//         res.status(500).json({ success: false, message: "Error verifying payment." });
//     }
// };