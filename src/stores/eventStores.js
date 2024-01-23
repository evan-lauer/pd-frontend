// import ShortUniqueId from "short-unique-id";
import { reactive } from "vue";
// Temp store for maintaining events, in order to display on 
// calendar
export const eventData = reactive ({
    eventIds: [],

    eventDict: {
        0: { // month
            1: { // day
                event_ctr: 0
            }
        }
    },
    // functions
    addEvent: (month, day) => {
        eventData.eventDict[month][day].event_ctr++;
    }
}
)
export const eventExists = reactive ({
    // eventDict: {
    //     1: { // month
    //         1: { // day
    //             event: true
    //         },
    //         2: { // day
    //             event: true
    //         },
    //         3: { // day
    //             event: false
    //         },
    //         4: { // day
    //             event: true
    //         },
    //         5: { // day
    //             event: false
    //         },
    //         6: { // day
    //             event: false
    //         },
    //         7: { // day
    //             event: false
    //         },
    //     },
    // },

    eventDict: {
        1: {
            hasEvent: true
        },
        2: {
            hasEvent: true
        },
        3: {
            hasEvent: true
        },
        4: {
            hasEvent: false
        },
        5: {
            hasEvent: true
        },
    },

    eventArray: [true, false, true, true, true, false],

    isEventByTruth: (day) => {
        console.log(day);
        // console.log(eventExists.eventDict[day]);
        // if (eventExists.eventDict[day]) {
        //     console.log("It's a true event ")
        // }
        // return eventExists.eventDict[day];
        return eventExists.eventArray[day-1];
    },

    isEventOnDay: (day) => {
        if (day < 15) {
            console.log("Its true, there is an event ", day);
            return true;
        } else {
            return false;
        }
    }
}
)