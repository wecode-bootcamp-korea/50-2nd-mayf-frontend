const BASE_URL = 'http://10.58.52.154:8000';

const API = {
  signUp: `${BASE_URL}/users/signup`,
  list: `${BASE_URL}/classes/classeslist`,
  main: `${BASE_URL}/classes/classeslist/upcomingclasses`,
  nav: `${BASE_URL}/classes/classeslist`,
};

export default API;
