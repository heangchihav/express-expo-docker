import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import prisma from '@/libs/prisma';

export const addCloudflareAccount = async (req: Request, res: Response) => {
    const { accountId, apiKey } = req.body;
    const user = req.user as User;
    const merchantId = user.merchantId;
    try {
        const merchant = await prisma.merchant.findUnique({ where: { id: merchantId } });
        if (!merchant) return res.status(404).json({ error: "Merchant not found" });

        const cloudflareAccount = await prisma.cloudflareAccount.create({
            data: { merchantId, accountId, apiKey },
        });

        return res.json({ success: true, cloudflareAccount });
    } catch (error) {
        console.error("Error creating Cloudflare account:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};