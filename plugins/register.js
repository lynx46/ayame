const { createHash } = require('crypto')
let handler = async function (m, { text, usedPrefix }) {
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Anda sudah terdaftar\n\nMau daftar ulang? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  let name = conn.getName(m.sender)
  let age = Math.floor(Math.random() * 41)
  age = parseInt(age)
  if (age > 40) throw 'Maaf umur Anda terlalu tua'
  if (age < 17) throw 'Maaf Anda belum bisa mendaftar'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let caption = `
┏ ┅ ━━━━━━━━━━━━━━━━━━━━━ ┅ ━
┇       *「 INFORMATION 」*
┣ ┅ ━━━━━━━━━━━━━━━━━━━━━ ┅ ━
┃
┃ *Nama:* ${name}
┃ *Umur:* ${age} tahun
┃ *Registered:* ${rtotalreg}
┃ *Gift:* Rp10000 and 5000 Coins
┃ *Serial Number:* 
┃ ${sn}
┗ ┅ ━━━━━━━━━━━━━━━━━━━━━ ┅ ━

 _Simpan Serial Number anda!_
 _*jika sn kamu hilang, ketik ${usedPrefix}ceksn_
`.trim()
await conn.fakeReply(m.chat, caption,/* { 
  key: { 
    remoteJid: 'status@broadcast',
    participant:*/ '0@s.whatsapp.net', 
    /*fromMe: false 
  }, message: { 
    "imageMessage": { 
      "mimetype": "image/jpeg", 
      "caption": */` *Registration Successful!!*`, /*
      "jpegThumbnail": tnbot} } }, { contextInfo: { mentionedJid: [m.sender] } }m*/'status@broadcast')
global.db.data.users[m.sender].uang += 10000
global.db.data.users[m.sender].koin += 5000
}
//handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <nama>.<umur>')
//handler.tags = ['exp']

handler.command = /^(verify)?)$/i

module.exports = handler
