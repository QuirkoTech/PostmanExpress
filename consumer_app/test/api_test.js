/* eslint-disable no-undef */
import supertest from "supertest";
import { expect } from "chai";
import app from "./../server/app.js";
import pool from "../../organization_api/server/db.js";

const request = supertest(app);

describe("Account actions", () => {
    const correctUserData = {
        username: "Test",
        user_email: "test@test.test",
        password: "testtest",
        password_confirm: "testtest",
        location: "oulu",
    };

    const mismatchingPwd = {
        username: "Test",
        user_email: "test@test.test",
        password: "testtest",
        password_confirm: "testtesttt",
        location: "oulu",
    };

    const wrongLocation = {
        username: "Test",
        user_email: "test@test.test",
        password: "testtest",
        password_confirm: "testtest",
        location: "hello",
    };

    it("Should sign up the user with correct inputs:", async () => {
        const response = await request
            .post("/auth/signup")
            .send(correctUserData)
            .expect("Content-Type", /json/)
            .expect(201);

        expect(response.headers).to.have.property("set-cookie");
    });

    it("Should fail to sign up with mismatching passwords", async () => {
        const response = await request
            .post("/auth/signup")
            .send(mismatchingPwd)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body).to.have.property(
            "message",
            "Passwords don't match.",
        );
    });

    it("Should fail to sign up with wrong location", async () => {
        const response = await request
            .post("/auth/signup")
            .send(wrongLocation)
            .expect("Content-Type", /json/)
            .expect(500);

        expect(response.body).to.have.property(
            "message",
            "Couldn't perform sign up, try again later.",
        );
    });

    it("Should log in the user with correct credentials:", async () => {
        const response = await request
            .post("/auth/login")
            .send({
                user_email: "testuser@testuser.testuser",
                password: "testuser",
            })
            .expect("Content-Type", /json/)
            .expect(201);

        expect(response.headers).to.have.property("set-cookie");
    });

    it("Should fail to log in not existing user:", async () => {
        const response = await request
            .post("/auth/login")
            .send({
                user_email: "testfail@testfail.testfail",
                password: "testfail",
            })
            .expect("Content-Type", /json/)
            .expect(404);

        expect(response.body).to.have.property(
            "message",
            "No user found with this email.",
        );
    });

    it("Should fail to log in the user with wrong password:", async () => {
        const response = await request
            .post("/auth/login")
            .send({
                user_email: "testuser@testuser.testuser",
                password: "testfail",
            })
            .expect("Content-Type", /json/)
            .expect(403);

        expect(response.body).to.have.property(
            "message",
            "Invalid credentials.",
        );
    });

    afterEach(async () => {
        await deleteUser(correctUserData.user_email);
    });
});

const deleteUser = async (email) => {
    try {
        await pool.query("DELETE FROM users WHERE user_email = $1", [email]);
    } catch (error) {
        console.log("Couldn't delete user from database after test.");
    }
};
