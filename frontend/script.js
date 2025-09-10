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
    // ✅ To‘g‘ri bo‘lsa
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminContent").style.display = "block";

    // Buyurtmalar va media yuklash
    loadOrders();
    loadMedia();
  } else {
    error.innerText = "❌ Login yoki parol noto‘g‘ri!";
  }
}


// ==== ADMIN LOGIN (o‘chirish/tahrirlash uchun parol) ====
const correctPasswordForActions = "12345678"; 

function askPassword(action, index) {
  let modal = new bootstrap.Modal(document.getElementById("adminModal"));
  modal.show();

  document.getElementById("checkPasswordBtn").onclick = () => {
    const pass = document.getElementById("adminPassword").value;
    if (pass === correctPasswordForActions) {
      modal.hide();
      document.getElementById("adminPassword").value = "";
      if (action === "delete") {
        deleteMedia(index);
      } else if (action === "edit") {
        editMedia(index);
      }
    } else {
      alert("❌ Parol noto‘g‘ri!");
    }
  };
}


// ==== BUYURTMA SAHIFASI (buyurtma.html) ====
let anketaForm = document.getElementById("anketaForm");
if (anketaForm) {
  anketaForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    let data = {};
    formData.forEach((v, k) => data[k] = v);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert("✅ Anketa muvaffaqiyatli yuborildi!");
        this.reset();
      } else {
        alert("❌ Xatolik yuz berdi: " + (result.error || 'Noma\'lum xatolik'));
      }
    } catch (error) {
      console.error('Xatolik:', error);
      alert("❌ Server bilan bog'lanishda xatolik yuz berdi!");
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
    orderList.innerHTML = "<p class='text-danger'>Buyurtmalarni yuklashda xatolik yuz berdi!</p>";
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
        loadOrders(); // Ro'yxatni yangilash
      } else {
        alert("❌ O'chirishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error('O\'chirishda xatolik:', error);
      alert("❌ Server bilan bog'lanishda xatolik!");
    }
  }
}


// ==== MEDIA (Audio + Matn qo‘shish) ====
document.addEventListener("DOMContentLoaded", function () {
  let mediaForm = document.getElementById("mediaForm");
  if (mediaForm) {
    mediaForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let text = document.getElementById("mediaText").value;
      let audioFile = document.getElementById("mediaAudio").files[0];

      if (!text && !audioFile) {
        alert("❗ Matn yoki audio kiritishingiz kerak!");
        return;
      }

      let reader = new FileReader();
      reader.onload = function (event) {
        let audioData = audioFile ? event.target.result : null;

        let newMedia = {
          sana: new Date().toLocaleString(),
          matn: text,
          audio: audioData
        };

        let medias = JSON.parse(localStorage.getItem("medias")) || [];
        medias.push(newMedia);
        localStorage.setItem("medias", JSON.stringify(medias));

        alert("✅ Tabrik bosh sahifaga qo‘shildi!");
        mediaForm.reset();
        loadMedia();
      };

      if (audioFile) {
        reader.readAsDataURL(audioFile);
      } else {
        reader.onload();
      }
    });
  }
});


// ==== MEDIA KO‘RSATISH ====
function loadMedia() {
  let mediaContent = document.getElementById("mediaContent");
  if (!mediaContent) return;

  mediaContent.innerHTML = "";
  let medias = JSON.parse(localStorage.getItem("medias")) || [];

  if (medias.length === 0) {
    mediaContent.innerHTML = "<p class='text-muted'>Hali tabriklar yo‘q.</p>";
  } else {
    medias.forEach((m, i) => {
      let card = document.createElement("div");
      card.className = "card mb-3 shadow";
      card.innerHTML = `
        <div class="card-body">
          <h6 class="text-muted">${m.sana}</h6>
          <p class="card-text">${m.matn || ""}</p>
          ${m.audio ? `<audio controls class="w-100 mt-2"><source src="${m.audio}" type="audio/mpeg"></audio>` : ""}
          <div class="mt-3">
            <button class="btn btn-sm btn-warning me-2" onclick="askPassword('edit', ${i})">✏️ Tahrirlash</button>
            <button class="btn btn-sm btn-danger" onclick="askPassword('delete', ${i})">🗑️ O‘chirish</button>
          </div>
        </div>
      `;
      mediaContent.appendChild(card);
    });
  }
}


// ==== MEDIA O‘CHIRISH ====
function deleteMedia(index) {
  let medias = JSON.parse(localStorage.getItem("medias")) || [];
  medias.splice(index, 1);
  localStorage.setItem("medias", JSON.stringify(medias));
  loadMedia();
}

// ==== MEDIA TAHRIRLASH ====
function editMedia(index) {
  let medias = JSON.parse(localStorage.getItem("medias")) || [];
  let m = medias[index];

  let newText = prompt("✏️ Yangi matnni kiriting:", m.matn);
  if (newText !== null) {
    medias[index].matn = newText;
    localStorage.setItem("medias", JSON.stringify(medias));
    loadMedia();
  }
}

const textarea = document.getElementById('mediaText');

    textarea.addEventListener('input', function () {
      this.style.height = "auto"; // reset
      this.style.height = Math.min(this.scrollHeight, 300) + "px"; // 300px gacha cho‘ziladi
    });









