const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'login.html';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('userName').textContent = user.name;
  renderCourses();
});

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function showModal() {
  document.getElementById('modal').classList.remove('hidden');
  loadCourses();
}

function hideModal() {
  document.getElementById('modal').classList.add('hidden');
}

async function loadCourses() {
  try {
    const res = await axios.get('http://localhost:5000/api/courses');
    const list = document.getElementById('courseList');
    list.innerHTML = '';
    res.data.forEach(course => {
      const btn = document.createElement('button');
      btn.className = 'block w-full border px-4 py-2 text-left rounded hover:bg-gray-100';
      btn.innerHTML = `<strong>${course.subject} (Kelas ${course.grade})</strong><br><span class="text-sm text-gray-600">${course.description || ''}</span>`;
      btn.onclick = () => addClass(course);
      list.appendChild(btn);
    });
  } catch (err) {
    console.error('Gagal memuat daftar kursus:', err);
  }
}

function addClass(course) {
  const classes = JSON.parse(localStorage.getItem(`courses_${user.email}`) || '[]');
  classes.push(course);
  localStorage.setItem(`courses_${user.email}`, JSON.stringify(classes));
  hideModal();
  renderCourses();
}

function deleteClass(index) {
  const classes = JSON.parse(localStorage.getItem(`courses_${user.email}`) || '[]');
  classes.splice(index, 1);
  localStorage.setItem(`courses_${user.email}`, JSON.stringify(classes));
  renderCourses();
}

function renderCourses() {
  const container = document.getElementById('classContainer');
  container.innerHTML = '';
  const classes = JSON.parse(localStorage.getItem(`courses_${user.email}`) || '[]');
  document.getElementById('academyCount').textContent = classes.length;

  classes.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow relative';
    card.innerHTML = `
      <h3 class="font-semibold text-gray-900 text-lg mb-1">${c.subject} (Kelas ${c.grade})</h3>
      <p class="text-sm text-gray-600">${c.description || 'Belum ada deskripsi'}</p>
      <a href="course-detail.html?subject=${encodeURIComponent(c.subject)}&grade=${c.grade}" class="text-sm text-blue-500 mt-2 hover:underline inline-block">Lihat detail</a>
      <button onclick="deleteClass(${i})" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm">×</button>
    `;
    container.appendChild(card);
  });
}
