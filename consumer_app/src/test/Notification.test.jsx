import { describe, it, expect, vi, beforeEach } from "vitest";
import {  fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../components/auth";
import { ParcelHistoryPage } from "../pages";


vi.mock("axios");

describe("Are notifications displayed", () => {
    beforeEach( () => {
     
        const value = {
            isAuthenticated: true,
            userName: "Test user",
            notifications: [
                {
                    title: "Status update",
                    parcel_id: "0724f4e6-d90d-4929-8a04-9c9aa5569aa6",
                    parcel_status: "delivered",
                    parcel_name: "Nike shoes",
                },
                {
                    title: "Status update",
                    parcel_id: "7baedef3-a571-4f2c-8ea1-2cc817929925",
                    parcel_status: "delivered",
                    parcel_name: "Adidas Jacket",
                },
            ],
            isLoading: false,
            fetchUser: () => {},
        };
        render(
            <BrowserRouter>
                <AuthContext.Provider value={value}>
                    <ParcelHistoryPage />
                </AuthContext.Provider>
            </BrowserRouter>,
        );
    });

    it("Should render as many notifications that are available", async () => {
        await waitFor(() => {
          //Should render 2 notifications
            expect(screen.getAllByText("Status update")).toHaveLength(2);
            expect(screen.getAllByText("Delivered")).toHaveLength(2);
            //Check if notfications correct details are rendered (First parcel)
            expect(screen.getByText("Nike shoes")).toBeInTheDocument();

            //Check if notfications correct details are rendered (Second parcel)
            expect(screen.getByText("Adidas Jacket")).toBeInTheDocument();


            //Click the notification to get redierected to the parcel details page
            fireEvent.click(screen.getByText("Nike shoes"));

            //Check if user is redirected to the correct page
           expect(window.location.pathname).toBe("/parcels/0724f4e6-d90d-4929-8a04-9c9aa5569aa6");
        });
    });

});
