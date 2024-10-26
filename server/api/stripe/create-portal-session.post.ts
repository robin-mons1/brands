import {defineEventHandler} from "h3";
import {GetServerUser} from "../../utils/GetServerUser";
import {stripe} from "../../utils/Stripe";

//@ts-ignore
const baseUrl = useRuntimeConfig().public.BASE_URL as string

export default defineEventHandler(async event => {
   const user = await GetServerUser(event);


    if (!user?.customer_id) {
        return { error: 'Stripe customer not found' }
    }

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.customer_id,
        return_url: 'http://localhost:3000/callback',
    });

    return {url: portalSession.url}
});