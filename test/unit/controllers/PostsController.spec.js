// Here is were we init our 'sails' environment and application
var supertest = require("supertest");


// Here we have our tests
describe("The PostController", function() {
  var createdPostId = 1;

  it("should create a post", function(done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post("/post")
      .set("Accept", "application/json")
      .send({ title: "a post", body: "some body" })
      .expect("Content-Type", /json/)
      .expect(302)
      .end(function(err, result) {
        if (err) {
          done(err);
        } else {
          result.body.should.be.an("object");
          // createdPostId = result.body.id;
          done();
        }
      });
  });

  it("should display 3 posts", function(done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get("/posts")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, result) {
        if (err) {
          done(err);
        } else {
          result.body.should.be.an("array");
          result.body.should.have.length(1);
          [result].forEach(res => {
            res.body[0].should.have.property("id");
            res.body[0].should.have.property("title");
            res.body[0].should.have.property("body");
          })
          done();
        }
      });
  });

  it("should delete post created", function(done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete("/post/" + createdPostId)
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .end(function(err, result) {
        if (err) {
          return done(err);
        } else {
          return done(null, result.text);
        }
      });
  });
});
