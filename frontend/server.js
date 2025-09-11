// ==== NAVIGATSIYA TUGMALARI ====
const navButtons = {
  homeBtn: "index.html",
  orderBtn: "buyurtma.html",
  adminBtn: "admin.html",
  aboutBtn: "bizhaqimizda.html",
  haveBtn: "bizdamavjudxizmatlar.html"
};

Object.entries(navButtons).forEach(([id, url]) => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", () => (window.location.href = url));
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

// ==== ADMIN PAROL (tahrirlash/o‘chirish) ====
const correctPasswordForActions = "12345678";

function askPassword(action, mediaId) {
  let modal = new bootstrap.Modal(document.getElementById("adminModal"));
  modal.show();

  document.getElementById("checkPasswordBtn").onclick = () => {
    const pass = document.getElementById("adminPassword").value;
    if (pass === correctPasswordForActions) {
      modal.hide();
      document.getElementById("adminPassword").value = "";
      if (action === "delete") deleteMediaById(mediaId);
      if (action === "edit") editMediaById(mediaId);
    } else {
      alert("❌ Parol noto'g'ri!");
    }
  };
}

// ==== BUYURTMA SAHIFASI ====
const anketaForm = document.getElementById("anketaForm");
if (anketaForm) {
  anketaForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    let data = {};
    formData.forEach((v, k) => (data[k] = v));

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Buyurtma muvaffaqiyatli yuborildi!");
        this.reset();
      } else {
        alert("❌ Xatolik: " + (result.error || "Noma'lum xatolik"));
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("❌ Server bilan bog'lanishda xatolik!");
    }
  });
}

// ==== ADMIN BUYURTMALAR ====
async function loadOrders() {
  let orderList = document.getElementById("ordersList");
  if (!orderList) return;
  orderList.innerHTML = "<p class='text-muted'>Yuklanmoqda...</p>";

  try {
    const response = await fetch("/api/orders");
    const orders = await response.json();
    orderList.innerHTML = "";

    if (!orders.length) {
      orderList.innerHTML = "<p class='text-muted'>Hali buyurtmalar yo'q.</p>";
      return;
    }

    orders.forEach((o, i) => {
      const sana = new Date(o.tugilgan_sana).toLocaleDateString("uz-UZ");
      const yaratilgan = new Date(o.createdAt).toLocaleString("uz-UZ");

      orderList.innerHTML += `
        <div class="list-group-item mb-2">
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
        </div>`;
    });
  } catch (error) {
    console.error("Buyurtmalarni yuklashda xatolik:", error);
    orderList.innerHTML =
      "<p class='text-danger'>❌ Buyurtmalarni yuklashda xatolik!</p>";
  }
}

async function deleteOrder(id) {
  if (!confirm("Bu buyurtmani o'chirishni xohlaysizmi?")) return;
  try {
    const response = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("✅ Buyurtma o'chirildi!");
      loadOrders();
    } else {
      alert("❌ O'chirishda xatolik!");
    }
  } catch (error) {
    console.error("O'chirishda xatolik:", error);
    alert("❌ Server bilan bog'lanishda xatolik!");
  }
}

// ==== MEDIA (Yuklash va ko‘rsatish) ====
document.addEventListener("DOMContentLoaded", function () {
  const mediaForm = document.getElementById("mediaForm");
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
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(audioFile);
          });
        }

        const response = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, audioUrl: audioData })
        });

        const result = await response.json();
        if (response.ok) {
          alert("✅ Tabrik muvaffaqiyatli qo'shildi!");
          mediaForm.reset();
          loadMedia();
          loadMainPageMedia();
        } else {
          alert("❌ Xatolik: " + (result.error || "Noma'lum xatolik"));
        }
      } catch (error) {
        console.error("Media qo'shishda xatolik:", error);
        alert("❌ Server bilan bog'lanishda xatolik!");
      }
    });
  }

  loadMainPageMedia();
});

// ==== MEDIA ADMINDA ====
async function loadMedia() {
  const mediaContent = document.getElementById("tabriksList");
  if (!mediaContent) return;
  mediaContent.innerHTML = "<p class='text-muted'>Yuklanmoqda...</p>";

  try {
    const response = await fetch("/api/media");
    const medias = await response.json();
    mediaContent.innerHTML = "";

    if (!medias.length) {
      mediaContent.innerHTML = "<p class='text-muted'>Hali tabriklar yo'q.</p>";
      return;
    }

    medias.forEach((m) => {
      const sana = new Date(m.createdAt).toLocaleString("uz-UZ");
      mediaContent.innerHTML += `
        <div class="card mb-3 shadow">
          <div class="card-body">
            <h6 class="text-muted">${sana}</h6>
            <p class="card-text">${m.text || ""}</p>
            ${
              m.audioUrl
                ? `<audio controls class="w-100 mt-2"><source src="${m.audioUrl}" type="audio/mpeg"></audio>`
                : ""
            }
            <div class="mt-3">
              <button class="btn btn-sm btn-warning me-2" onclick="askPassword('edit', '${m._id}')">✏️ Tahrirlash</button>
              <button class="btn btn-sm btn-danger" onclick="askPassword('delete', '${m._id}')">🗑️ O'chirish</button>
            </div>
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Media yuklashda xatolik:", error);
    mediaContent.innerHTML =
      "<p class='text-danger'>❌ Media yuklashda xatolik!</p>";
  }
}

// ==== MEDIA BOSH SAHIFADA ====
async function loadMainPageMedia() {
  const greetingsContainer = document.getElementById("greetingsContainer");
  if (!greetingsContainer) return;

  try {
    const response = await fetch("/api/media");
    const medias = await response.json();
    greetingsContainer.innerHTML = "";

    if (!medias.length) {
      greetingsContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info text-center">
            <h5>🎉 Hali tabriklar yo'q</h5>
            <p>Birinchi tabrikni qo'shish uchun admin sahifasiga o'ting.</p>
          </div>
        </div>`;
      return;
    }

    medias.forEach((m) => {
      const sana = new Date(m.createdAt).toLocaleString("uz-UZ");
      greetingsContainer.innerHTML += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="fas fa-calendar"></i> ${sana}
              </h6>
              ${m.text ? `<p class="card-text">${m.text}</p>` : ""}
              ${
                m.audioUrl
                  ? `<div class="mt-3"><audio controls class="w-100"><source src="${m.audioUrl}" type="audio/mpeg"></audio></div>`
                  : ""
              }
            </div>
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Bosh sahifada media yuklashda xatolik:", error);
    greetingsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          <h5>❌ Xatolik</h5>
          <p>Tabriklarni yuklashda muammo yuz berdi.</p>
        </div>
      </div>`;
  }
}

// ==== MEDIA CRUD ====
async function deleteMediaById(id) {
  try {
    const response = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("✅ Tabrik o'chirildi!");
      loadMedia();
      loadMainPageMedia();
    } else {
      alert("❌ O'chirishda xatolik!");
    }
  } catch (error) {
    console.error("Media o'chirishda xatolik:", error);
    alert("❌ Server bilan bog'lanishda xatolik!");
  }
}

async function editMediaById(id) {
  try {
    const response = await fetch("/api/media");
    const medias = await response.json();
    const media = medias.find((m) => m._id === id);

    if (!media) return;

    let newText = prompt("✏️ Yangi matnni kiriting:", media.text);
    if (newText === null) return;

    const updateResponse = await fetch(`/api/media/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText })
    });

    if (updateResponse.ok) {
      alert("✅ Tabrik yangilandi!");
      loadMedia();
      loadMainPageMedia();
    } else {
      alert("❌ Yangilashda xatolik!");
    }
  } catch (error) {
    console.error("Media tahrirlashda xatolik:", error);
    alert("❌ Server bilan bog'lanishda xatolik!");
  }
}

// ==== TEXTAREA AUTOSIZE ====
const textarea = document.getElementById("mediaText");
if (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 300) + "px";
  });
}

