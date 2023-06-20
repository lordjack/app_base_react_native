import axios from 'axios';

const ConnectAPI = {
  url: 'https://data.oesteorganicos.com.br/',
  dir: 'api/',
  getUrl: function () {
    return this.url;
  },
  urlFile: function () {
    return this.url + 'storage/';
  },

  //get - listar
  //post - cadastrar
  //put - editar
  //delete - deletar
  call: async function (endpoint, data = null, method = 'GET', token = '') {
    try {
      const headers = {};
      headers[`Content-Type`] = `application/json; charset=utf-8`;
      token = `9|SyPefkzUsI8x1hfJ6HRCgqmdyueWgEdFCYocnVCb`;

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const config = {
        method,
        url: this.url + this.dir + endpoint,
        headers,
        data,
      };

      const response = await axios(config);

      // console.log(response);
      if (response.status == 200) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      //console.log(error);
      // throw new Error('Erro ao realizar a requisição.');
      throw new Error(
        `Erro na requisição ${method.toUpperCase()} ${endpoint}: ${
          error.message
        }`
      );
    }
  },
};
export default ConnectAPI;
