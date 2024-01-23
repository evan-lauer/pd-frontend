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