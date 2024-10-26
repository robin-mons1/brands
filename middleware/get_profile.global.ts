import {useAccountStore} from "~/src/Account/AccountStore";
import type {RouteLocationNormalized} from "#vue-router";
import {useSupabaseSession, useSupabaseUser} from "#imports";

const allowedPaths = ['/login', '/logout'];

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const session = useSupabaseUser();
    const accountStore = useAccountStore();
    const user = useSupabaseUser();
    if (user.value) {
        if (!accountStore.user) {
            accountStore.user = await $fetch(`/api/users/${user.value.id}`);
        }
        if(allowedPaths.includes(to.path)) return;
    }
});