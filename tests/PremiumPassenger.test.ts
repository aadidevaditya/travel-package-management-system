import { PremiumPassenger } from "../src/models/PremiumPassenger";
import { Activity } from "../src/models/Activity";
import { TravelPackage } from "../src/models/TravelPackage";
import { Destination } from "../src/models/Destination";

describe("PremiumPassenger", () => {
    let passenger: PremiumPassenger;
    let activity: Activity;
    let destination: Destination;
    let travelPackage: TravelPackage;

    beforeEach(() => {
        passenger = new PremiumPassenger("Alice Wonderland", "P123");
        travelPackage = new TravelPackage("Luxury Escape", 5);
        destination = new Destination("Maldives");
        activity = new Activity("Spa Day", "Relax and rejuvenate", 200, 15, destination);
        travelPackage.passengers.push(passenger);
    });

    test("should successfully enroll in an activity for free when included in the package", () => {
        const result = passenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeTruthy();
        expect(passenger.activities.length).toBe(1);
        expect(passenger.activities[0].pricePaid).toBe(0); // Activity should be free for Premium passengers
    });

    test("should fail to enroll in an activity when not part of the package", () => {
        const newPassenger = new PremiumPassenger("Bob Builder", "P456");
        const result = newPassenger.signUpForActivity(activity, travelPackage);
        expect(result).toBeFalsy();
        expect(newPassenger.activities.length).toBe(0);
    });

    test("should correctly print passenger details", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        passenger.signUpForActivity(activity, travelPackage);
        passenger.printPassengerDetails();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Passenger Name: Alice Wonderland"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Activity: Spa Day, Destination: Maldives, Price Paid: 0"));
        consoleSpy.mockRestore();
    });
});
