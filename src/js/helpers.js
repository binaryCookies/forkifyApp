import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

// VIDEO 293. Helpers and Configuration Files
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// 309.
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    // const res = await fetch(`${API_URL}/${id}`);
    const fetchPro = await fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status}) `);

    return data;
  } catch (err) {
    // 293. rethrow err to handle inside of model
    // otherwise Prommise wont reject on ex. bad request
    throw err;
  }
};

// VIDEO 308.
export const sendJSON = async function (url, uploadData) {
  try {
    // const res = await fetch(`${API_URL}/${id}`);
    const fetchPro = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status}) `);

    return data;
  } catch (err) {
    // 293. rethrow err to handle inside of model
    // otherwise Prommise wont reject on ex. bad request
    throw err;
  }
};
*/
