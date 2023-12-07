import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignUp } from "../pages";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/auth";

vi.mock("axios");

describe("Signup Form", () => {
    beforeEach(() => {
        const value = {
            isAuthenticated: false,
            userName: "",
            notifications: null,
            isLoading: true,
            fetchUser: () => {},
        };
        render(
            <BrowserRouter>
                <AuthContext.Provider value={value}>
                    <SignUp />
                </AuthContext.Provider>
            </BrowserRouter>,
        );
    });

    it("renders the form input fields", async () => {
        // Get all inputs
        const nameInput = screen.getByPlaceholderText("Full Name");
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        const locationInput = screen.getByTestId("locationInput");
        const submitButton = screen.getByRole("button");

        // Check if all inputs are rendered
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(locationInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("It displays required fields if submit is pressed with empty fields", async () => {
        const submitButton = screen.getByRole("button");

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.queryAllByText(/This field is required/i)).length(5);
        });
    });

    it("It displays error if fields are in invalid format", async () => {
        // Get all inputs
        const nameInput = screen.getByPlaceholderText("Full Name");
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        const submitButton = screen.getByRole("button");

        // Fill in the inputs

        fireEvent.change(nameInput, {
            target: { value: "Invalid" },
        });

        fireEvent.change(emailInput, {
            target: { value: "Invalid" },
        });

        fireEvent.change(passwordInput, {
            target: { value: "123456" },
        });

        fireEvent.change(confirmPasswordInput, {
            target: { value: "InvalidMatch" },
        });

        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(
                screen.getByText("Email format is not valid"),
            ).toBeInTheDocument();
            expect(
                screen.getByText("Password must be at least 7 characters"),
            ).toBeInTheDocument();
            expect(
                screen.getByText("Passwords must match"),
            ).toBeInTheDocument();
        });
    });

    it("Submit form if all fields are valid", async () => {
        // Get all inputs
        const nameInput = screen.getByPlaceholderText("Full Name");
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        const locationInput = screen.getByTestId("locationInput");
        const submitButton = screen.getByRole("button");
        const CONSUMER_URL = import.meta.env.VITE_CONSUMER_BACKEND_URL;

        // Fill in the inputs

        fireEvent.change(nameInput, {
            target: { value: "Valid Format" },
        });

        fireEvent.change(emailInput, {
            target: { value: "valid@gmail.com" },
        });

        fireEvent.change(passwordInput, {
            target: { value: "1234567" },
        });

        fireEvent.change(confirmPasswordInput, {
            target: { value: "1234567" },
        });

        fireEvent.change(locationInput, {
            target: { value: "oulu" },
        });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                `${CONSUMER_URL}/auth/signup`,
                {
                    username: "Valid Format",
                    user_email: "valid@gmail.com",
                    password: "1234567",
                    password_confirm: "1234567",
                    location: "oulu",
                },
                {
                    withCredentials: true,
                },
            );
        });
    });
});
