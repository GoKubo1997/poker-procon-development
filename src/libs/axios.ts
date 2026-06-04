import axios from 'axios';

import { API_HOST } from '@/constants';

// サーバーサイド（getServerSideProps等）ではlocalhostを使用
// クライアントサイドでは相対パスまたは環境変数を使用
const getBaseURL = () => {
  if (typeof window === 'undefined') {
    // サーバーサイド
    return 'http://localhost:3000/api';
  }
  // クライアントサイド
  return `${API_HOST}/api`;
};

const customAxios = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.response.use(
  (response) => response,
  (e: any) => {
    if (!e.response) {
      // ネットワークエラーやCORSエラーなど、レスポンスがない場合
      console.error('Network error:', e.message);
      throw {
        status: 0,
        errors: [
          {
            code: 'BZ001',
            message: e.message || 'Network error',
            timestamp: new Date().toISOString(),
          },
        ],
      };
    }
    switch (e.response.status) {
      case 404: // Not Found
        window.location.href = '/404';
        break;
      default:
        throw e.response.data;
    }
  }
);

export default customAxios;
