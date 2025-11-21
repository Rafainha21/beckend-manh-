const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let idCriado = "";
let tokenSalvo = "";

describe("Testes do recurso /usuarios", () => {
  test("POST /usuarios → deve criar usuário", async () => {
    const resp = await request.post("/usuarios").send({
      email: "usuario@email.com",
      senha: "abcd1234",
    });

    expect(resp.status).toBe(201);
    expect(resp.body).toHaveProperty("_id");
    expect(resp.body.email).toBe("usuario@email.com");

    idCriado = resp.body._id;
  });

  test("POST /usuarios → sem JSON deve retornar 422", async () => {
    const resp = await request.post("/usuarios").send({});
    expect(resp.status).toBe(422);
    expect(resp.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login → deve logar", async () => {
    const resp = await request.post("/usuarios/login").send({
      usuario: "usuario@email.com",
      senha: "abcd1234",
    });

    expect(resp.status).toBe(200);
    expect(resp.body).toHaveProperty("token");

    tokenSalvo = resp.body.token;
  });

  test("POST /usuarios/login → sem JSON deve retornar 401", async () => {
    const resp = await request.post("/usuarios/login").send({});
    expect(resp.status).toBe(401);
    expect(resp.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar → token válido", async () => {
    const resp = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer " + tokenSalvo);

    expect(resp.status).toBe(200);
    expect(resp.body).toHaveProperty("token");
  });

  test("POST /usuarios/renovar → token inválido", async () => {
    const resp = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");

    expect(resp.status).toBe(401);
    expect(resp.body.msg).toBe("Token inválido");
  });

  test("DELETE /usuarios/:id → deve remover", async () => {
    const resp = await request
      .delete(`/usuarios/${idCriado}`)
      .set("authorization", "Bearer " + tokenSalvo);

    expect(resp.status).toBe(204);
  });
});
