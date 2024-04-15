import { randomUUID } from 'crypto';
import { Activity } from './Activity';
import { TravelPackage } from './TravelPackage';

export abstract class Passenger {
    passengerId: string;
    passengerName: string;
    passengerNumber: string;
    activities: Array<{ activityId: string, activityName: string, destinationName: string, pricePaid: number }>;

    constructor(name: string, passengerNumber: string) {
        this.passengerId = `passenger-${randomUUID()};`
        this.passengerName = name;
        this.passengerNumber = passengerNumber;
        this.activities = [];
    }

    abstract signUpForActivity(activity: Activity, travelPackage: TravelPackage): boolean;

    abstract printPassengerDetails(): void;
}
