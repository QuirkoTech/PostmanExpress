import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignUp } from "../pages";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../components/auth";

// Use the mock provider in your tests
describe("Signup", () => {
    it("renders the form", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value>
                    <SignUp />
                </AuthContext.Provider>
            </BrowserRouter>,
        );

        expect(screen.getAllByText("PostmanExpress"));
    });
});
