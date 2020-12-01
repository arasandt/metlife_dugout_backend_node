const app = require('../index.js');
const chai = require('chai')
const chaiHttp = require('chai-http')

const chalk = require('chalk')
const MIX = (str) => {
    return chalk.bold.blue('** ' + str + ' **')
}

chai.use(chaiHttp);
chai.should();

describe(MIX('Userprofile Endpoints by creating a new id'), () => {
        const bodyObj = {
                        id: 128538,
                        email: "sample@example.com",
                        password: "a",
                        firstName: "Sample",
                        lastName: "Person",
                        }
        var token = ""
        it(`Create a userprofile with id ${bodyObj.id}`, (done) => {
             chai.request(app)
                .post('/nodeapi/signup')
                .send(bodyObj)
                .end((err, res) => {
                     res.should.have.status(201);
                     res.body.should.be.a('object');
                     token = res.body.token
                     done();
                  });
         });
        it(`Query a userprofile with id ${bodyObj.id}`, (done) => {
             chai.request(app)
                 .get(`/nodeapi/userprofile/?id=${bodyObj.id}`)
                 .set({'Authorization': token})
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        it(`Update a userprofile with id ${bodyObj.id}`, (done) => {
             chai.request(app)
                 .put(`/nodeapi/userprofile/?id=${bodyObj.id}`)
                 .set({'Authorization': token})
                 .send({
                     firstName: "Temporary"
                 })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        it(`Query a userprofile with id ${bodyObj.id} after update`, (done) => {
             chai.request(app)
                 .get(`/nodeapi/userprofile/?id=${bodyObj.id}`)
                 .set({'Authorization': token})
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

})

describe(MIX('Userprofile Endpoints by using existing id'), () => {
        // var id = mongoose.Types.ObjectId();
        const bodyObj = {
                        id: 128538,
                        password: "a"
                        }
        var token = ""
        it(`Login a userprofile with id ${bodyObj.id}`, (done) => {
             chai.request(app)
                .post('/nodeapi/login')
                .send(bodyObj)
                .end((err, res) => {
                     res.should.have.status(201);
                     res.body.should.be.a('object');
                     token = res.body.token
                     done();
                  });
         });
        it(`Query a userprofile with id ${bodyObj.id}`, (done) => {
             chai.request(app)
                 .get(`/nodeapi/userprofile/?id=${bodyObj.id}`)
                 .set({'Authorization': token})
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

       it(`Delete a userprofile with id ${bodyObj.id}`, (done) => {
             chai.request(app)
                .delete(`/nodeapi/userprofile/?id=${bodyObj.id}`)
                .set({'Authorization': token})
                .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
})

