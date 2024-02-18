'use strict';

const STORAGE_KEY = 'FEEDBACK_FORM_STATE';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Please fill in both email and message fields');
    return;
  }

  const formData = { email, message };
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.elements.email.value = '';
  form.elements.message.value = '';
}

function onFormInput() {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const formData = { email, message };
  saveToLocalStorage(STORAGE_KEY, formData);
}

function saveToLocalStorage(key, data) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(key, jsonData);
}

function loadFromLocalStorage(key) {
  const jsonData = localStorage.getItem(key);
  if (jsonData) {
    return JSON.parse(jsonData);
  }
  return {};
}

function init() {
  const formData = loadFromLocalStorage(STORAGE_KEY);
  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
}

init();