import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

describe('POST Signup', () => {
  it('should sign up a user if correct detaiils are provided', (done) => {
		chai
		.request(server)
		.post('/api/v1/auth/signup')
		.send({
			email: 'test@tester.com',
			firstname: 'Rihanna',
			lastname: 'Ndukwe',
			password: 'incorrect',
			is_admin: true
		})
		.end((err, res) => {
			expect(res).to.have.status(201);
			expect(res.body.data).to.have.property('token');
			expect(err).to.be.null;
			done();
		});
	});

	it('should not create an existing  existing user', (done) => {
		chai
		.request(server)
		.post('/api/v1/auth/signup')
		.send({
			email: 'test@tester.com',
			firstname: 'Beyonce',
			lastname: 'Mbakwe',
			password: 'incorrect',
			is_admin: false,
		})
		.end((err, res) => {
			expect(res).to.have.status(409);
			expect(res.body.error).to.equal('Email already exists');
			expect(err).to.be.null;
			done();
		});
	});
});

describe('POST Signin', () => {
	it('should check weather the user has an account', (done) => {
		  chai
		  .request(server)
		  .post('/api/v1/auth/signin')
		  .send({
			email: 'test@tester1.com',
			firstname: 'Beyonce',
			lastname: 'Mbakwe',
			password: 'incorrect',
			is_admin: false,
		  })
		  .end((err, res) => {
			  expect(res).to.have.status(404);
			  expect(res.body.error).to.equal('User does not exists.');
			  expect(err).to.be.null;
			  done();
		  });
	  });
  
	  it('should not sign in a user with wrong password', (done) => {
		  chai
		  .request(server)
		  .post('/api/v1/auth/signin')
		  .send({
			email: 'test@tester.com',
			firstname: 'Beyonce',
			lastname: 'Mbakwe',
			password: 'correct',
			is_admin: false,
		  })
		  .end((err, res) => {
			  expect(res).to.have.status(400);
			  expect(res.body.error).to.equal('Incorrect Signin details.');
			  expect(err).to.be.null;
			  done();
		  });
	  });
	  it('should sign in a user if correct detaiils are provided', (done) => {
		chai
		.request(server)
		.post('/api/v1/auth/signin')
		.send({
			email: 'test@tester.com',
			password: 'incorrect'
			
		})
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body.data).to.have.property('token');
			expect(err).to.be.null;
			done();
		});
	});
  })