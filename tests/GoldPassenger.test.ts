import { GoldPassenger } from "../src/models/GoldPassenger";
import { Activity } from "../src/models/Activity";
import { TravelPackage } from "../src/models/TravelPackage";
import { Destination } from "../src/models/Destination";

describe("GoldPassenger", () => {
    let passenger: GoldPassenger;
    let activity: Activity;
    let destination: Destination;
    let travelPackage: TravelPackage;

    beforeEach(() => {
        passenger = new GoldPassenger("Harry Potter", "P456", 120);
        travelPackage = new TravelPackage("Island Getaway", 2);
        destination = new Destination("Bali");
        activity = new Activity("Snorkeling", "Explore coral reefs", 100, 20, destination);
        travelPackage.passengers.push(passenger); // Adding passenger to the package
    });

    test("should enroll in an activity with sufficient balance after discount", () => {
        const result = passenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeTruthy();
        expect(passenger.balance).toBeCloseTo(120 - (100 * 0.9)); // Check balance after 10% discount
        expect(passenger.activities.length).toBe(1);
    });

    test("should not enroll when balance is insufficient after applying discount", () => {
        passenger = new GoldPassenger("Theon Grayjoy", "P789", 80); // Lower balance
        travelPackage.passengers.push(passenger);
        const result = passenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeFalsy();
        expect(passenger.activities.length).toBe(0);
    });

    test("should not enroll in activity if not part of the package", () => {
        const newPassenger = new GoldPassenger("Ellyse Perry", "P101", 150);
        const result = newPassenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeFalsy();
        expect(newPassenger.activities.length).toBe(0);
    });

    test("should print passenger details correctly", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        passenger.signUpForActivity(activity, travelPackage);
        passenger.printPassengerDetails();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Passenger Name: Harry Potter"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Balance: 30"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Activity: Snorkeling, Destination: Bali, Price Paid: 90"));
        consoleSpy.mockRestore();
    });
});
