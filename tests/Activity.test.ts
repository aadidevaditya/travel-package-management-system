import { Activity } from "../src/models/Activity";
import { Destination } from "../src/models/Destination";

describe("Activity", () => {
    let destination: Destination;
    let activity: Activity;

    beforeEach(() => {
        // Mock a Destination instance
        destination = new Destination("Himalayan Adventure");
        // Create an Activity instance
        activity = new Activity("Trekking", "A challenging trek through the mountains", 100, 10, destination);
    });

    test("should correctly initialize an activity", () => {
        expect(activity.activityId).toMatch(/activity-/);
        expect(activity.activityName).toBe("Trekking");
        expect(activity.description).toBe("A challenging trek through the mountains");
        expect(activity.cost).toBe(100);
        expect(activity.capacity).toBe(10);
        expect(activity.destination.destinationName).toBe("Himalayan Adventure");
    });

    test("should enroll a passenger when capacity is available", () => {
        const result = activity.enrollPassenger();
        expect(result).toBeTruthy();
        expect(activity.getAvailableSpaces()).toBe(9);
    });

    test("should not enroll a passenger when capacity is full", () => {
        // Fill up the activity
        for (let i = 0; i < 10; i++) {
            activity.enrollPassenger();
        }
        // Try to enroll one more passenger
        const result = activity.enrollPassenger();
        expect(result).toBeFalsy();
        expect(activity.getAvailableSpaces()).toBe(0);
    });

    test("should print activity details correctly", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        activity.printActivityDetails();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Activity: Trekking"));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Available Space: 10"));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
