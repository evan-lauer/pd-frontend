import ShortUniqueId from "short-unique-id";
import { reactive } from "vue";
// Temp store for maintaining events, in order to display on 
// calendar
export const eventData = reactive ({
    eventIds: [],

    eventDict: {
        0: {
            
        }
    }
}

)