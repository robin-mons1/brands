import {PrismaClient} from "@prisma/client";
// @ts-ignore
import {serverSupabaseUser} from "#supabase/server";
import { createError } from "h3";

const prisma = new PrismaClient();
export async function GetServerUser(event: any, user_id: any = null): Promise<ServerUser>  {
    if(!user_id) {
        const user = await serverSupabaseUser(event);
        user_id = user.id;
    }

    if(!user_id)  throw createError({statusCode: 401, message: 'Unauthorized'});

    const data = await prisma.users.findFirst({
        where: {id: user_id},
        select: {
            id: true,
            customer_id: true,
            email: true,
            isSubscribed: true
        }
    });

    return data as ServerUser;
}

export interface ServerUser {
    id: string,
    email: string,
    customer_id: string|null,
    isSubscribed: boolean
}