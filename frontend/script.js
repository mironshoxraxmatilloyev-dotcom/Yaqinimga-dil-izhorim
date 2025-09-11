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
const correctLogin = "dildora.naimova_admin";
const correctPassword = "Dildora@2025";

function checkLogin() {
  const login = document.getElementById("login")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const error = document.getElementById("error");

  console.log('🔑 Login urinishi:', { login: login || 'bo\'sh', password: password ? '***' : 'bo\'sh' });

  if (!login || !password) {
    if (error) error.innerText = "❌ Login va parolni kiriting!";
    return;
  }

  if (login === correctLogin && password === correctPassword) {
    console.log('✅ Login muvaffaqiyatli:', login);
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("adminContent").style.display = "block";

    console.log('🔄 Admin panel yuklanmoqda...');
    loadOrders();
    loadMedia();
    loadTabriklar(); // ✅ So'nggi tabriklarni yuklash
  } else {
    console.log('❌ Login xato:', { expected: correctLogin, got: login });
    if (error) error.innerText = "❌ Login yoki parol noto'g'ri!";
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
        loadOrders();
      } else {
        alert("❌ O'chirishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error('O\'chirishda xatolik:', error);
      alert("❌ Server bilan bog'lanishda xatolik!");
    }
  }
}


// ==== MEDIA (LocalStorage) ====
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


// ==== MEDIA KO‘RSATISH (LocalStorage) ====
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
         <p class="card-text">${m.matn && m.matn.trim() !== "" ? m.matn : "❗ Matn kiritilmagan"}</p>
${m.audio ? 
   `<audio controls class="w-100 mt-2"><source src="${m.audio}" type="audio/mpeg"></audio>` : 
   "<p class='text-muted fst-italic'>🎵 Audio yuklanmagan</p>" }

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


// ==== TEXTAREA Auto-Height ====
const textarea = document.getElementById('mediaText');
if (textarea) {
  textarea.addEventListener('input', function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 300) + "px";
  });
}


// ==== ✅ SO‘NGGI TABRIKLAR (BACKENDDAN) ====
async function loadTabriklar() {
  let mediaContent = document.getElementById("mediaContent");
  if (!mediaContent) return;

  mediaContent.innerHTML = "<p class='text-muted'>Yuklanmoqda...</p>";

  try {
    const res = await fetch("/api/tabriklar"); // ✅ Backend API
    const tabriklar = res.data;

    mediaContent.innerHTML = "";

    if (tabriklar.length === 0) {
      mediaContent.innerHTML = "<p class='text-muted'>Hali tabriklar yo‘q.</p>";
    } else {
      tabriklar.forEach((t) => {
        let card = document.createElement("div");
        card.className = "card mb-3 shadow";
        card.innerHTML = `
          <div class="card-body">
            <h6 class="text-muted">${new Date(t.createdAt).toLocaleString('uz-UZ')}</h6>
            <p class="card-text">${t.matn || ""}</p>
            ${t.audio ? `<audio controls class="w-100 mt-2"><source src="${t.audio}" type="audio/mpeg"></audio>` : ""}
          </div>
        `;
        mediaContent.appendChild(card);
      });
    }
  } catch (err) {
    console.error("Tabriklarni yuklashda xato:", err);
    mediaContent.innerHTML = "<p class='text-danger'>❌ Server bilan bog'lanishda xatolik!</p>";
  }
}

// ==== BOSH SAHIFADA BUYURTMALAR KO'RSATISH ====
async function loadMainPageOrders() {
  let ordersContainer = document.getElementById("ordersContainer");
  if (!ordersContainer) return;

  try {
    const response = await fetch("/api/orders");
    const orders = await response.json();

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {
      ordersContainer.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info text-center">
            <h5>📭 Hali buyurtmalar yo'q</h5>
          </div>
        </div>
      `;
    } else {
      orders.forEach((o, i) => {
        const sana = o.tugilgan_sana
          ? new Date(o.tugilgan_sana).toLocaleDateString("uz-UZ")
          : "Noma'lum";
        const yaratilgan = o.createdAt
          ? new Date(o.createdAt).toLocaleString("uz-UZ")
          : "Yaratilgan sana yo‘q";

        let card = document.createElement("div");
        card.className = "col-md-6 col-lg-4 mb-4";
        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5>${i + 1}) ${o.ism} (${o.yosh} yosh)</h5>
              <p><b>Tug'ilgan sana:</b> ${sana}</p>
              <p><b>Telefon:</b> ${o.telefon}</p>
              <p><b>Tabriklovchilar:</b> ${o.tabriklovchilar}</p>
              <p><b>Asosiy tabriklovchi:</b> ${o.asosiy}</p>
              <p><b>Murojaat turi:</b> ${o.murojaat}</p>
              <p><b>Qo'shiq:</b> ${o.qoshiq}</p>
              <p><b>Buyurtmachi telefoni:</b> ${o.buyurtmachi_telefon}</p>
              <p><small class="text-muted">Yaratilgan: ${yaratilgan}</small></p>
            </div>
          </div>
        `;
        ordersContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Bosh sahifada buyurtmalarni yuklashda xatolik:", error);
    ordersContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          ❌ Buyurtmalarni yuklashda xatolik!
        </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadMainPageOrders();  // ✅ containerga malumotlarni chiqaradi
});
    // Demo login function
    function checkLogin() {
      const login = document.getElementById('login')?.value;
      const password = document.getElementById('password')?.value;
      const error = document.getElementById('error');
      
      if (!login || !password) {
        if (error) error.textContent = '❌ Login va parolni kiriting!';
        return;
      }
      
      if (login === 'dildora.naimova_admin' && password === 'Dildora@2025') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        const headerElement = document.querySelector('.login h5');
        if (headerElement) headerElement.style.display = 'none';
        if (error) error.textContent = '';
        
        // Admin panelda ma'lumotlarni yuklash
        console.log('🔑 Admin muvaffaqiyatli login qildi');
        loadOrders();
        loadTabriklar();
        loadOrdersManual();
      } else {
        if (error) {
          error.textContent = '❌ Noto\'g\'ri login yoki parol!';
          error.style.animation = 'shake 0.5s ease-in-out';
          setTimeout(() => {
            error.style.animation = '';
          }, 500);
        }
      }
    }

    // Buyurtmalarni yuklash funksiyasi (admin sahifasi uchun)
    async function loadOrdersManual() {
      const ordersList = document.getElementById("ordersList");
      if (!ordersList) {
        console.warn('❌ ordersList elementi topilmadi');
        return;
      }

      console.log('🔄 Buyurtmalarni yuklamoqda...');
      
      try {
        const res = await fetch("/api/orders");
        console.log('🎯 Orders API status:', res.status);
        
        const orders = await res.json();
        console.log('📊 Olingan buyurtmalar:', orders);
        console.log('📊 Buyurtmalar soni:', orders.length);

        ordersList.innerHTML = "";

        if (!orders.length) {
          ordersList.innerHTML = `
            <div class="list-group-item">
              <strong>📋 Hozircha buyurtmalar yo'q</strong>
              <p class="mb-0 text-muted">Yangi buyurtmalar kelganida bu yerda ko'rsatiladi</p>
            </div>
          `;
          return;
        }

        orders.forEach(order => {
          console.log('📝 Buyurtma qo\'shilmoqda:', order.ism);
          ordersList.innerHTML += `
            <div class="list-group-item">
              <p><b>🎉 ${order.ism}</b>, ${order.yosh} yosh</p>
              <p>📅 ${order.tugilgan_sana}</p>
              <p>📞 ${order.telefon}</p>
              <p>👥 ${order.tabriklovchilar} | ⭐ ${order.asosiy}</p>
              <p>🎤 Qo'shiq: ${order.qoshiq}</p>
              <p>📝 Murojaat: ${order.murojaat}</p>
              <p>📱 Buyurtmachi: ${order.buyurtmachi_telefon}</p>
              <button onclick="deleteOrder('${order._id}')" class="btn btn-sm btn-danger">🗑️ O'chirish</button>
            </div>
          `;
        });
        
        console.log('✅ Buyurtmalar DOM ga qo\'shildi');
      } catch (err) {
        console.error("❌ Buyurtmalarni yuklashda xato:", err);
        ordersList.innerHTML = `
          <div class="list-group-item text-danger">
            <strong>❌ Xato yuz berdi</strong>
            <p class="mb-0">Buyurtmalarni yuklashda muammo: ${err.message}</p>
          </div>
        `;
      }
    }

    // Buyurtmani o'chirish funksiyasi (admin sahifasi uchun)
    async function deleteOrder(id) {
      if (!confirm("Buyurtmani o'chirishni istaysizmi?")) return;

      try {
        console.log('🗑️ Buyurtma o\'chirilmoqda:', id);
        const res = await fetch("/api/orders/" + id, { method: "DELETE" });
        
        if (res.ok) {
          console.log('✅ Buyurtma o\'chirildi');
          loadOrdersManual(); // Ro'yxatni yangilash
          alert("✅ Buyurtma o'chirildi!");
        } else {
          alert("❌ O'chirishda xato!");
        }
      } catch (err) {
        alert("❌ O'chirishda xato!");
        console.error(err);
      }
    }

    // Tabriklarni yuklash funksiyasi
    async function loadTabriklar() {
      const tabriksList = document.getElementById("tabriksList");
      if (!tabriksList) {
        console.warn('❌ tabriksList elementi topilmadi');
        return;
      }

      console.log('🔄 Tabriklarni yuklamoqda...');
      
      try {
        console.log('📡 Tabriklar API ga so\'rov yuborilmoqda: /api/tabriklar');
        const res = await fetch("/api/tabriklar");
        console.log('🎯 Tabriklar API status:', res.status);
        
        const tabriklar = await res.json();
        console.log('📊 Olingan tabriklar:', tabriklar);
        console.log('📊 Tabriklar soni:', tabriklar.length);

        tabriksList.innerHTML = "";

        if (!tabriklar.length) {
          console.log('⚠️ Tabriklar mavjud emas');
          tabriksList.innerHTML = `
            <div class="list-group-item">
              <strong>🎵 Hozircha tabriklar yo'q</strong>
              <p class="mb-0 text-muted">Yuborilgan tabriklar bu yerda ko'rsatiladi</p>
            </div>
          `;
          return;
        }

        console.log('✅ Tabriklarni DOM ga qo\'shish boshlandi');
        tabriklar.forEach((t, index) => {
          console.log(`📝 Tabrik ${index + 1}:`, {
            id: t._id,
            text: t.text ? 'Mavjud' : 'Yo\'q',
            matn: t.matn ? 'Mavjud' : 'Yo\'q',
            audioUrl: t.audioUrl ? 'Mavjud' : 'Yo\'q',
            audio: t.audio ? 'Mavjud' : 'Yo\'q',
            createdAt: t.createdAt
          });
          
          const matnContent = t.matn || t.text || 'Matn mavjud emas';
          const audioContent = t.audio || t.audioUrl;
          
          tabriksList.innerHTML += `
            <div class="list-group-item">
              <p>📝 <strong>Matn:</strong> ${matnContent}</p>
              ${audioContent ? `<p>🎵 <strong>Audio:</strong> <audio controls src="${audioContent}" class="w-100 mt-2"></audio></p>` : "<p class='text-muted'>🎵 Audio mavjud emas</p>"}
              <div class="mt-3 d-flex gap-2">
                <button onclick="editTabrik('${t._id}', '${matnContent.replace(/'/g, '\\"')}')" class="btn btn-sm btn-warning">✏️ Tahrirlash</button>
                <button onclick="deleteTabrik('${t._id}')" class="btn btn-sm btn-danger">🗑️ O'chirish</button>
              </div>
            </div>
          `;
        });
        
        console.log('✅ Barcha tabriklar DOM ga qo\'shildi');
      } catch (err) {
        console.error("❌ Tabriklarni yuklashda xato:", err);
        tabriksList.innerHTML = `
          <div class="list-group-item text-danger">
            <strong>❌ Xato yuz berdi</strong>
            <p class="mb-0">Tabriklarni yuklashda muammo: ${err.message}</p>
          </div>
        `;
      }
    }

    // Buyurtmalarni yuklash funksiyasi
    async function loadOrders() {
      const ordersList = document.getElementById("ordersList");
      if (!ordersList) return;

      try {
        const res = await fetch("/api/orders");
        const orders = await res.json();

        ordersList.innerHTML = "";

        if (!orders.length) {
          ordersList.innerHTML = `
            <div class="list-group-item">
              <strong>📋 Hozircha buyurtmalar yo'q</strong>
              <p class="mb-0 text-muted">Yangi buyurtmalar kelganida bu yerda ko'rsatiladi</p>
            </div>
          `;
          return;
        }

        orders.forEach(order => {
          ordersList.innerHTML += `
            <div class="list-group-item">
              <p><b>🎉 ${order.ism}</b>, ${order.yosh} yosh</p>
              <p>📅 ${order.tugilgan_sana}</p>
              <p>📞 ${order.telefon}</p>
              <p>👥 ${order.tabriklovchilar} | ⭐ ${order.asosiy}</p>
              <p>🎤 Qo'shiq: ${order.qoshiq}</p>
              <p>📝 Murojaat: ${order.murojaat}</p>
              <p>📱 Buyurtmachi: ${order.buyurtmachi_telefon}</p>
              <button onclick="deleteOrder('${order._id}')" class="btn btn-sm btn-danger">🗑️ O'chirish</button>
            </div>
          `;
        });
      } catch (err) {
        console.error("❌ Buyurtmalarni yuklashda xato:", err);
      }
    }


    async function deleteTabrik(id) {
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

    // Tabrikni tahrirlash (admin login kerak emas chunki allaqachon admin sahifasida)
    async function editTabrik(id, currentMatn) {
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

    // Buyurtmani o'chirish
    async function deleteOrder(id) {
      if (!confirm("Buyurtmani o'chirishni istaysizmi?")) return;

      try {
        await fetch("/api/orders/" + id, { method: "DELETE" });
        loadOrders(); // Ro'yxatni yangilash
        alert("✅ Buyurtma o'chirildi!");
      } catch (err) {
        alert("❌ O'chirishda xato!");
        console.error(err);
      }
    }

    // Media formni serverga yuborish
    const mediaForm = document.getElementById("mediaForm");
    if (mediaForm) {
      mediaForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const text = document.getElementById("mediaText").value.trim();
        const audioFile = document.getElementById("mediaAudio").files[0];

        if (!text && !audioFile) {
          alert("❌ Kamida matn yoki audio kiritilishi kerak!");
          return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Yuborilmoqda...';
        submitBtn.disabled = true;

        try {
          let audioData = null;
          
          if (audioFile) {
            const reader = new FileReader();
            audioData = await new Promise((resolve) => {
              reader.onload = function(event) {
                resolve(event.target.result);
              };
              reader.readAsDataURL(audioFile);
            });
          }

          const data = {
            matn: text,
            audio: audioData
          };

          const res = await fetch("/api/tabriklar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });

          const result = await res.json();

          if (res.ok) {
            alert("✅ Tabrik muvaffaqiyatli yuborildi!");
            this.reset();
            loadTabriklar(); // Tabriklar ro'yxatini yangilash
          } else {
            alert("❌ Xato: " + (result.error || "Tabrik yuborilmadi"));
          }
        } catch (err) {
          alert("❌ Serverga ulanishda xato!");
          console.error(err);
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    }

    // Shake animation for error
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
    
    // Debugging qo'shimchalari
    console.log('📝 Admin sahifasi yuklandi');
    
    // Admin login qilgandan so'ng buyurtmalarni debug qilish
    window.debugLoadOrders = async function() {
      console.log('🔍 Buyurtmalarni manual yuklash...');
      try {
        const response = await fetch('/api/orders');
        console.log('🎯 API javob status:', response.status);
        const orders = await response.json();
        console.log('📊 Olingan buyurtmalar:', orders);
        console.log('📊 Buyurtmalar soni:', orders.length);
        
        // Buyurtmalarni manual ravishda DOM ga qo'yish
        const ordersList = document.getElementById('ordersList');
        if (ordersList && orders.length > 0) {
          ordersList.innerHTML = '';
          orders.forEach(order => {
            ordersList.innerHTML += `
              <div class="list-group-item">
                <p><b>🎉 ${order.ism}</b>, ${order.yosh} yosh</p>
                <p>📅 ${order.tugilgan_sana}</p>
                <p>📞 ${order.telefon}</p>
                <p>👥 ${order.tabriklovchilar} | ⭐ ${order.asosiy}</p>
                <p>🎤 Qo'shiq: ${order.qoshiq}</p>
                <p>📝 Murojaat: ${order.murojaat}</p>
                <p>📱 Buyurtmachi: ${order.buyurtmachi_telefon}</p>
                <button onclick="deleteOrder('${order._id}')" class="btn btn-sm btn-danger">🗑️ O'chirish</button>
              </div>
            `;
          });
          console.log('✅ Buyurtmalar DOM ga qo\'shildi');
        }
        
        return orders;
      } catch (err) {
        console.error('❌ Debug buyurtma yuklash xatosi:', err);
      }
    };
    
    // Network test
    fetch('/api/test')
      .then(r => r.json())
      .then(data => console.log('🌐 Server test:', data))
      .catch(err => console.error('❌ Server test xatosi:', err));
    
    // Quick test buyurtma yaratish
    window.createTestOrder = async function() {
      const testOrder = {
        ism: 'Test User',
        yosh: '25',
        tugilgan_sana: '2024-01-01',
        telefon: '+998901234567',
        tabriklovchilar: 'Test tabriklovchilar',
        asosiy: 'Test asosiy',
        qoshiq: 'Test qo\'shiq',
        murojaat: 'siz',
        buyurtmachi_telefon: '+998901234567'
      };
      
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(testOrder)
        });
        const result = await response.json();
        console.log('✅ Test buyurtma yaratildi:', result);
        
        // Buyurtmalarni qayta yuklash
        await debugLoadOrders();
        
        return result;
      } catch (err) {
        console.error('❌ Test buyurtma yaratishda xato:', err);
      }
    };


    
