// ==== NAVIGATSIYA TUGMALARI ====
document.getElementById("homeBtn")?.addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("orderBtn")?.addEventListener("click", () => {
  window.location.href = "buyurtma.html";
});
document.getElementById("adminBtn")?.addEventListener("click", () => {
  window.location.href = "admin.html";
});
document.getElementById("aboutBtn")?.addEventListener("click", () => {
  window.location.href = "bizhaqimizda.html";
});
document.getElementById("haveBtn")?.addEventListener("click", () => {
  window.location.href = "bizdamavjudxizmatlar.html";
});

// ==== LOGIN (admin sahifasi) ====
const correctLogin = "admin";
const correctPassword = "12345678";

function checkLogin() {
  const login = document.getElementById("login").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (login === correctLogin && password === correctPassword) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminContent").style.display = "block";
    loadOrders();
    loadMedia();
  } else {
    error.innerText = "❌ Login yoki parol noto'g'ri!";
  }
}

// ==== ADMIN LOGIN (o'chirish/tahrirlash uchun parol) ====
const correctPasswordForActions = "12345678"; 

function askPassword(action, mediaId) {
  let modal = new bootstrap.Modal(document.getElementById("adminModal"));
  modal.show();

  document.getElementById("checkPasswordBtn").onclick = () => {
    const pass = document.getElementById("adminPassword").value;
    if (pass === correctPasswordForActions) {
      modal.hide();
      document.getElementById("adminPassword").value = "";
      if (action === "delete") {
        deleteMediaById(mediaId);
      } else if (action === "edit") {
        editMediaById(mediaId);
      }
    } else {
      alert("❌ Parol noto'g'ri!");
    }
  };
}

// ==== BUYURTMA SAHIFASI ====
let anketaForm = document.getElementById("anketaForm");
if (anketaForm) {
  anketaForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    let data = {};
    formData.forEach((v, k) => data[k] = v);

    try {
      console.log('Buyurtma yuborilmoqda:', data);
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      console.log('Server javobi:', result);
      
      if (response.ok) {
        alert("✅ Buyurtma muvaffaqiyatli yuborildi!");
        this.reset();
      } else {
        alert("❌ Xatolik: " + (result.error || 'Noma\'lum xatolik'));
      }
    } catch (error) {
      console.error('Xatolik:', error);
      alert("❌ Server bilan bog'lanishda xatolik!");
    }
  });
}

// ==== ADMIN SAHIFASIDA BUYURTMALAR ====
async function loadOrders() {
  let orderList = document.getElementById("orderList");
  if (!orderList) return;

  orderList.innerHTML = "<p class='text-muted'>Yuklanmoqda...</p>";
  
  try {
    const response = await fetch('/api/orders');
    const orders = await response.json();
    
    orderList.innerHTML = "";
    
    if (orders.length === 0) {
      orderList.innerHTML = "<p class='text-muted'>Hali buyurtmalar yo'q.</p>";
    } else {
      orders.forEach((o, i) => {
        let item = document.createElement("div");
        item.className = "list-group-item mb-2";
        const sana = new Date(o.tugilgan_sana).toLocaleDateString('uz-UZ');
        const yaratilgan = new Date(o.createdAt).toLocaleString('uz-UZ');
        
        item.innerHTML = `
          <h5>${i + 1}) ${o.ism} (${o.yosh} yosh)</h5>
          <p><b>Tug'ilgan sana:</b> ${sana}</p>
          <p><b>Telefon:</b> ${o.telefon}</p>
          <p><b>Tabriklovchilar:</b> ${o.tabriklovchilar}</p>
          <p><b>Asosiy tabriklovchi:</b> ${o.asosiy}</p>
          <p><b>Murojaat turi:</b> ${o.murojaat}</p>
          <p><b>Qo'shiq:</b> ${o.qoshiq}</p>
          <p><b>Buyurtmachi telefoni:</b> ${o.buyurtmachi_telefon}</p>
          <p><small class='text-muted'>Yaratilgan: ${yaratilgan}</small></p>
          <button class="btn btn-sm btn-danger mt-2" onclick="deleteOrder('${o._id}')">🗑️ O'chirish</button>
        `;
        orderList.appendChild(item);
      });
    }
  } catch (error) {
    console.error('Buyurtmalarni yuklashda xatolik:', error);
    orderList.innerHTML = "<p class='text-danger'>❌ Buyurtmalarni yuklashda xatolik!</p>";
  }
}

async function deleteOrder(id) {
  if (confirm("Bu buyurtmani o'chirishni xohlaysizmi?")) {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert("✅ Buyurtma o'chirildi!");
        loadOrders();
      } else {
        alert("❌ O'chirishda xatolik!");
      }
    } catch (error) {
      console.error('O\'chirishda xatolik:', error);
      alert("❌ Server bilan bog'lanishda xatolik!");
    }
  }
}

// ==== MEDIA (Server API bilan) ====
document.addEventListener("DOMContentLoaded", function () {
  let mediaForm = document.getElementById("mediaForm");
  if (mediaForm) {
    mediaForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      let text = document.getElementById("mediaText").value;
      let audioFile = document.getElementById("mediaAudio").files[0];

      if (!text && !audioFile) {
        alert("❗ Matn yoki audio kiritishingiz kerak!");
        return;
      }

      try {
        let audioData = null;
        if (audioFile) {
          audioData = await new Promise((resolve) => {
            let reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(audioFile);
          });
        }

        let newMedia = {
          text: text,
          audioUrl: audioData
        };

        console.log('Media yuborilmoqda:', { text: text, hasAudio: !!audioData });

        const response = await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMedia)
        });

        const result = await response.json();
        console.log('Media server javobi:', result);

        if (response.ok) {
          alert("✅ Tabrik muvaffaqiyatli qo'shildi!");
          mediaForm.reset();
          loadMedia();
          loadMainPageMedia();
        } else {
          alert("❌ Xatolik: " + (result.error || 'Noma\'lum xatolik'));
        }
      } catch (error) {
        console.error('Media qo\'shishda xatolik:', error);
        alert("❌ Server bilan bog'lanishda xatolik!");
      }
    });
  }

  // Sahifa yuklanganda media yuklaymiz
  loadMainPageMedia();
});

// ==== MEDIA KO'RSATISH (Admin sahifasi) ====
async function loadMedia() {
  let mediaContent = document.getElementById("mediaContent");
  if (!mediaContent) return;

  mediaContent.innerHTML = "<p class='text-muted'>Yuklanmoqda...</p>";

  try {
    const response = await fetch('/api/media');
    const medias = await response.json();
    
    mediaContent.innerHTML = "";

    if (medias.length === 0) {
      mediaContent.innerHTML = "<p class='text-muted'>Hali tabriklar yo'q.</p>";
    } else {
      medias.forEach((m) => {
        let card = document.createElement("div");
        card.className = "card mb-3 shadow";
        const sana = new Date(m.createdAt).toLocaleString('uz-UZ');
        
        card.innerHTML = `
          <div class="card-body">
            <h6 class="text-muted">${sana}</h6>
            <p class="card-text">${m.text || ""}</p>
            ${m.audioUrl ? `<audio controls class="w-100 mt-2"><source src="${m.audioUrl}" type="audio/mpeg"></audio>` : ""}
            <div class="mt-3">
              <button class="btn btn-sm btn-warning me-2" onclick="askPassword('edit', '${m._id}')">✏️ Tahrirlash</button>
              <button class="btn btn-sm btn-danger" onclick="askPassword('delete', '${m._id}')">🗑️ O'chirish</button>
            </div>
          </div>
        `;
        mediaContent.appendChild(card);
      });
    }
  } catch (error) {
    console.error('Media yuklashda xatolik:', error);
    mediaContent.innerHTML = "<p class='text-danger'>❌ Media yuklashda xatolik!</p>";
  }
}

// ==== BOSH SAHIFADA MEDIA KO'RSATISH ====
async function loadMainPageMedia() {
  let greetingsContainer = document.getElementById("greetingsContainer");
  if (!greetingsContainer) return;

  try {
    const response = await fetch('/api/media');
    const medias = await response.json();
    
    greetingsContainer.innerHTML = "";

    if (medias.length === 0) {
      greetingsContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info text-center">
            <h5>🎉 Hali tabriklar yo'q</h5>
            <p>Birinchi tabrikni qo'shish uchun admin sahifasiga o'ting.</p>
          </div>
        </div>
      `;
    } else {
      medias.forEach((m) => {
        let card = document.createElement("div");
        card.className = "col-md-6 col-lg-4 mb-4";
        const sana = new Date(m.createdAt).toLocaleString('uz-UZ');
        
        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="fas fa-calendar"></i> ${sana}
              </h6>
              ${m.text ? `<p class="card-text">${m.text}</p>` : ""}
              ${m.audioUrl ? `
                <div class="mt-3">
                  <audio controls class="w-100">
                    <source src="${m.audioUrl}" type="audio/mpeg">
                    Brauzeringiz audio ni qo'llab-quvvatlamaydi.
                  </audio>
                </div>
              ` : ""}
            </div>
          </div>
        `;
        greetingsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error('Bosh sahifada media yuklashda xatolik:', error);
    greetingsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          <h5>❌ Xatolik</h5>
          <p>Tabriklarni yuklashda muammo yuz berdi.</p>
        </div>
      </div>
    `;
  }
}

// ==== MEDIA O'CHIRISH ====
async function deleteMediaById(id) {
  try {
    const response = await fetch(`/api/media/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      alert("✅ Tabrik o'chirildi!");
      loadMedia();
      loadMainPageMedia();
    } else {
      alert("❌ O'chirishda xatolik!");
    }
  } catch (error) {
    console.error('Media o\'chirishda xatolik:', error);
    alert("❌ Server bilan bog'lanishda xatolik!");
  }
}

// ==== MEDIA TAHRIRLASH ====
async function editMediaById(id) {
  try {
    const response = await fetch('/api/media');
    const medias = await response.json();
    const media = medias.find(m => m._id === id);
    
    if (media) {
      let newText = prompt("✏️ Yangi matnni kiriting:", media.text);
      if (newText !== null) {
        const updateResponse = await fetch(`/api/media/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newText })
        });
        
        if (updateResponse.ok) {
          alert("✅ Tabrik yangilandi!");
          loadMedia();
          loadMainPageMedia();
        } else {
          alert("❌ Yangilashda xatolik!");
        }
      }
    }
  } catch (error) {
    console.error('Media tahrirlashda xatolik:', error);
    alert("❌ Server bilan bog'lanishda xatolik!");
  }
}

// Textarea avtomatik o'lcham o'zgartirish
const textarea = document.getElementById('mediaText');
if (textarea) {
  textarea.addEventListener('input', function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 300) + "px";
  });
}