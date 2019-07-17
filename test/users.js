import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";

chai.use(chaiHttp);

let adminToken;

describe("POST Users can create a booking", () => {
describe("POST Signup", () => {
  it("should sign up a user if correct detaiils are provided", done => {
    chai
      .request(server)
      .post("/api/v1/auth/signup")
      .send({
        email: "test@tester.com",
        first_name: "Rihanna",
        last_name: "Ndukwe",
        password: "incorrect",
        is_admin: true
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.have.property("token");
        expect(err).to.be.null;
        adminToken = res.body.data.token;
        done();
      });
  });

  it("should not create an existing  existing user", done => {
    chai
      .request(server)
      .post("/api/v1/auth/signup")
      .send({
        email: "test@tester.com",
        first_name: "Beyonce",
        last_name: "Mbakwe",
        password: "incorrect",
        is_admin: false
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.error).to.equal("Email already exists");
        expect(err).to.be.null;
        done();
      });
  });
});

describe("POST Signin", () => {
  it("should check weather the user has an account", done => {
    chai
      .request(server)
      .post("/api/v1/auth/signin")
      .send({
        email: "test@tester1.com",
        first_name: "Beyonce",
        last_name: "Mbakwe",
        password: "incorrect",
        is_admin: false
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("User does not exists.");
        expect(err).to.be.null;
        done();
      });
  });

  it("should not sign in a user with wrong password", done => {
    chai
      .request(server)
      .post("/api/v1/auth/signin")
      .send({
        email: "test@tester.com",
        first_name: "Beyonce",
        last_name: "Mbakwe",
        password: "correct",
        is_admin: false
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("Incorrect Signin details.");
        expect(err).to.be.null;
        done();
      });
  });
  it("should sign in a user if correct detaiils are provided", done => {
    chai
      .request(server)
      .post("/api/v1/auth/signin")
      .send({
        email: "test@tester.com",
        password: "incorrect"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property("token");
        expect(err).to.be.null;
        done();
      });
  });
});

describe("POST Create a trip", () => {
  it("Admin should be able to create a trip", done => {
    chai
      .request(server)
      .post("/api/v1/trips")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        bus_id: "1",
        origin: "Awka",
        destination: "Lagos",
        trip_date: "10-25-1988",
        fare: "20.00",
        token: adminToken,
        is_admin: true,
        user_id: 2
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal("success");
        expect(err).to.be.null;
        done();
      });
  });

  it("A non admin user should not be able to create  a trip", done => {
    chai
      .request(server)
      .post("/api/v1/trips")
      .set("Authorization", "Bearer tyttujijhnddbhffh")
      .send({
        bus_id: "2",
        origin: "ugwuoba",
        destination: "Lagos",
        trip_date: "25-11-1988",
        fare: "20.00",
        token: adminToken
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Authentication error");
        expect(err).to.be.null;
        done();
      });
  });
});
  it("User without a token should not create a trip", done => {
    chai
      .request(server)
      .post("/api/v1/trips")
      .send({
        bus_id: "2",
        origin: "ugwuoba",
        destination: "Mgbakwu",
        trip_date: "25-10-1988",
        fare: "20.00",
        token: adminToken
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Token not provided");
        expect(err).to.be.null;
        done();
      });
  });

  it("User with a  wrong token should not create a trip", done => {
    chai
      .request(server)
      .post("/api/v1/trips")
      .send({
        bus_id: "2",
        origin: "ugwuoba",
        destination: "Lagos",
        trip_date: "25-10-1988",
        fare: "20.00",
        token: adminToken
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Token not provided");
        expect(err).to.be.null;
        done();
      });
  });
});

describe("GET View trips", () => {
  it("Both user and admin should be able to view all trips", done => {
    chai
      .request(server)
      .get("/api/v1/trips")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
      });
  });
});


