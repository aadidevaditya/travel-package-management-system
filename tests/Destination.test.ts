import { Destination } from "../src/models/Destination";
import { Activity } from "../src/models/Activity";

describe("Destination", () => {
    let destination: Destination;

    beforeEach(() => {
        destination = new Destination("Himalayan Adventure");
    });

    test("should correctly initialize a destination", () => {
        expect(destination.destinationId).toMatch(/destination-/);
        expect(destination.destinationName).toBe("Himalayan Adventure");
        expect(destination.activities).toEqual([]);
        expect(destination.travelPackages).toEqual([]);
    });

    test("should add activities and retrieve them correctly", () => {
        const activity1 = new Activity("Trekking", "A challenging trek through the mountains", 100, 10, destination);
        const activity2 = new Activity("Camping", "Night camping under the stars", 50, 15, destination);

        const retrievedActivities = destination.getActivities();
        
        expect(retrievedActivities.length).toBe(2);
        expect(retrievedActivities).toContain(activity1);
        expect(retrievedActivities).toContain(activity2);
    });

});
