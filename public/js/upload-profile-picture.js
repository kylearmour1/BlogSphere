const uploadProfilePictureForm = document.querySelector('#upload-button');
const profilePictureInput = document.querySelector('#profile_picture');
const previewImage = document.querySelector('#preview-image');

profilePictureInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    previewImage.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    previewImage.src = '';
  }
});

uploadProfilePictureForm.addEventListener('click', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('profile_picture', profilePictureInput.files[0]);

  try {
    const response = await fetch('/api/profile-picture', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Profile picture uploaded successfully.');

      const data = await response.json();
      if (data.url) {
        previewImage.src = data.url;
        previewImage.style.display = 'block';
      }
    } else {
      alert('Failed to upload profile picture.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to upload profile picture.');
  }
});
