import { randomUUID } from "crypto";
import { Destination } from "./Destination";

export class Activity {
    activityId : string;
    activityName: string;
    description: string;
    capacity: number;
    cost: number;
    currentlyEnrolled: number;
    destination: {destinationId: string, destinationName: string};

    constructor(activityName: string, description: string, cost: number, capacity: number, destination: Destination) {
        this.activityId = `activity-${randomUUID()};`
        this.activityName = activityName;
        this.description = description;
        this.cost = cost;
        this.capacity = capacity;
        this.currentlyEnrolled = 0;
        this.destination = {
            destinationId: destination.destinationId,
            destinationName: destination.destinationName
        };
        console.log("activity Created: ", this);
        this.addActivityToDestination(destination);
    }

    private addActivityToDestination(destination: Destination): void {
        destination.activities.push(this);
        console.log(`Activity "${this.activityName}" added to destination "${destination.destinationName}"`);
    }

    enrollPassenger(): boolean {
        if (this.currentlyEnrolled < this.capacity) {
            this.currentlyEnrolled++;
            return true;
        }
        return false;
    }

    getAvailableSpaces(): number {
        return this.capacity - this.currentlyEnrolled;
    }

    printActivityDetails(): void {
        console.log(`Activity: ${this.activityName}`);
        console.log(`Description: ${this.description}`);
        console.log(`Cost: ${this.cost}`);
        console.log(`Total Capacity: ${this.capacity}`);
        console.log(`Available Space: ${this.getAvailableSpaces()}\n`);
    }
}
