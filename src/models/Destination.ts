import { randomUUID } from 'crypto';
import { Activity } from './Activity';

export class Destination {
    activities: Activity[];
    destinationId: string;
    destinationName: string;
    travelPackages: Array<{packageId: string, packageName: string}>;
    constructor(destinationName: string) {
        this.destinationId = `destination-${randomUUID()};`
        this.destinationName = destinationName;
        this.travelPackages = [];
        this.activities = [];
        console.log("Destination created: ", this);
    }

    getActivities(): Activity[] {
        return this.activities;
    }
}
