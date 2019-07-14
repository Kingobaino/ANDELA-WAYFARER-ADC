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

	it('should not existing user', (done) => {
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
})