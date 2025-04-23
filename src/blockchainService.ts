import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, Wallet, Idl } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import fs from 'fs';
import os from 'os';
import idlJson from "./order_manager.json"; // **COPY IDL HERE**
import { OrderManager } from './types/order_manager'; // **COPY TYPES HERE**
import { OrderStatus, OrderData } from "./types"; // Import shared types



const RPC_ENDPOINT = "https://devnet.helius-rpc.com/?api-key=b5c39727-26dc-4974-aaee-31388a50e9bc";

const connection = new Connection(RPC_ENDPOINT, {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 60 * 1000, // 1 minute
});

const programId = new PublicKey("EHxoxzqUShPuJbcSVFvqAVizLJxUpENTKnMBUGKSgQkc");

const adminKeypairPath = "~/.config/solana/id.json"; // Or your specific admin keypair path

// --- Load Admin Keypair ---
function loadKeypair(path: string): Keypair {
    const fullPath = path.startsWith('~') ? path.replace('~', os.homedir()) : path;
    if (!fs.existsSync(fullPath)) throw new Error(`Keypair file not found: ${fullPath}`);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    return Keypair.fromSecretKey(Uint8Array.from(data));
}
const adminKeypair = loadKeypair(adminKeypairPath);
const adminWallet = new Wallet(adminKeypair);

const provider = new AnchorProvider(connection, adminWallet, { commitment: "confirmed" });
const program = new Program<OrderManager>(idlJson as OrderManager,provider);

// --- PDA Helpers ---
const findConfigPDA = (): [PublicKey, number] => PublicKey.findProgramAddressSync([Buffer.from("config")], program.programId);
const findOrderStatePDA = (tradeId: anchor.BN): [PublicKey, number] => PublicKey.findProgramAddressSync([Buffer.from("order"), tradeId.toArrayLike(Buffer, "le", 8)], program.programId);

console.log("Blockchain Service Loaded:");
console.log("  Program ID:", programId.toBase58());
console.log("  Admin Pubkey:", adminKeypair.publicKey.toBase58());

// --- Service Functions ---

// Fetch ALL order states (DEMO ONLY - VERY INEFFICIENT)
export async function getAllOrderStates(): Promise<OrderData[]> {
    try {
        const orderAccounts = await program.account.orderState.all();
        console.log(`Fetched ${orderAccounts.length} order accounts`);
        // Map to simplified OrderData structure for API response
        return orderAccounts.map(acc => ({
            publicKey: acc.publicKey.toBase58(),
            buyer: acc.account.buyer.toBase58(),
            seller: acc.account.seller.toBase58(),
            mint: acc.account.mint.toBase58(),
            tradeId: acc.account.tradeId.toString(),
            orderAmount: acc.account.orderAmount.toString(),
            paidAmount: acc.account.paidAmount.toString(),
            claimedAmount: acc.account.claimedAmount.toString(),
            paymentMode: acc.account.paymentMode, // Assuming enum maps directly
            advancePercentage: acc.account.advancePercentage,
            status: acc.account.status, // Assuming enum maps directly
            createdAt: acc.account.createdAt.toString(),
            paidAt: acc.account.paidAt.toString(),
            shippedAt: acc.account.shippedAt.toString(),
            confirmedAt: acc.account.confirmedAt.toString(),
            completedAt: acc.account.completedAt.toString(),
        }));
    } catch (error) {
        console.error("Failed to fetch all order states:", error);
        return [];
    }
}


// Admin: Set Order State
export async function setOrderStateAdmin(tradeId: string | number | anchor.BN, newStatus: any): Promise<string | null> {
    const bnTradeId = new anchor.BN(tradeId);
    const [orderPDA] = findOrderStatePDA(bnTradeId);
    const [configPDA] = findConfigPDA();

    console.log(`Admin setting state for ${bnTradeId.toString()} to ${OrderStatus[newStatus]}`);

    try {
        const txSignature = await program.methods
            .setOrderState(bnTradeId, newStatus as any) // Cast status to 'any' if TypeScript complains about the enum type mismatch between import and Anchor's internal use
            .accounts({
                admin: adminKeypair.publicKey,
                orderState: orderPDA,
                configState: configPDA,
            })
            .signers([adminKeypair]) // Admin must sign
            .rpc();
        console.log(`Set state successful. Tx: ${txSignature}`);
        return txSignature;
    } catch (error) {
        console.error("Failed to set order state:", error);
        if (error instanceof anchor.AnchorError) {
            console.error("AnchorError:", error.error);
            console.error("Logs:", error.logs);
        }
        return null;
    }
}

// Add other admin functions (setAdmin, setTimes) similarly if needed
