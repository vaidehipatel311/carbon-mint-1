import { combineReducers } from "redux";

import landownerReducer from "./LandOwners/reducers";
import landParcelReducer from './LandParcels/reducers'
import loginReducer from "./Login/reducers";
import operatorReducer from './Operator/reducers'
import eventReducer from "./Events/reducers";

export default combineReducers({
    landowners: landownerReducer,
    landparcels : landParcelReducer,
    login : loginReducer,
    operator:operatorReducer,
    events : eventReducer

})