// @ts-ignore

/* eslint-disable */
import Cookies from 'js-cookie';
import { request } from 'umi';

export async function getStudentsList(params, sort, filter) {
  let sorter = Object.entries(sort);
  console.log({ params, sort, sorter, filter });

  const token = Cookies.get('accessToken');
  console.log('called');

  return request(`${API_URL}/students`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...params,
      sort_column: sorter?.[0]?.[0],
      sort_order: sorter?.[0]?.[1] === 'ascend' ? 'asc' : 'desc',
    },
    skipErrorHandler: true,
  }).then((res) => {
    console.log({ res });
    res.data.forEach((data) => (data.key = data.id));
    return res;
  });
}
export async function getStudentById(id) {
  const token = Cookies.get('accessToken');

  return request(`${API_URL}/students/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    skipErrorHandler: true,
  });
}

export async function createStudent(body) {
  const token = Cookies.get('accessToken');
  console.log({ body });

  return request(`${API_URL}/students`, {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    skipErrorHandler: true,
  });
}

export async function editStudent(id, body) {
  const token = Cookies.get('accessToken');
  console.log({ body });

  return request(`${API_URL}/students/${id}`, {
    method: 'PATCH',
    data: body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    skipErrorHandler: true,
  });
}
export async function deleteStudent(id) {
  const token = Cookies.get('accessToken');

  return request(`${API_URL}/students/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    skipErrorHandler: true,
  });
}
