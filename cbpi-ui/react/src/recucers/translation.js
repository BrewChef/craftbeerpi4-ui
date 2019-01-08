import axios from "axios";
import {push, goBack, replace} from "react-router-redux";



const initial_state = () => {

    let result = {


    }

    return result
}


export const add_missing_key = (locale, key) => (dispatch, getState) => {

    axios.post('/translation/missing_key', {locale, key}).then(response => {

    })
}