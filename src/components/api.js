const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "8fb99c7c-392b-4433-90e5-81e0ad818670",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(getResponseData);
}

export function updateProfile(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      about: description.value,
    }),
  }).then(getResponseData);
}

export function updateImgProfile(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link.value,
    }),
  }).then(getResponseData);
}

export function getGalery() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(getResponseData);
}

export function createCardApi(name, src) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      link: src.value,
    }),
  }).then(getResponseData);
}

export function deleteCardApi(elementId) {
  return fetch(`${config.baseUrl}/cards/${elementId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(getResponseData);
}

export function putLikeApi(elementId) {
  return fetch(`${config.baseUrl}/cards/likes/${elementId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(getResponseData);
}

export function deleteLikeApi(elementId) {
  return fetch(`${config.baseUrl}/cards/likes/${elementId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(getResponseData);
}
