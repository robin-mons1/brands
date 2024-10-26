
import {defineEventHandler} from "h3";
import {readBody} from "h3";
import {stripe} from "../../utils/Stripe";
import {GetServerUser} from "../../utils/GetServerUser";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
    const user = await GetServerUser(event);
    const { lookupKey } = await readBody(event);

    if(!user.customer_id) {
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: { user_id: user.id },
        });

         await prisma.users.update({
            where: {id: user.id},
            data: {customer_id: customer.id}
        });

        user.customer_id = customer.id;
    }

    const prices = await stripe.prices.list({
        lookup_keys: [lookupKey],
        expand: ['data.product'],
    })

    const session = await stripe.checkout.sessions.create({
        customer: user.customer_id,
        billing_address_collection: 'auto',
        line_items: [
            {price: prices.data[0].id, quantity: 1}
        ],
        mode: 'subscription',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });

    if(session.url) {
        return { url: session.url}
    }
})