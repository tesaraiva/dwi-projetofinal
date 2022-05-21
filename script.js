let btnDownload = document.querySelector("#downloadCVButton");
let themeToggle = document.querySelector("#themeToggle");
let themeToggleCheckbox = document.querySelector("#themeCheckbox");

let mailForm = document.querySelector('#mailForm');
let formName = document.querySelector("#formName");
let formEmail = document.querySelector("#formEmail");
let formMessage = document.querySelector("#formMessage");
let formSubmit = document.querySelector("#formSubmit");
let formFeedback = document.querySelector("#formFeedback");

let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

async function startDownload() {
  let url = "./files/CV_TeresaRibeiro.pdf";
  let fileName = "Teresa Ribeiro - CV";
  const res = await fetch(url);
  const blob = await res.blob();
  window.saveAs(blob, fileName);
}

function toggleDarkMode() {
  if (isDarkMode) {
    setLight();
  } else {
    setDark();
  }
}

async function submitForm(formattedFormData) {
  const response = await fetch('mail.php', {
    method: 'POST',
    body: formattedFormData,
  });

  const data = await response.text();
  formFeedback.textContent = data;

  formName.value = "";
  formEmail.value = "";
  formMessage.value = "";
}

function main() {
  btnDownload.addEventListener('click', startDownload);
  themeToggle.addEventListener('click', toggleDarkMode);
  
  mailForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formattedFormData = new FormData();
    formattedFormData.set('name', formName.value);
    formattedFormData.set('email', formEmail.value);
    formattedFormData.set('message', formMessage.value);

    submitForm(formattedFormData);
  });

  if (isDarkMode) {
    setDark();
  } else {
    setLight();
  }
}

function setDark() {
  isDarkMode = true;
  themeToggleCheckbox.setAttribute('checked', true);
  document.querySelector('html').setAttribute('data-theme', 'dark')
}

function setLight() {
  isDarkMode = false;
  themeToggleCheckbox.removeAttribute('checked');
  document.querySelector('html').setAttribute('data-theme', 'light');
}

main();