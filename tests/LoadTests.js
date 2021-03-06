// Tests to check if pages get served properly
"use strict";

const chai = require('chai');
const expect = chai.expect;

const HTTP_OK = 200;

module.exports = (mocha, app) => {
  mocha.describe("Page load tests:", () => {
    mocha.it("Should serve Home page", (done) => {
      chai.request(app)
        .get("/")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/");
        });
    });

    mocha.it("Should serve Team page", (done) => {
      chai.request(app)
        .get("/team")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/team");
        });
    });

    mocha.it("Should serve Gallery page", (done) => {
      chai.request(app)
        .get("/gallery")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/gallery");
        });
    });

    mocha.it("Should serve Contact page", (done) => {
      chai.request(app)
        .get("/contact")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/contact");
        });
    });

    mocha.it("Should serve Signup page", (done) => {
      chai.request(app)
        .get("/signup")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/signup");
        });
    });

    // mocha.it("Should serve Sponsors page", (done) => {
    //   chai.request(app)
    //     .get("/sponsors")
    //     .end((err, res) => {
    //       return pageLoadedSuccessfully(err, res, done, "/sponsors");
    //     });
    // });

    // mocha.it("Should serve Events page", (done) => {
    //   chai.request(app)
    //     .get("/events")
    //     .end((err, res) => {
    //       return pageLoadedSuccessfully(err, res, done, "/events");
    //     });
    // });

    mocha.it("Should serve Privacy page", (done) => {
      chai.request(app)
        .get("/privacy")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/privacy");
        });
    });


    mocha.it("Should serve Jobs page", (done) => {
      chai.request(app)
        .get("/jobs")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/jobs");
        });
    });

    mocha.it("Should serve CV Bank login page", (done) => {
      chai.request(app)
        .get("/cv/login")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/cv/login");
        });
    });

    mocha.it("Should serve CV Bank register page", (done) => {
      chai.request(app)
        .get("/cv/register")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/cv/register");
        });
    });

    mocha.it("Should serve CV Bank password reset page", (done) => {
      chai.request(app)
        .get("/cv/passwordreset")
        .end((err, res) => {
          return pageLoadedSuccessfully(err, res, done, "/cv/passwordreset");
        });
    });
  });
};

// Basic test to check if a route works as expected
const pageLoadedSuccessfully = (err, res, done, finalUrl = "", noOfRedirects = 0) => {
  expect(err, "Error").to.be.null; // No errors encountered
  expect(res.redirects.length, "Number of Redirects").to.be.equal(noOfRedirects); // The required number of redirects happened
  expect(res.req.path, "Returned URL").to.contain(finalUrl); // The required page was returned
  expect(res.status, "Response Status").to.be.equal(HTTP_OK); // Response status is HTTP_OK
  return done();
};
