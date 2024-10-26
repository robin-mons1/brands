import Stripe from "stripe";

// @ts-ignore
export const stripe = new Stripe(useRuntimeConfig().STRIPE_SECRET_KEY);