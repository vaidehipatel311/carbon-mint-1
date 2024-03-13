import { combineReducers } from "redux";

import onboardingReducer from "./Onboarding/reducers";
import landownerReducer from "./LandOwners/reducers";
import landParcelReducer from './LandParcels/reducers'
import loginReducer from "./Login/reducers";
import operatorReducer from './Operator/reducers'
import eventReducer from "./Events/reducers";

export default combineReducers({
    onboarding: onboardingReducer,
    landowners: landownerReducer,
    landparcels : landParcelReducer,
    login : loginReducer,
    operator:operatorReducer,
    events : eventReducer

})