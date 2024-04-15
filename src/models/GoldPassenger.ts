import { Activity } from "./Activity";
import { Passenger } from "./Passenger";
import { TravelPackage } from "./TravelPackage";

export class GoldPassenger extends Passenger {
    balance: number;

    constructor(name: string, passengerNumber: string, balance: number) {
        super(name, passengerNumber);
        this.balance = balance;
        console.log("Passenger Created: ", this);
    }

    signUpForActivity(activity: Activity, travelPackage: TravelPackage): boolean {
        const discountedCost = activity.cost * 0.9; // 10% discount
        if(!travelPackage.passengers.includes(this)) {
            console.log(`Passenger "${this.passengerName}" must be added to package "${travelPackage.packageName}" before signing up for "${activity.activityName}"`);
            return false;
        }
        if (discountedCost > this.balance) {
            console.log(`"${this.passengerName}" has insufficient balance for activity "${activity.activityName}" discounted Cost: ${discountedCost}. Balance: ${this.balance}`);
            return false;
        }
        if (activity.enrollPassenger()) {
            this.activities.push({ activityId: activity.activityId, activityName: activity.activityName, destinationName: activity.destination.destinationName, pricePaid: discountedCost });
            this.balance -= discountedCost;
            console.log(`"${this.passengerName}" signed up for activity "${activity.activityName}" at discounted Cost: ${discountedCost}. Remaining Balance: ${this.balance}`);
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