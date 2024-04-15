import { TravelPackage } from './models/TravelPackage';
import { Destination } from './models/Destination';
import { Activity } from './models/Activity';
import { GoldPassenger } from './models/GoldPassenger';
import { PremiumPassenger } from './models/PremiumPassenger';
import { StandardPassenger } from './models/StanderdPassenger';

const travelPackage = new TravelPackage("Discover Europe", 2);

const destination1 = new Destination("Paris");
const destination2 = new Destination("Rome");

const activity1 = new Activity("Eiffel Tower Visit", "Tour of the Eiffel Tower", 1500, 2, destination1);
const activity2 = new Activity("Louvre Museum Tour", "Guided tour of the Louvre", 1200, 3, destination1);
const activity3 = new Activity("Colosseum Tour", "Explore the ancient Colosseum", 1000, 4, destination2);
const activity4 = new Activity("Vatican Museum", "Visit the Vatican Museum", 2000, 1, destination2);

const passenger1 = new StandardPassenger("Ron Wesley", "0001112223", 5000);
const passenger2 = new GoldPassenger("Harry Potter", "1212121212", 10000);
const passenger3 = new PremiumPassenger("Hermoine Granger", "1112223334");

travelPackage.addDestination(destination1);
travelPackage.addDestination(destination2);

travelPackage.addPassenger(passenger1);
travelPackage.addPassenger(passenger2);
travelPackage.addPassenger(passenger3);

passenger1.signUpForActivity(activity1, travelPackage);
passenger1.signUpForActivity(activity2, travelPackage);
passenger1.signUpForActivity(activity3, travelPackage);
passenger1.signUpForActivity(activity4, travelPackage);

passenger2.signUpForActivity(activity1, travelPackage);
passenger2.signUpForActivity(activity2, travelPackage);
passenger2.signUpForActivity(activity3, travelPackage);
passenger2.signUpForActivity(activity4, travelPackage);

passenger3.signUpForActivity(activity1, travelPackage);
passenger3.signUpForActivity(activity2, travelPackage);
passenger3.signUpForActivity(activity3, travelPackage);
passenger3.signUpForActivity(activity4, travelPackage);


travelPackage.printPackageDetails();

travelPackage.printItinerary();

travelPackage.printPassengerList();

passenger1.printPassengerDetails();
passenger2.printPassengerDetails();
passenger3.printPassengerDetails();

travelPackage.printAvailableActivityDetails();

// activity1.printActivityDetails();
