import { storeCSRFToken } from "./csrf"
import csrfFetch from "./csrf"

const SET_CURRENT_USER = 'session/setCurrentUser'
const REMOVE_CURRENT_USER = 'session/removeCurrentUser'

const setCurrentUser = (user) => {
    return{
        type: SET_CURRENT_USER,
        payload: user
    }
}
const removeCurrentUser = (user) => {
    return{
        type: REMOVE_CURRENT_USER,
        payload: user
    }
}

export const login = (user) => async (dispatch) => {
    const {email, password} = user
    const response = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return response
}

export const signup = (user) => async (dispatch) =>{  
    const {first_name, last_name, zip_code, email, password} = user
    const response = await csrfFetch('/api/users',{
        method: "POST",
        body: JSON.stringify({
            first_name,
            last_name,
            zip_code,
            email,
            password
        })
    })
    const data = await response.json()
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return response
}

export const logout = () => async (dispatch) => {
    
    const response = await csrfFetch('/api/session',{
        method: "DELETE"
    })
    storeCurrentUser(null)
    dispatch(removeCurrentUser())
    return response
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }
  
export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session')
    storeCSRFToken(response)
    const data = await response.json()
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return response
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:            
            return {...state, user: action.payload}
        case REMOVE_CURRENT_USER:
            return {...state, user: null}
        default:
            return state;
    }
}

export default sessionReducer