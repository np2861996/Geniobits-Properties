//Action For redux

export const ADD = (item) => {
    return {
        type: "ADD_PROPERTY",
        payload: item
    }
}

export const SAVE_MSG = (item) => {
    return {
        type: "ADD_MSG",
        payload: item
    }
}