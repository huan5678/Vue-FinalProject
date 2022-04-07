import { reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useBookingDateStore = defineStore('bookingDates', () => {
  const baseUrl = 'https://chill-bar-sp.herokuapp.com';
  const apiPath = 'api/v1';

  const datesData = reactive({
    bookingList: [],
    bookingData: {},
    tempData: {},
    errorMessage: '',
  });

  function handleResetTempData() {
    datesData.tempData = {};
  }

  function handleGetBookingDataAll() {
    axios
      .get(`${baseUrl}/${apiPath}/`)
      .then((res) => {
        datesData.bookingList = res.data;
      })
      .catch((err) => {
        datesData.errorMessage = `產生錯誤: ${err}`;
      });
  }

  function handleGetBookingData(id) {
    axios
      .get(`${baseUrl}/${apiPath}/${id}`)
      .then((res) => {
        datesData.bookingData = res.data.order;
      })
      .catch((err) => {
        datesData.errorMessage = `產生錯誤: ${err}`;
      });
  }

  function handleEditBookingData(id, item) {
    axios
      .put(`${baseUrl}/${apiPath}/${id}`, item)
      .then(() => {
        handleGetBookingDataAll();
      })
      .catch((err) => {
        datesData.errorMessage = `產生錯誤: ${err}`;
      });
  }

  function handleDeleteBookingData(id = null) {
    axios
      .delete(`${baseUrl}/${apiPath}/${id}`)
      .then(() => {
        handleGetBookingDataAll();
      })
      .catch((err) => {
        datesData.errorMessage = `產生錯誤: ${err}`;
      });
  }

  function handleCreateBookingData(data) {
    axios
      .post(`${baseUrl}api/${apiPath}/`, data)
      .then(() => {
        handleGetBookingDataAll();
      })
      .catch((err) => {
        datesData.errorMessage = `產生錯誤: ${err}`;
      });
  }

  return {
    datesData,
    handleGetBookingDataAll,
    handleGetBookingData,
    handleEditBookingData,
    handleDeleteBookingData,
    handleCreateBookingData,
    handleResetTempData,
  };
});
export default useBookingDateStore;
