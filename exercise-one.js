/**
 * Author: Facundo Ariel Malgieri || https://fmalgieri.com
 *
 * This function receives two params in order to provide a more generic and 
 * reusable solution to the presented problem:
 *  
 * How many Sundays are the first day of the month in the XX century?
 * 
 * @param from from which year you want to start. E.g 1901
 * @param to  to which year you want to calculate. E.g 2000
 */
const calculateSundays = (from, to) => {
    // I create the Date object.
    const date = new Date();
    
    let month = 0, // will be used in setFullYear which receives the 12 months from 0 - 11
        year = from, // I copy the reference in order to keep my original from value to display later
        array = []; // to save the dates and the length of the array

    // Iterate through the years.
    while (year <= to) {
        // If the month equals 12 it means that it has already evaluated from 0 to 11, resets the months and sums 1 year
        if (month == 12) {
            month = 0;
            year++;
        }
        // Update the date of the Date object.
        date.setFullYear(year, month++, 1);

        // getDay() returns 0 if the day is Sunday and if it's true it pushes the date converted to Locale Date String into the array
        if (date.getDay() === 0) {
            array.push(date.toLocaleDateString());
        }
    }
    // Log the answer with all the dates as evidence.
    console.log(`There are ${array.length} first day of the month sundays between the years ${from} and ${to} and these are the dates:\n ${array.join(' \n ')}`);
}
// Run the function
calculateSundays(1901, 2000);

