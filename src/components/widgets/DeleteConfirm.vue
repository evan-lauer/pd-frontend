<script setup>
import { eventDetails, eventDeleteConfirm } from 'src/stores/eventDetailsStores';
import SimpleButton from '../icons/SimpleButton.vue';
import { eventData } from 'src/stores/eventStores';
import { listsData, selectedTab, listDeleteConfirm } from 'src/stores/listStores';
import useClickOutside from 'src/util/useClickOutside';
import { ref } from 'vue';

defineProps({
  item: String,

  deleteHandlerIs: {
    type: String,
    validator(value) {
      return ['event', 'list'].includes(value);
    }
  },
  tabIdIs: {
    type: String,
    default: null
  }
});

function returnToBaseline() {
  eventDeleteConfirm.isConfirmDeleteActive = false;
  listDeleteConfirm.isConfirmDeleteActive = false;
  eventDetails.isDetailsActive = true;
  //list is active
}

function returnToList() {
  listDeleteConfirm.isConfirmDeleteActive = false;
  //list is active
  pass;
}

function returnToEvents() {
  eventDeleteConfirm.isConfirmDeleteActive = false;
  eventDetails.isDetailsActive = false;
}

function deleteEventHandler() {
  eventData.deleteEventFromBoth(eventDetails.eventId);
  returnToEvents();
}

function deleteSelectedTab(tabToDelete) {
  if (listsData.tabIdArray.length > 1) {
    const selectedTabIndex = listsData.tabIdArray.findIndex((id) => id === tabToDelete);
    if (selectedTabIndex === listsData.tabIdArray.length - 1) {
      // If last tab, switch to previous tab
      selectedTab.id = listsData.tabIdArray[selectedTabIndex - 1];
    } else {
      // Otherwise, switch to next tab
      selectedTab.id = listsData.tabIdArray[selectedTabIndex + 1];
    }
  } else {
    selectedTab.id = undefined;
  }
  listsData.deleteList(tabToDelete);
}

function deleteListHandler(tabToDelete) {
  deleteSelectedTab(tabToDelete);
  returnToList();
}

function confirmDeleteHandler(deleting, tabToDelete) {
  if (deleting === 'event') {
    deleteEventHandler();
  } else if (deleting === 'list') {
    deleteListHandler(tabToDelete);
  } else {
    returnToBaseline();
  }
}

function confirmCancelHandler(canceling) {
  if (canceling === 'event') {
    returnToEvents();
  } else if (canceling === 'list') {
    returnToList();
  } else {
    returnToBaseline();
  }
}

const confirmWindow = ref();
const confirmContainer = ref();

// useClickOutside(
//   confirmContainer,
//   () => {
//     eventDeleteConfirm.isConfirmDeleteActive = false;
//   },
//   confirmWindow
// );
</script>

<template>
  <div
    ref="confirmWindow"
    class="surroundingContainer"
  >
    <div
      ref="confirmContainer"
      class="deleteConfirmContainer"
    >
      <div class="confirmQuestion">Are you sure you want to delete this {{ item }}?</div>
      <div class="consequenceMessage">You cannot undo this action.</div>
      <div class="actionButtons">
        <div class="cancelButtons">
          <SimpleButton
            inner-text="Cancel"
            @click="confirmCancelHandler(deleteHandlerIs)"
          />
        </div>
        <div class="spacing"></div>
        <div class="deleteButton"></div>
        <SimpleButton
          inner-text="Confirm"
          @click="confirmDeleteHandler(deleteHandlerIs, tabIdIs)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.surroundingContainer {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
  height: 95%;
  z-index: 10;
}

.deleteConfirmContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
  background-color: var(--google-docs-grey);
  border-radius: 5px;
}
.confirmQuestion {
  font-size: medium;
  padding: 20px 20px 5px 20px;
  font-weight: 700;
}

.consequenceMessage {
  font-size: small;
  padding: 5px 20px 20px 20px;
}

.actionButtons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.spacing {
  width: 5px;
}
</style>
