import axios from "axios";

export const add_missing_key = (locale, key) => (dispatch, getState) => {
    axios.post('/translation/missing_key', {locale, key}).then(response => {})
}