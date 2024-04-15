import { Activity } from "../src/models/Activity";
import { Destination } from "../src/models/Destination";
import { GoldPassenger } from "../src/models/GoldPassenger";
import { PremiumPassenger } from "../src/models/PremiumPassenger";
import { StandardPassenger } from "../src/models/StanderdPassenger";
import { TravelPackage } from "../src/models/TravelPackage";

describe("TravelPackage", () => {
    let travelPackage: TravelPackage;
    let destination: Destination;
    let activity: Activity;

    beforeEach(() => {
        travelPackage = new TravelPackage("Caribbean Cruise", 3);
        destination = new Destination("Bahamas");
        activity = new Activity("Snorkeling", "Explore the coral reefs", 100, 20, destination);
    });

    test("should add a destination to the travel package", () => {
        travelPackage.addDestination(destination);
        expect(travelPackage.destinations.includes(destination)).toBeTruthy();
        expect(destination.travelPackages.some(pkg => pkg.packageId === travelPackage.packageId)).toBeTruthy();
    });

    test("should add passengers within capacity", () => {
        const passenger1 = new StandardPassenger("John Doe", "001", 200);
        const passenger2 = new PremiumPassenger("Jane Doe", "002");
        travelPackage.addPassenger(passenger1);
        travelPackage.addPassenger(passenger2);
        expect(travelPackage.passengers.length).toBe(2);
    });

    test("should not add passengers when capacity is exceeded", () => {
        const passenger1 = new StandardPassenger("John Doe", "001", 200);
        const passenger2 = new PremiumPassenger("Jane Doe", "002");
        const passenger3 = new GoldPassenger("Alice Wonderland", "003", 300);
        const passenger4 = new StandardPassenger("Bob Builder", "004", 150);
        travelPackage.addPassenger(passenger1);
        travelPackage.addPassenger(passenger2);
        travelPackage.addPassenger(passenger3);
        travelPackage.addPassenger(passenger4); // This should not be added
        expect(travelPackage.passengers.length).toBe(3);
    });

    test("should print itinerary details correctly", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        travelPackage.addDestination(destination);
        travelPackage.printItinerary();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Travel Package: Caribbean Cruise"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Destination: Bahamas"));
        consoleSpy.mockRestore();
    });

    test("should print passenger list correctly", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const passenger = new PremiumPassenger("Jane Doe", "002");
        travelPackage.addPassenger(passenger);
        travelPackage.printPassengerList();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Travel Package: Caribbean Cruise"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Passenger: Jane Doe"));
        consoleSpy.mockRestore();
    });
});
