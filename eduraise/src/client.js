import { createThirdwebClient } from "thirdweb";
export const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID,
});