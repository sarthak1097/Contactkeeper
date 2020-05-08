import { SET_ALERT,REMOVE_ALERT } from "../types";


export default (state,action) => {
    switch (action.type) {
        case SET_ALERT:
            // console.log('aaaaaa',action.payload);
           return [...state,action.payload]
           
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
    
        default:
            return state;
    }
}