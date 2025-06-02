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
let selectedIcons = ["💖", "💗", "💕", "❤️"];
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

// Upload ảnh lên Cloudinary
async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dtxohfp9j/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'dear_love');
  const res = await fetch(url, { method: 'POST', body: formData });
  const data = await res.json();
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
      .map(msg => msg.trim())
      .filter(msg => msg !== '');

    let icons = selectedIcons;
    if (customIconsInput.value.trim() !== "") {
      icons = customIconsInput.value.split(',').map(i => i.trim()).filter(i => i !== "");
    }

    let imageUrls = [];
    if (imagesInput.files.length > 0) {
      const uploads = Array.from(imagesInput.files).slice(0, 5).map(file => uploadImageToCloudinary(file));
      imageUrls = await Promise.all(uploads);
    }

    const galaxyData = {
      messages,
      icons,
      colors: {
        love: document.getElementById('loveColor').value
      },
      song: customSongUrl.value.trim() !== '' ? customSongUrl.value.trim() : songSelect.value,
      images: imageUrls,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "galaxies"), galaxyData);
    const galaxyId = docRef.id;
    const galaxyUrl = `${window.location.origin}/creator/MuaDongToky.html?id=${galaxyId}`;

    loading.style.display = 'none';
    result.style.display = 'block';
    document.getElementById('resultLink').textContent = galaxyUrl;
    document.getElementById('viewBtn').href = galaxyUrl;

    document.getElementById('copyBtn').addEventListener('click', () => {
      navigator.clipboard.writeText(galaxyUrl);
    });

    const qrCode = new QRCodeStyling({
      width: 160,
      height: 160,
      data: galaxyUrl,
      dotsOptions: {
        color: "#ff6b9d",
        type: "rounded"
      },
      backgroundOptions: {
        color: "transparent"
      }
    });
    qrCode.append(document.getElementById("qrCode"));

  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra!");
  }

  submitBtn.disabled = false;
});

// Preview ảnh
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

// Nhạc nghe thử
const songSelect = document.getElementById('song');
const customSongUrl = document.getElementById('customSongUrl');
const checkSongBtn = document.getElementById('checkSongBtn');
const customSongAudio = document.getElementById('customSongAudio');

checkSongBtn.addEventListener('click', () => {
  const url = customSongUrl.value.trim();
  if (!url) return alert('Nhập link nhạc!');
  customSongAudio.src = url;
  customSongAudio.style.display = 'block';
  customSongAudio.autoplay = true;
  customSongAudio.play().catch(() => alert('Không phát được!'));
});

// Hiệu ứng icon rơi theo biểu tượng người dùng chọn
function createFallingIcons() {
  let getIcons = () => {
    const iconsFromInput = customIconsInput.value.trim();
    if (iconsFromInput) {
      return iconsFromInput.split(',').map(i => i.trim()).filter(i => i !== '');
    }
    const selected = document.querySelector('.icon-option.selected');
    return selected ? JSON.parse(selected.dataset.icons) : ["💖", "💕", "💗", "💘"];
  };

  setInterval(() => {
    const icons = getIcons();
    if (icons.length === 0) return;

    const icon = document.createElement('div');
    icon.className = 'falling-icon';
    icon.innerText = icons[Math.floor(Math.random() * icons.length)];
    icon.style.position = 'fixed';
    icon.style.left = Math.random() * 100 + 'vw';
    icon.style.top = '-40px';
    icon.style.fontSize = `${18 + Math.random() * 10}px`;
    icon.style.opacity = 0.8;
    icon.style.animation = `fall ${3 + Math.random() * 2}s linear`;
    document.body.appendChild(icon);
    setTimeout(() => icon.remove(), 6000);
  }, 400);
}

// CSS animation icon rơi
const style = document.createElement('style');
style.textContent = `
@keyframes fall {
  to { transform: translateY(110vh); opacity: 0; }
}
.falling-icon {
  pointer-events: none;
  z-index: 9999;
  animation-fill-mode: forwards;
  position: fixed;
}
`;
document.head.appendChild(style);

createFallingIcons();
