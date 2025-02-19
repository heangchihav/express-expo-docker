import { Request, Response } from "express";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";
import axios from "axios";

export const addDomain = async (req: Request, res: Response) => {
    const { domainName } = req.body;
    const user = req.user as User;
    const userId = user?.id;

    try {
        // 1️⃣ Validate User and Fetch Merchant with Cloudflare Account
        const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                merchant: {
                    include: { cloudflareAccounts: true },
                },
            },
        });

        if (!dbUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!dbUser.merchant) {
            return res.status(400).json({ error: "User is not associated with any merchant" });
        }

        // 2️⃣ Ensure Merchant has at least one Cloudflare Account
        const cloudflareAccount = dbUser.merchant.cloudflareAccounts[0]; // Use the first Cloudflare account
        if (!cloudflareAccount) {
            return res.status(400).json({ error: "Merchant does not have a Cloudflare account" });
        }

        const cloudflareApiKey = cloudflareAccount.apiKey;
        const cloudflareAccountId = cloudflareAccount.accountId;
        const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4'

        // 4️⃣ Register Domain with Cloudflare API
        const response = await axios.post(
            CLOUDFLARE_API_URL + '/zones',
            { name: domainName, account: { id: cloudflareAccountId }, jump_start: true },
            { headers: { Authorization: `Bearer ${cloudflareApiKey}`, "Content-Type": "application/json" } }
        );

        if (!response.data.success) {
            return res.status(400).json({ error: "Failed to register domain with Cloudflare" });
        }

        const ns1 = response.data.result.name_servers?.[0] ?? null;
        const ns2 = response.data.result.name_servers?.[1] ?? null;

        // 5️⃣ Store Domain in Database
        const newDomain = await prisma.domain.create({
            data: {
                name: domainName,
                ns1,
                ns2,
                cloudflareAccountId: cloudflareAccount.id,
                addedById: userId,
            },
        });

        return res.json({ success: true, domain: newDomain });

    } catch (error) {
        console.error("Error adding domain:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
