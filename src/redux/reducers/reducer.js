//Reducers For redux
const INIT_STATE = {
    savedproperties: []
};

export const propertiesreducer = (state = INIT_STATE, action) => {

    //check type of the actions
    switch (action.type) {
        case "ADD_PROPERTY":
            return {
                ...state,
                savedproperties: [...state.savedproperties, action.payload]
            }
        default:
            return state;
    }
}

const MSG_STATE = {
    savedmsgs: []
};

export const msgreducer = (state = MSG_STATE, action) => {

    //check type of the actions
    switch (action.type) {

        case "ADD_MSG":
            return {
                ...state,
                savedmsgs: [...state.savedmsgs, action.payload]
            }

        default:
            return state;
    }
}