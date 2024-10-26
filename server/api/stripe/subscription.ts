import {PrismaClient} from "@prisma/client";
import {createError, defineEventHandler} from "h3";
import {readRawBody} from "h3"
import {getHeader} from "h3";
import {stripe} from "../../utils/Stripe";
import {sendError} from "h3";
import {GetServerUser} from "../../utils/GetServerUser";

const prisma = new PrismaClient();
// @ts-ignore
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async event => {
    const body = await readRawBody(event, false);
    const signature = getHeader(event, 'stripe-signature');

    let stripeEvent: any = body;
    let subscription = false;

    if(!body) {
        return {error: 'Invalid request body'}
    }

    if(!signature) {
        return {error: 'Invalid stripe-signature'}
    }

    try {
        stripeEvent = stripe.webhooks.constructEvent(body, signature, runtimeConfig.STRIPE_WEBHOOK_KEY)
    } catch (err) {
        const error = createError({
            statusCode: 400,
            statusMessage: `Webhook error: ${err}`
        });

        return sendError(event, error);
    }

    switch (stripeEvent.type) {
        case 'customer.subscription.created':
            console.log("subscribed")
            subscription = true;
            break;
        case 'customer.subscription.deleted':
            console.log("subscription deleted")
            subscription = false;
            break;
    }


    await prisma.users.update({
        where: {customer_id: stripeEvent.data.object.customer},
        //@ts-ignore
        data: {isSubscribed: subscription}
    });

    return {received: true}
})