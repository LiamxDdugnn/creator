import {
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase-config.js';

// Xử lý chọn icon
const iconOptions = document.querySelectorAll('.icon-option');
let selectedIcons = ["♥", "💖", "💕", "💗"];
const customIconsInput = document.getElementById('customIcons');

iconOptions.forEach(option => {
  option.addEventListener('click', () => {
    iconOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedIcons = JSON.parse(option.dataset.icons);
    customIconsInput.value = "";
  });
});

customIconsInput.addEventListener('input', () => {
  if (customIconsInput.value.trim() !== "") {
    iconOptions.forEach(opt => opt.classList.remove('selected'));
  }
});

// Color picker
const colorInputs = document.querySelectorAll('input[type="color"]');
colorInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    const preview = e.target.parentElement.querySelector('.color-preview');
    preview.style.background = e.target.value;
  });
});

// Upload ảnh lên Cloudinary
async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dtxohfp9j/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'dear_love');
  const response = await fetch(url, { method: 'POST', body: formData });
  const data = await response.json();
  return data.secure_url;
}

// Xử lý gửi form
document.getElementById('galaxyForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  submitBtn.disabled = true;
  loading.style.display = 'block';
  result.style.display = 'none';

  try {
    const messages = document.getElementById('messages').value
      .split('\n')
      .filter(msg => msg.trim() !== '')
      .map(msg => msg.trim());

    let icons = selectedIcons;
    if (customIconsInput.value.trim() !== "") {
      icons = customIconsInput.value.split(",").map(i => i.trim()).filter(i => i !== "");
    }

    let imageUrls = [];
    if (imagesInput.files.length > 0) {
      const uploadPromises = Array.from(imagesInput.files).slice(0, 5).map(file => uploadImageToCloudinary(file));
      imageUrls = await Promise.all(uploadPromises);
    }

    const galaxyData = {
      messages,
      icons,
      colors: {
        love: document.getElementById('loveColor').value,
        birthday: document.getElementById('birthdayColor').value,
        date: document.getElementById('dateColor').value,
        special: document.getElementById('specialColor').value,
        heart: document.getElementById('heartColor').value
      },
      song: customSongUrl.value.trim() !== '' ? customSongUrl.value.trim() : songSelect.value,
      images: imageUrls,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "galaxies"), galaxyData);
    const galaxyId = docRef.id;
    const galaxyUrl = `${window.location.origin}/galaxy-viewer.html?id=${galaxyId}`;

    loading.style.display = 'none';
    result.style.display = 'block';
    document.getElementById('resultLink').textContent = galaxyUrl;
    document.getElementById('viewBtn').href = galaxyUrl;

    document.getElementById('copyBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(galaxyUrl);
    });

  } catch (error) {
    console.error('Lỗi:', error);
    alert("Có lỗi xảy ra, thử lại nhé!");
  }

  submitBtn.disabled = false;
});

// Hiển thị ảnh preview
const imagesInput = document.getElementById('images');
const imagePreview = document.getElementById('imagePreview');
imagesInput.addEventListener('change', () => {
  imagePreview.innerHTML = '';
  Array.from(imagesInput.files).slice(0, 5).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.width = '60px';
    img.style.height = '60px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';
    imagePreview.appendChild(img);
  });
});

// Nhạc
const songSelect = document.getElementById('song');
const customSongUrl = document.getElementById('customSongUrl');
const checkSongBtn = document.getElementById('checkSongBtn');
const customSongAudio = document.getElementById('customSongAudio');
const previewDefaultSongBtn = document.getElementById('previewDefaultSongBtn');

songSelect.addEventListener('change', () => {
  if (songSelect.value) {
    customSongUrl.value = '';
    customSongAudio.style.display = 'none';
    customSongAudio.pause();
  }
});

customSongUrl.addEventListener('input', () => {
  if (customSongUrl.value.trim() !== '') {
    songSelect.value = '';
  }
  customSongAudio.style.display = 'none';
  customSongAudio.pause();
});

checkSongBtn.addEventListener('click', () => {
  const url = customSongUrl.value.trim();
  if (!url) return alert('Vui lòng nhập link nhạc!');
  customSongAudio.src = url;
  customSongAudio.style.display = 'block';
  customSongAudio.play().catch(() => alert('Không phát được!'));
});

previewDefaultSongBtn.addEventListener('click', () => {
  const selectedSong = songSelect.value;
  if (!selectedSong) return alert('Chọn bài hát trước!');
  customSongAudio.src = `songs/${selectedSong}`;
  customSongAudio.style.display = 'block';
  customSongAudio.play().catch(() => alert('Không phát được!'));
});
