const request = require('supertest');
const app = require('../app');

describe('Testes da API REST - Prática 8', () => {
  let token;

  test('GET /produtos sem token deve retornar 401', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', '123456789');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Token inválido');
  });

  test('POST /usuarios/login deve retornar token válido', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /produtos com token válido deve retornar 200', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar deve gerar novo token', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /produtos com novo token deve retornar 200', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);

    expect(res.status).toBe(200);
  });
});