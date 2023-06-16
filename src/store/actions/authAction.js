import { CHANGE_AUTH } from "../types"


export const thchangeAuAC = (auth) => {
    return {
        type: CHANGE_AUTH,
        payload: auth
    }
}