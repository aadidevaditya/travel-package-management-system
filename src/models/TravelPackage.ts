import { randomUUID } from 'crypto';
import { Destination } from './Destination';
import { GoldPassenger } from './GoldPassenger';
import { PremiumPassenger } from './PremiumPassenger';
import { StandardPassenger } from './StanderdPassenger';

export class TravelPackage {
    destinations: Destination[];
    packageId: string;
    passengerCapacity: number;
    packageName: string;
    passengers: (StandardPassenger | GoldPassenger | PremiumPassenger)[];

    constructor(packageName: string, passengerCapacity: number) {
        this.packageId = `package-${randomUUID()};`
        this.packageName = packageName;
        this.passengerCapacity = passengerCapacity;
        this.destinations = [];
        this.passengers = [];
        console.log(`Package created: `, this);
    }

    addDestination(destination: Destination): void {
        this.destinations.push(destination);
        destination.travelPackages.push({packageId: this.packageId, packageName: this.packageName});
        console.log(`Destination "${destination.destinationName}" added to Package "${this.packageName}"`);
    }

    addPassenger(passenger: StandardPassenger | GoldPassenger | PremiumPassenger): void {
        if (this.passengers.length < this.passengerCapacity) {
            this.passengers.push(passenger);
            console.log(`Passenger "${passenger.passengerName}" added to Package "${this.packageName}"`);
        } else {
            console.log(`Passenger "${passenger.passengerName}" can not be added to Package "${this.packageName}". Capacity: ${this.passengerCapacity}`);

        }
    }

    printAvailableActivityDetails(): void {
        console.log("\n======= START: printAvailableActivityDetails =======\n");
        console.log(`Travel Package: ${this.packageName}\n`);
        this.destinations.forEach(destination => {
            console.log(`Destination: ${destination.destinationName}\n`);
            destination.getActivities().forEach(activity => {
                if (activity.getAvailableSpaces() > 0) {
                    activity.printActivityDetails();
                }
            });
        });
        console.log("\n======= END: printAvailableActivityDetails =======\n");
    }

    printItinerary(): void {
        console.log("\n======= START: printItinerary =======\n");
        console.log(`Travel Package: ${this.packageName}`);
        this.destinations.forEach(destination => {
            console.log(`\nDestination: ${destination.destinationName}`);
            destination.getActivities().forEach(activity => {
                console.log(`  Activity: ${activity.activityName}, Cost: ${activity.cost}, Capacity: ${activity.capacity}, Description: ${activity.description}`);
            });
        });
        console.log("\n======= END: printItinerary =======\n");
    }

    printPackageDetails(): void {
        console.log(this);
    }

    printPassengerList(): void {
        console.log("\n======= START: printPassengerList =======\n");
        console.log(`Travel Package: ${this.packageName}`);
        console.log(`Passenger Capacity: ${this.passengerCapacity}`);
        console.log(`Enrolled Passengers: ${this.passengers.length}`);
        this.passengers.forEach(passenger => {
            console.log(`  Passenger: ${passenger.passengerName} (${passenger.passengerNumber})`);
        });
        console.log("\n======= END: printPassengerList =======\n");
    }
}
