// ======================= ADMIN AUTENTIFIKATSIYA =======================

// Admin ma'lumotlari (real loyihada buni serverda saqlash kerak)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Admin login tekshirish
function checkAdminLogin() {
  const username = prompt('🔑 Admin login kiriting:');
  if (username === null) return false; // Bekor qilindi
  
  const password = prompt('🔒 Parol kiriting:');
  if (password === null) return false; // Bekor qilindi
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return true;
  } else {
    alert('❌ Noto\'g\'ri login yoki parol!');
    return false;
  }
}

// Tabrikni o'chirish (admin login kerak)
async function deleteTabrik(id) {
  if (!checkAdminLogin()) return;
  
  if (!confirm("Tabrikni o'chirishni istaysizmi?")) return;

  try {
    const res = await fetch("/api/tabriklar/" + id, { method: "DELETE" });
    
    if (res.ok) {
      alert('✅ Tabrik muvaffaqiyatli o\'chirildi!');
      loadTabriklar(); // ro'yxatni yangilash
    } else {
      alert('❌ Tabrikni o\'chirishda xato yuz berdi!');
    }
  } catch (err) {
    console.error('❌ Tabrikni o\'chirishda xato:', err);
    alert('❌ Serverga ulanishda xato!');
  }
}

// Tabrikni tahrirlash (admin login kerak)
async function editTabrik(id, currentMatn) {
  if (!checkAdminLogin()) return;
  
  // Eski matnni ko'rsatib yangi matn so'rash
  const newMatn = prompt('📝 Yangi matn kiriting:', currentMatn);
  
  if (newMatn === null) return; // Bekor qilindi
  if (newMatn.trim() === '') {
    alert('❌ Matn bo\'sh bo\'lishi mumkin emas!');
    return;
  }
  
  try {
    const res = await fetch("/api/tabriklar/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matn: newMatn.trim() })
    });
    
    if (res.ok) {
      alert('✅ Tabrik muvaffaqiyatli tahrirlandi!');
      loadTabriklar(); // ro'yxatni yangilash
    } else {
      alert('❌ Tabrikni tahrirlaashda xato yuz berdi!');
    }
  } catch (err) {
    console.error('❌ Tabrikni tahrirlaashda xato:', err);
    alert('❌ Serverga ulanishda xato!');
  }
}

// ======================= BUYURTMA SAHIFASI =======================
const anketaForm = document.getElementById('anketaForm');
if (anketaForm) {
<<<<<<< HEAD
  anketaForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
=======
  console.log('✅ anketaForm topildi va listener qo\'shilmoqda');
  
  anketaForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('🚀 Form submit boshlandi');

>>>>>>> 56b886a2d0df9e7fe45da4fa0b5066d3b316c1e1
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    console.log('📊 Form data:', data);

<<<<<<< HEAD
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
=======
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Yuborilmoqda...';
    submitBtn.disabled = true;

    try {
      console.log('🌐 API ga so\'rov yuborilmoqda: /api/orders');
      
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      console.log('📤 Server javob status:', res.status);
      const result = await res.json();
      console.log('📤 Server javob:', result);

      if (res.ok) {
        alert("✅ Buyurtmangiz muvaffaqiyatli yuborildi!");
        this.reset();
        loadOrders(); // yangi buyurtmalarni yangilash
      } else {
        alert("❌ Xato: " + (result.error || "Buyurtma yuborilmadi"));
      }
    } catch (err) {
      console.error('❌ Network xatosi:', err);
      alert("❌ Serverga ulanishda xato!");
      console.error(err);
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
} else {
  console.warn('❌ anketaForm elementi topilmadi');
}

// ======================= ADMIN SAHIFASI =======================

// --- Buyurtmalarni yuklash ---
async function loadOrders() {
  const ordersList = document.getElementById("ordersList");
  if (!ordersList) return;

  try {
    const res = await fetch("/api/orders");
    const orders = await res.json();

    ordersList.innerHTML = "";

    if (!orders.length) {
      ordersList.innerHTML = "<p>📭 Hozircha buyurtmalar yo‘q</p>";
      return;
    }

    orders.forEach(order => {
      ordersList.innerHTML += `
        <div class="border p-3 mb-2 rounded">
          <p><b>🎉 ${order.ism}</b>, ${order.yosh} yosh</p>
          <p>📅 ${order.tugilgan_sana}</p>
          <p>📞 ${order.telefon}</p>
          <p>👥 ${order.tabriklovchilar} | ⭐ ${order.asosiy}</p>
          <p>🎤 Qo‘shiq: ${order.qoshiq}</p>
          <p>📝 Murojaat: ${order.murojaat}</p>
          <p>📱 Buyurtmachi: ${order.buyurtmachi_telefon}</p>
          <button onclick="deleteOrder('${order._id}')" class="btn btn-sm btn-danger">🗑 O‘chirish</button>
        </div>
      `;
    });
  } catch (err) {
    console.error("❌ Buyurtmalarni yuklashda xato:", err);
  }
}

// --- Buyurtmani o‘chirish ---
async function deleteOrder(id) {
  if (!confirm("Buyurtmani o‘chirishni istaysizmi?")) return;

  await fetch("/api/orders/" + id, { method: "DELETE" });
  loadOrders();
}

// --- Tabrik qo‘shish ---
const tabrikForm = document.getElementById("tabrikForm");
if (tabrikForm) {
  tabrikForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/tabriklar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Yangi tabrik qo‘shildi!");
        this.reset();
        loadTabriklar(); // ✅ yangi tabrikni ko‘rsatish
      } else {
        alert("❌ Xato: " + (result.error || "Tabrik qo‘shilmadi"));
      }
    } catch (err) {
      console.error("❌ Tabrik yuborishda xato:", err);
>>>>>>> 56b886a2d0df9e7fe45da4fa0b5066d3b316c1e1
    }
  });
}

// ======================= BOSH SAHIFA =======================
async function loadTabriklar() {
  const tabrikList = document.getElementById("tabrikList");
  if (!tabrikList) return;

<<<<<<< HEAD
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
=======
  try {
    const res = await fetch("/api/tabriklar");
    const tabriklar = await res.json();

    tabrikList.innerHTML = "";

    if (!tabriklar.length) {
      tabrikList.innerHTML = `
        <p class="text-center text-muted">
          Hozircha tabriklar mavjud emas<br>
          <small>Admin tomonidan yuborilgan tabriklar bu yerda ko‘rsatiladi</small>
        </p>
      `;
      return;
    }

    tabriklar.forEach(t => {
      tabrikList.innerHTML += `
        <div class="border p-2 mb-2 rounded">
          <p>${t.matn}</p>
          ${t.audio ? `<audio controls src="${t.audio}"></audio>` : ""}
        </div>
      `;
    });
  } catch (err) {
    console.error("❌ Tabriklarni yuklashda xato:", err);
  }
}

// ======================= SAHIFA YUKLANGANDA =======================
document.addEventListener("DOMContentLoaded", () => {
  loadOrders();
  loadTabriklar();
>>>>>>> 56b886a2d0df9e7fe45da4fa0b5066d3b316c1e1
});


