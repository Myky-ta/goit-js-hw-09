const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 🔸 1. Початковий об'єкт
let formData = {
  email: '',
  message: '',
};

// 🔸 2. Відновлення даних з локального сховища
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };
    form.elements.email.value = parsedData.email || '';
    form.elements.message.value = parsedData.message || '';
  } catch (error) {
    console.error('Помилка при парсингу даних:', error);
  }
}

// 🔸 3. Делегування події input
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 🔸 4. Обробка submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
