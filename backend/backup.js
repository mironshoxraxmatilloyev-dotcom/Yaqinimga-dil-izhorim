const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Backup katalogi yaratish
const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Backup yaratish funksiyasi
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `tabrikDB_backup_${timestamp}`);
  
  const command = `mongodump --db tabrikDB --out "${backupPath}"`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Backup xatosi:', error);
      return;
    }
    console.log('✅ Backup yaratildi:', backupPath);
  });
}

// Ma'lumotlarni tiklash funksiyasi
function restoreBackup(backupPath) {
  const command = `mongorestore --db tabrikDB --drop "${backupPath}/tabrikDB"`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Restore xatosi:', error);
      return;
    }
    console.log('✅ Ma\'lumotlar tiklandi');
  });
}

// Avtomatik backup (har kuni)
setInterval(createBackup, 24 * 60 * 60 * 1000); // 24 soat

// Export qilish
module.exports = { createBackup, restoreBackup };

// Agar to'g'ridan-to'g'ri ishga tushirilsa
if (require.main === module) {
  console.log('📦 Backup yaratilmoqda...');
  createBackup();
}