import { Activity } from "./Activity";
import { Passenger } from "./Passenger";
import { TravelPackage } from "./TravelPackage";

export class PremiumPassenger extends Passenger {
    constructor(name: string, passengerNumber: string) {
        super(name, passengerNumber);
        console.log("Passenger Created: ", this);
    }

    signUpForActivity(activity: Activity, travelPackage: TravelPackage): boolean {
        if(!travelPackage.passengers.includes(this)) {
            console.log(`Passenger "${this.passengerName}" must be added to package "${travelPackage.packageName}" before signing up for "${activity.activityName}"`);
            return false;
        }
        if (activity.enrollPassenger()) {
            this.activities.push({ activityId: activity.activityId, activityName: activity.activityName, destinationName: activity.destination.destinationName, pricePaid: 0 });
            console.log(`"${this.passengerName}" signed up for activity "${activity.activityName}" for FREE.`);
            return true;
        }
        return false;
    }

    printPassengerDetails(): void {
        console.log("\n======= START: printPassengerDetails =======\n");
        console.log(`Passenger Name: ${this.passengerName}`);
        console.log(`Passenger Number: ${this.passengerNumber}`);
        this.activities.forEach(activity => {
            console.log(`  Activity: ${activity.activityName}, Destination: ${activity.destinationName}, Price Paid: ${activity.pricePaid})`);
        });
        console.log("\n======= END: printPassengerDetails =======\n");
    }
}