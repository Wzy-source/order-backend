import express, { Request, Response, RequestHandler } from 'express'; // Import RequestHandler
import cors from 'cors';
import dotenv from 'dotenv';
import { PublicKey } from '@solana/web3.js';
import { Product, OrderStatus, OrderData } from './types';
import { getAllOrderStates, setOrderStateAdmin } from './blockchainService';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- In-Memory Product "Database" ---
let products: Product[] = [
    { id: uuidv4(), name: "Demo Widget A", priceLamports: "15000000", seller: "SellerPublicKeyA...", imageUrl: "https://via.placeholder.com/150/92c952" },
    { id: uuidv4(), name: "Demo Gadget B", priceLamports: "25000000", seller: "SellerPublicKeyB...", imageUrl: "https://via.placeholder.com/150/771796" },
];

// --- API Endpoints ---

// == Product Endpoints ==
// No change needed for sync handlers usually
app.get('/products', (req: Request, res: Response) => {
    console.log("GET /products request received");
    res.json(products);
});

app.post('/products', (async (req: Request, res: Response) => {
    console.log("POST /products request received", req.body);
    const { name, priceLamports, seller, imageUrl } = req.body;
    if (!name || !priceLamports || !seller) {
        return res.status(400).json({ error: "Missing required fields: name, priceLamports, seller" });
    }
    const newProduct: Product = {
        id: uuidv4(),
        name,
        priceLamports,
        seller, // Should be seller's PublicKey string
        imageUrl: imageUrl || `https://via.placeholder.com/150/${Math.random().toString(16).substr(-6)}`
    };
    products.push(newProduct);
    console.log("Added new product:", newProduct);
    res.status(201).json(newProduct);
}) as RequestHandler );

// == Order Endpoints (Mainly for Admin/Fetching All) ==
// Explicitly type the async handler with RequestHandler
app.get('/orders/all', (async (req: Request, res: Response) => { // Wrap async logic
    console.log("GET /orders/all request received");
    try {
        const orders = await getAllOrderStates();
        res.json(orders);
    } catch (error) {
        console.error("Error in /orders/all:", error);
        res.status(500).json({ error: "Failed to fetch all orders." });
    }
}) as RequestHandler); // Cast the whole async IIFE to RequestHandler

// == Admin Endpoint ==
// Explicitly type the async handler
app.post('/admin/orders/:tradeId/set-state', (async (req: Request, res: Response) => { // Wrap async logic
    const { tradeId } = req.params;
    const { status } = req.body;
    console.log(`POST /admin/orders/${tradeId}/set-state request received with status: ${status}`);

    if (!tradeId || !status) {
        // Ensure response methods are returned or function exits
        return res.status(400).json({ error: "Missing tradeId or status" });
    }

    let targetStatus: OrderStatus;
    if (status === 'Shipped') {
        targetStatus = OrderStatus.Shipped;
    } else if (status === 'Signed') {
        targetStatus = OrderStatus.Signed;
    } else {
        return res.status(400).json({ error: "Invalid status value. Use 'Shipped' or 'Signed'." });
    }

    try {
        const txSignature = await setOrderStateAdmin(tradeId, targetStatus);
        if (txSignature) {
            res.json({ success: true, signature: txSignature });
        } else {
            res.status(500).json({ error: "Failed to set order state via blockchain service." });
        }
    } catch(error) {
        console.error(`Error setting state for ${tradeId}:`, error);
        res.status(500).json({ error: "Internal server error during state update." });
    }
}) as RequestHandler); // Cast the whole async IIFE to RequestHandler


app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
