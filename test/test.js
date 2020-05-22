const ENV = process.env.NODE_ENV || "test";
const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
//
beforeAll(async () => {
  // Connect to a Mongo DB
  // not required mongo running locally
});

// Cleans up database between tests..
async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}
// call remove function to clear all collections.
afterEach(async () => {
  await removeAllCollections();
});

// Test for all routes...
describe("/api TEST", () => {
  it("gets the test endpoint", async (done) => {
    const response = await request.get("/api");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ availableRoutes: { POST: "/api/users" } });
    done();
  });
});
//
describe("/api/users POST", () => {
  it("Should create a new user when passed the correct info", async (done) => {
    const response = await request.post("/api/users").send({
      name: "Timothy Doolan",
      email: "testing@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(201);
    console.log(response.body);
    expect(response.body).toEqual({
      message: "User registered",
      response: {
        name: "Timothy Doolan",
        email: "testing@gmail.com",
        password: "123456",
      },
    });
    done();
  });
  //
  it("Should throw error if password is less that 6 characters", async (done) => {
    const response = await request.post("/api/users").send({
      name: "Timothy Doolan",
      email: "testing@gmail.com",
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toEqual({
      value: "12345",
      msg: "please enter a password with 6 or more characters",
      param: "password",
      location: "body",
    });
    done();
  });
  //
  it("Should throw error if email is not present", async (done) => {
    const response = await request.post("/api/users").send({
      name: "Timothy Doolan",
      email: "",
      password: "123456",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toEqual({
      value: "",
      msg: "Please provide a valid email address",
      param: "email",
      location: "body",
    });
    done();
  });
  //
  it("Should throw error if name is not present", async (done) => {
    const response = await request.post("/api/users").send({
      name: "",
      email: "testuser3@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toEqual({
      value: "",
      msg: "Name is required",
      param: "name",
      location: "body",
    });
    done();
  });
  //
  it("Should throw error if user is already present in the database", async (done) => {
    const { createNewUser } = require("../models/createUser.model");
    const user = {
      name: "timothy",
      email: "testuser3@gmail.com",
      password: "123456",
    };
    await createNewUser(user.name, user.email, user.password);
    const response = await request.post("/api/users").send({
      name: "timothy",
      email: "testuser3@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("User already exists");
    done();
  });
  // POST users
});
