import {API_URL} from '../globals';

async function patchQuestion (id, auth, question) {
  return fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + auth.getIdToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
  })
    .then(res => res.json())
    .catch(err => alert(err));
}

export default patchQuestion;
