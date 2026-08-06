// auth.test.js
const request = require("supertest");
const app = require("../app");
const User = require("../models/userSchema");

jest.mock("../models/userSchema");

describe("Authentication & Registration API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUserData = {
    userName: "johnDoe",
    email: "varun@test.com",
    mobile: "9876543210",
    password: "secret123",
    userType: "0",
  };

  // -------------------------------------------------------
  // SIGNUP
  // -------------------------------------------------------
  describe("POST /api/user/signup", () => {
    it("should successfully register a new user", async () => {
      User.findOne.mockResolvedValue(null);

      // Mock the instance + save
      const saveMock = jest.fn().mockResolvedValue({
        _id: "user_id_123",
        email: mockUserData.email,
        userName: mockUserData.userName,
      });
      User.mockImplementation(() => ({
        save: saveMock,
      }));

      const res = await request(app)
        .post("/api/user/signup")
        .send(mockUserData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "User Created Successfully !!");
      expect(saveMock).toHaveBeenCalled();
    });

    it("should fail if email already exists", async () => {
      User.findOne.mockResolvedValue({ email: mockUserData.email });

      const res = await request(app)
        .post("/api/user/signup")
        .send(mockUserData);

      expect(res.status).toBe(422);
      expect(res.body).toHaveProperty("message", "User already registered");
    });

    it("should return 422 when validation fails (e.g. missing password)", async () => {
      // This depends on your express-validator middleware being applied to the route.
      // If the route has the validators, the controller will never see the request.
      const res = await request(app)
        .post("/api/user/signup")
        .send({ email: "varun@test.com" });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty("errors");
    });
  });

  // -------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------
  describe("POST /api/user/login", () => {
    const credentials = { email: "varun@test.com", password: "secret123" };

    it("should authenticate and return a token", async () => {
      const mockUser = {
        _id: "user_id_123",
        userName: "johnDoe",
        email: credentials.email,
        isValidatePassword: jest.fn().mockResolvedValue(true),
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post("/api/user/login")
        .send(credentials);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "login successfully");
      expect(res.body).toHaveProperty("token");
      expect(mockUser.isValidatePassword).toHaveBeenCalledWith(credentials.password);
      // Optional: check cookie was set
      // expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should fail with invalid password", async () => {
      const mockUser = {
        email: credentials.email,
        isValidatePassword: jest.fn().mockResolvedValue(false),
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post("/api/user/login")
        .send(credentials);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });

    it("should fail if user does not exist", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/api/user/login")
        .send(credentials);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });
});