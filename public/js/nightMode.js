const modeBtn = document.getElementById('modeBtn');
const modeLabel = document.getElementById('modeLabel');

modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('color-scheme', 'dark');
    modeBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke fa-rotate-180" style="color: #eca758">';
    modeLabel.textContent = "Light Mode";

  } else {
    localStorage.setItem('color-scheme', 'light');
    modeBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke" style="color: var(--color)"></i>';
    modeLabel.textContent = "Dark Mode"
  }
});

const userPreference = localStorage.getItem('color-scheme');
if (userPreference === 'dark') {
  document.body.classList.add('dark-mode');
  modeBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke fa-rotate-180" style="color: #eca758">';
  modeLabel.textContent = "Light Mode";
}


