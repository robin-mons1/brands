import {defineEventHandler} from "h3";
import {GetServerUser} from "../../utils/GetServerUser";

export default defineEventHandler(async event => {
    const id = event.context.params?.id;
    return await GetServerUser(event, id);
});