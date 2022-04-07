// @ts-ignore

/* eslint-disable */
import Cookies from 'js-cookie';
import { request } from 'umi';

export async function getStudentsList(params, options) {
  const token = Cookies.get('accessToken');
  console.log('called');

  return request(`${API_URL}/students`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ...params },
    ...(options || {}),
  }).then((res) => {
    console.log({ res });
    res.data.forEach((data) => (data.key = data.id));
    return res;
  });
}
