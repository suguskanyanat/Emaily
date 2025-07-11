import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => { //action creater -> communicate with backend
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data }); //update user credits
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};