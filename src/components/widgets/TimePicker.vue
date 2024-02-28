<script setup>
import { ref, computed } from 'vue';
import useClickOutside from 'src/util/useClickOutside';
const props = defineProps({
  timestamp: Date
});

// Computes the 12 hour value (so if .getHours() returns 13, it returns 1 as we would expect on
// a 12 hour clock.)
//
// Value is 1-12
const hours = computed(() =>
  props.timestamp.getHours() - 12 < 0 ? props.timestamp.getHours() : props.timestamp.getHours() - 12
);
// Computes the minutes
const minutes = computed(() => props.timestamp.getMinutes());
// Computes AM or PM from the hours
const amOrPm = computed(() => (props.timestamp.getHours() < 12 ? 'AM' : 'PM'));

// Returns the index of the correct hour in the hoursOptions array
const hourIndex = computed(() => {
  if (hours.value < 0 || hours.value > 12) throw new Error('something went wrong in TimePicker');
  if (hours.value === 12) {
    return 0;
  } else {
    return hours.value;
  }
});
// Returns the index of the correct minute in the minutesOptions array
const minuteIndex = computed(() => {
  if (minutes.value < 0 || minutes.value > 59) {
    throw new Error('something went wrong in TimePicker');
  }
  return Math.floor(minutes.value / 5);
});

const hoursOptions = ref(['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
const minutesOptions = ref([
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
]);

const openDropdown = ref('none');
const selectedField = ref('none');

const hoursDropdown = ref();
const hoursDiv = ref();
const minutesDropdown = ref();
const minutesDiv = ref();
const amOrPmDropdown = ref();
const amOrPmDiv = ref();

useClickOutside(
  hoursDropdown,
  () => {
    if (openDropdown.value === 'hours') {
      openDropdown.value = 'none';
    }
    if (selectedField.value === 'hours') {
      selectedField.value = 'none';
    }
    // TODO: Add another check to switch the selected field when appropriate
  },
  hoursDiv
);
useClickOutside(
  minutesDropdown,
  () => {
    if (openDropdown.value === 'minutes') {
      openDropdown.value = 'none';
    }
    if (selectedField.value === 'minutes') {
      selectedField.value = 'none';
    }
  },
  minutesDiv
);
useClickOutside(
  amOrPmDropdown,
  () => {
    if (openDropdown.value === 'amOrPm') {
      openDropdown.value = 'none';
    }
    if (selectedField.value === 'amOrPm') {
      selectedField.value = 'none';
    }
  },
  amOrPmDiv
);

// When the input changes we will emit a "time-change" event with arguments hours, minutes, amOrPm
</script>

<template>
  <div class="timePickerContainer">
    <div
      ref="hoursDiv"
      class="hours field"
      :class="{ selected: selectedField === 'hours' }"
      @click="
        () => {
          if (openDropdown === 'hours') {
            openDropdown = 'none';
          } else if (selectedField === 'hours') {
            openDropdown = 'hours';
          } else {
            selectedField = 'hours';
          }
        }
      "
    >
      <div class="typography">
        {{ hoursOptions[hourIndex] }}
        <ul
          ref="hoursDropdown"
          class="hours dropdown"
          :class="{ open: openDropdown === 'hours' }"
        >
          <li
            v-for="option in hoursOptions"
            :key="option"
            :class="{ selected: hoursOptions[hourIndex] === option }"
            @click="
              () => {
                const newTimestamp = new Date(timestamp);
                if (amOrPm === 'AM') {
                  newTimestamp.setHours(Number(option) % 12); // If AM, then 12 goes to 0, anything from 1 to 11 just stays the same
                } else {
                  newTimestamp.setHours((Number(option) % 12) + 12); // If PM, then 12 goes to 0 + 12, 1 goes to 13, 11 goes to 23, etc.
                }
                $emit('timestampChange', newTimestamp);
              }
            "
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
    :
    <div
      ref="minutesDiv"
      class="minutes field"
      :class="{ selected: selectedField === 'minutes' }"
      @click="
        () => {
          if (openDropdown === 'minutes') {
            openDropdown = 'none';
          } else if (selectedField === 'minutes') {
            openDropdown = 'minutes';
          } else {
            selectedField = 'minutes';
          }
        }
      "
    >
      <div class="typography">
        {{ minutesOptions[minuteIndex] }}
        <ul
          ref="minutesDropdown"
          class="minutes dropdown"
          :class="{ open: openDropdown === 'minutes' }"
        >
          <li
            v-for="option in minutesOptions"
            :key="option"
            :class="{ selected: minutesOptions[minuteIndex] === option }"
            @click="
              () => {
                const newTimestamp = new Date(timestamp);
                newTimestamp.setMinutes(Number(option));
                $emit('timestampChange', newTimestamp);
              }
            "
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
    :
    <div
      ref="amOrPmDiv"
      class="amOrPm field"
      :class="{ selected: selectedField === 'amOrPm' }"
      @click="
        () => {
          if (openDropdown === 'amOrPm') {
            openDropdown = 'none';
          } else if (selectedField === 'amOrPm') {
            openDropdown = 'amOrPm';
          } else {
            selectedField = 'amOrPm';
          }
        }
      "
    >
      <div class="typography">
        {{ amOrPm }}
        <ul
          ref="amOrPmDropdown"
          class="amOrPm dropdown"
          :class="{ open: openDropdown === 'amOrPm' }"
        >
          <li
            :class="{ selected: amOrPm === 'AM' }"
            @click="
              () => {
                if (amOrPm === 'AM') {
                  return;
                }
                const newTimestamp = new Date(timestamp);
                const currHours = timestamp.getHours();
                newTimestamp.setHours(currHours - 12);
                $emit('timestampChange', newTimestamp);
              }
            "
          >
            AM
          </li>
          <li
            :class="{ selected: amOrPm === 'PM' }"
            @click="
              () => {
                if (amOrPm === 'PM') {
                  return;
                }
                const newTimestamp = new Date(timestamp);
                const currHours = timestamp.getHours();
                newTimestamp.setHours(currHours + 12);
                $emit('timestampChange', newTimestamp);
              }
            "
          >
            PM
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dropdown > li {
  transition: background 0.1s linear;
}

.dropdown > li.selected {
  background: rgba(88, 131, 122, 0.5);
}

.dropdown > li:hover {
  background: rgba(88, 131, 122, 0.4);
}

.dropdown > li.selected:hover {
  background: rgba(88, 131, 122, 0.6);
}

.field.selected > .typography {
  background: rgba(88, 131, 122, 0.3);
  
}

.amOrPm.dropdown {
  position: relative;
  bottom: 33px;
}

.hours.dropdown,
.minutes.dropdown {
  position: relative;
  bottom: 135px;
}

.dropdown {
  display: flex;
  flex-direction: column;
  z-index: 500;
  background: white;
  user-select: none;
  outline: 4px solid white;
  -webkit-box-shadow: 2px 5px 12px 3px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 2px 5px 12px 3px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 5px 12px 3px rgba(0, 0, 0, 0.2);
  gap: 5px;
}

.dropdown > li {
  z-index: 500;
}

.timePickerContainer {
  height: 20px;
  width: 80px;
  display: flex;
  gap: 5px;
  padding-top: 0.75px;
  padding-bottom: 0.75px;
  padding-right: 2px;
  padding-left: 4px;
  margin-left: 10px;
  background-color: lightgray;
  border-radius: 4px;
  justify-content: center;
}
.field {
  height: 100%;
  width: 100%;
  border-radius: 4px;
  border: 0px solid transparent;
}

.field:hover {
  cursor: default;
}

.typography {
  display: flex;
  margin: 0;
  width: 16px;
  border: none;
  outline: none;
  height: 100%;
  user-select: none;
  align-items: center;
  justify-content: center;
}

.typography:focus {
  outline: none;
}

.amOrPm > .typography {
  width: 22px;
}

.typography > ul {
  display: none;
}

.typography > ul.open {
  display: flex;
}
</style>
