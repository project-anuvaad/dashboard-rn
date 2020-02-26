import C from '../actions/constants'


const INITIAL_STATE = {
    language: "English",
    code:'en'
}


// export const success =  (state = INITIAL_STATE, action) => {
    
    
//     return  { ...state,language: action.payload.name , code:action.payload.code }
// }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case C.SET_LANGUAGE:
            return  { ...state,language: action.payload.name , code:action.payload.code }
        default:
            return state;
    }
}

 



