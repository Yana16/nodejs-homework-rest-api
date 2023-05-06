const mongoose = require("mongoose");
const request = require("supertest");
const { describe, beforeAll, afterAll, test, expect } = require("jest");

require("dotenv").config();
const { PORT, DB_HOST_TEST } = process.env;
const app = require("../../app");

describe("test for login", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  test("Correct status code response", async () => {
    const user = {
      email: "hello11@mydear.ua",
      password: "123456",
    };
    const res = await request(app).post("/api/users/login").send(user);
    expect(res.statusCode).toBe(200);
  });
  test("Token received", async () => {
    const user = {
      email: "hello11@mydear.ua",
      password: "123456",
    };
    const res = await request(app).post("/api/users/login").send(user);
    expect(res.token !== "").toBe(true);
  });
  test("Fields email and subscription received with correct data format", async () => {
    const user = {
      email: "hello11@mydear.ua",
      password: "123456",
    };
    const res = await request(app).post("/api/users/login").send(user);

    expect(
      typeof res.body.user.email && typeof res.body.user.subscription
    ).toBe("string");
  });
});
