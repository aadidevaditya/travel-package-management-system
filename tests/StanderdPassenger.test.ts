import { Activity } from "../src/models/Activity";
import { Destination } from "../src/models/Destination";
import { StandardPassenger } from "../src/models/StanderdPassenger";
import { TravelPackage } from "../src/models/TravelPackage";

describe("StandardPassenger", () => {
    let passenger: StandardPassenger;
    let activity: Activity;
    let destination: Destination;
    let travelPackage: TravelPackage;

    beforeEach(() => {
        passenger = new StandardPassenger("Harry Potter", "P123", 100);
        travelPackage = new TravelPackage("European Vacation", 5);
        destination = new Destination("Paris")
        activity = new Activity("City Tour", "Tour of Paris", 50, 20, destination);
        travelPackage.passengers.push(passenger);
    });

    test("should enroll in an activity if balance is sufficient and is part of the package", () => {
        const result = passenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeTruthy();
        expect(passenger.balance).toBe(50); // Balance should be reduced by the cost of the activity
        expect(passenger.activities.length).toBe(1);
    });

    test("should not enroll in activity if not part of the package", () => {
        const newPassenger = new StandardPassenger("Theon Greyjoy", "P124", 150);
        const result = newPassenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeFalsy();
        expect(newPassenger.activities.length).toBe(0);
    });

    test("should not enroll in activity if balance is insufficient", () => {
        const expensiveActivity = new Activity("Luxury Cruise", "Seine river cruise", 200, 5, destination);
        const result = passenger.signUpForActivity(expensiveActivity, travelPackage);
        expect(result).toBeFalsy();
        expect(passenger.activities.length).toBe(0);
        expect(passenger.balance).toBe(100); // Balance remains unchanged
    });

    test("should print passenger details correctly", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        passenger.signUpForActivity(activity, travelPackage);
        passenger.printPassengerDetails();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Passenger Name: Harry Potter"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Activity: City Tour"));
        consoleSpy.mockRestore();
    });
});
