import {
    ADD_COMPANIES,
    ADD_LEVELS,
    ADD_LOCATIONS,
    ADD_SOCIAL_MEDIA,
    ADD_SOCIAL_MEDIA_TYPE,
    ADD_TRIPS
}  from '../actions/types'

const INITIAL_STATE = {
    companies: {count: 0, list: []},
    levels: {count: 0, list: []},
    locations: {count: 0, list: []},
    social_media: {count: 0, list: []},
    social_media_type: {count: 0, list: []},
    trips: {count: 0, list: []},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ADD_COMPANIES:
            return {...state, companies: {count: action.payload.count, list: [...action.payload.results]}}
        case ADD_LEVELS:
            return {...state, levels: {count: action.payload.count, list: [...action.payload.results]}}
        case ADD_LOCATIONS:
            return {...state, locations: {count: action.payload.count, list: [...action.payload.results]}}
        case ADD_SOCIAL_MEDIA:
            return {...state, social_media: {count: action.payload.count, list: [...action.payload.results]}}
        case ADD_SOCIAL_MEDIA_TYPE:
            return {...state, social_media_type: {count: action.payload.count, list: [...action.payload.results]}}
        case ADD_TRIPS:
            return {...state, trips: {count: action.payload.count, list: [...action.payload.results]}}
        default:
            return state
    }
};

export default reducer