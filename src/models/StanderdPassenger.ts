import { Activity } from './Activity';
import { Passenger } from './Passenger';
import { TravelPackage } from './TravelPackage';

export class StandardPassenger extends Passenger {
    balance: number;

    constructor(name: string, passengerNumber: string, balance: number) {
        super(name, passengerNumber);
        this.balance = balance;
        console.log("Passenger Created: ", this);
    }

    signUpForActivity(activity: Activity, travelPackage: TravelPackage): boolean {
        if(!travelPackage.passengers.includes(this)) {
            console.log(`Passenger "${this.passengerName}" must be added to package "${travelPackage.packageName}" before signing up for "${activity.activityName}"`);
            return false;
        }
        if (activity.cost > this.balance) {
            console.log(`"${this.passengerName}" has insufficient balance for activity "${activity.activityName}" Cost: ${activity.cost}. Balance: ${this.balance}`);
            return false;
        }
        if (activity.enrollPassenger()) {
            this.activities.push({ activityId: activity.activityId, activityName: activity.activityName, destinationName: activity.destination.destinationName, pricePaid: activity.cost });
            this.balance -= activity.cost;
            console.log(`"${this.passengerName}" signed up for activity "${activity.activityName}" at Cost: ${activity.cost}. Remaining Balance: ${this.balance}`);
            return true;
        }
        return false;
    }

    printPassengerDetails(): void {
        console.log("\n======= START: printPassengerDetails =======\n");
        console.log(`Passenger Name: ${this.passengerName}`);
        console.log(`Passenger Number: ${this.passengerNumber}`);
        console.log(`Balance: ${this.balance}`);
        this.activities.forEach(activity => {
            console.log(`  Activity: ${activity.activityName}, Destination: ${activity.destinationName}, Price Paid: ${activity.pricePaid})`);
        });
        console.log("\n======= END: printPassengerDetails =======\n");
    }
}