import { requireNotNullish } from "@particle-network/auth-core";

export const primaryGradient = ['#0070F3', '#00B4D8'];
export const primaryBg = "blue.50";
export const blackGradient = ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'];
export const successGradient = ["#56FFA4", "#32CC7A"];
export const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY
export const CONSUMER_ADDRESS = process.env.NEXT_PUBLIC_CONSUMER_ADDRESS
export const PENNYPOT_ADDRESS = process.env.NEXT_PUBLIC_PENNYPOT_ADDRESS
export const SAFELOCK_ADDRESS = process.env.NEXT_PUBLIC_SAFELOCK_ADDRESS

export const strategies = [
    {
        name: "Simple SafeLock",
        address: SAFELOCK_ADDRESS,
    },
    {
        name: "Target Savings",
        address: null,
    },
    {
        name: "Yield vault",
        address: null,
    },

]
