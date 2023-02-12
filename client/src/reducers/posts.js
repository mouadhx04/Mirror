import { FETCH_POST, CREATE, FETCH_ALL, DELETE, UPDATE, LIKE, FETCH_By_SEARCH, START_LOADING, END_LOADING, COMMENT } from "../constants/actionsTypes";
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => { 

    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_By_SEARCH:
            return { ...state, posts: action.payload }; 
        case FETCH_POST:
            return { ...state, post: action.payload };
        case CREATE:
            return {...state, posts: [action.payload]};
        case UPDATE:
            return {...state, posts: state.posts.map( (post) => post._id === action.payload._id ? action.payload : post )};
        case LIKE:
            return {...state, posts: state.posts.map( (post) => post._id === action.payload._id ? action.payload : post )};
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
                }),
            };
        case DELETE:
            return {...state, posts: state.posts.filter( (post) => post._id !== action.payload ? action.payload : post)};
        default:
            return state;
    }
}