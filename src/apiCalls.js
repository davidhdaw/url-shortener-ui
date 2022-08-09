export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(response => checkForError(response))
      .then(response => response.json())
}

export const postUrl = (postObject) => {
  return fetch(`http://localhost:3001/api/v1/urls`, {
    method: 'POST',
    body: JSON.stringify(postObject),
    headers: {
    	'Content-Type': 'application/json'
    }
  }).then(response => checkForError(response))
  .then(response => response.json())
};

export const deleteUrl = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/` + id, {
    method: 'DELETE',
    headers: {
    	'Content-Type': 'application/json'
    }
  })
};

const checkForError = (response) => {
  if (response.ok) {
    return response
  } else {
    throw new Error(response.status)
  }
}