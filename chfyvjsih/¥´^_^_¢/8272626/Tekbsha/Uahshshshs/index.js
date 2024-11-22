const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  fetchLatestBaileysVersion,
  getContentType,
  Browsers,
  getAggregateVotesInPollMessage,
   makeInMemoryStore,
  makeCacheableSignalKeyStore,
  receivedPendingNotifications,
  } = require('@whiskeysockets/baileys')
const fs = require('fs')
const P = require('pino')
const path = require('path');
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('./lib/functions')
const { sms,downloadMediaMessage } = require('./lib/msg')
const axios = require('axios');
const cheerio = require('cheerio');

const { File } = require('megajs')
const prefix = config.PREFIX;
const ownerNumber = config.OWNER;
const l = console.log
const addresses = config.ADDRESSES;
const addressArray = addresses.split(',');
const testAddresses = config.TEST_ADDRESSES;
const testAddressArray = testAddresses.split(',');
function genMsgId() {
  const lt = 'sachibotprmd';
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}
  //=========================================
let hiruPreviousLinkId = '1';
let deranaPreviousLinkId = '1';
let sirasaPreviousLinkId = '1';
//===================SESSION============================
async function session(){
	const df = path.join(__dirname, '/auth_info_baileys/creds.json');

	if (!fs.existsSync(df)) {
	if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
	const sessdata = config.SESSION_ID
	
	if (sessdata.length > 295) {
	const contentData =atob(config.SESSION_ID)   
	await sleep(2000);   
	fs.writeFile(df,contentData, () => {
	console.log("✅ Session download completed and saved to creds.json !!")

	})
	}}
	}
 session()
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================
async function connectToWA() {
  console.log("Connecting bot...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
  var { version } = await fetchLatestBaileysVersion()
  const latestWebVersion = () => {
          let version
          try {
              let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
              version = [a.currentVersion.replace(/[.]/g, ', ')]
          } catch {
              version = [2, 2204, 13]
          }
          return version
   }
  const store = makeInMemoryStore({
          logger: P({ level: "silent", stream: "store" }),
      });
  const NodeCache = require("node-cache")
  const msgRetryCounterCache = new NodeCache()
  
      const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,     
       auth: {
           creds: state.creds,
           keys: makeCacheableSignalKeyStore(state.keys, P({ level: "fatal" }).child({ level: "fatal" })),
        },
        browser: Browsers.macOS("Safari"),
        getMessage: async (key) => {
           let jid = jidNormalizedUser(key.remoteJid)
           let msg = await store.loadMessage(jid, key.id)
  
           return msg?.message || ""
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined, 
        syncFullHistory: false,
        latestWebVersion,
     })
  
          store.bind(conn.ev)
  setInterval(() => {
      store.writeToFile(__dirname+"/store.json");
    }, 3000);
  
conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {

console.log('Installing plugins 🔌... ')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Plugins installed ✅')
console.log('Bot connected ✅')
conn.sendMessage(ownerNumber + "@s.whatsapp.net", { text: `NEWS BOT CONNECTED ✅` } ,{messageId:genMsgId()} )    
sleep(5000)
//==================[NEWS-SCRIPT]========================================

const url = 'https://www.hirunews.lk/local-news.php?pageID=1';            
async function hiruNewsfirst() {                                          
  try {                                                                   
    const response = await axios.get(url);                                
    const html = response.data;                                           
    const $ = cheerio.load(html);                                         
    const link = $('.all-section-tittle > a').attr('href');
	
    const match = link.match(/\/(\d+)\//);                                //SESSION UNSTABLE WELA RESTART WEDDI EKAMA NEWS EKA ENA EKA NAWATHTHANNA
    if (match && match[1]) {                                              
      const firstLink = match[1];    
	    //await  conn.sendMessage('94725881990@s.whatsapp.net',{text:firstLink},{messageId:genMsgId()} );
      if (firstLink != hiruPreviousLinkId) {                                 
        const newsurl = `https://www.hirunews.lk/${firstLink}/`;          
        const newsResponse = await axios.get(newsurl);
        const $ = cheerio.load(newsResponse.data);
        const mainTitle = $('h1.main-tittle').text().trim();          
        const publishedTime = $('div.container.site-width > center > p').text().trim();
        const description = $('#article-phara2').text().trim().replace(/\n/g, '\n');
        const imageNews = $('div.main-article-banner > img').attr('data-src');
        hiruPreviousLinkId = firstLink;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
hiruNewsfirst()
 sleep(5000)
async function hiruNews() {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const link = $('.all-section-tittle > a').attr('href');
    const match = link.match(/\/(\d+)\//);
    if (match && match[1]) {
      const firstLink = match[1];
      if (firstLink != hiruPreviousLinkId) {
        const newsurl = `https://www.hirunews.lk/${firstLink}/`;
        const newsResponse = await axios.get(newsurl);
        const $ = cheerio.load(newsResponse.data);
        const mainTitle = $('h1.main-tittle').text().trim();
        const publishedTime = $('div.container.site-width > center > p').text().trim();
        const description = $('#article-phara2').text().trim().replace(/\n/g, '\n');
        const imageNews = $('div.main-article-banner > img').attr('data-src');
        const ofcNewsGroup = `https://chat.whatsapp.com/GBmuabtVf5MJ1PnXYpTgIb`;
        const ofcAdmins = `Isuru Chamika and Tharusha Kavindya`;
	    const v = '```'
	    const f = '`'
	    
const desctext = `◦| ${publishedTime} |◦

*_${mainTitle}_*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
${description}

*☀ Hiru News :-*
*_${newsurl}_*

*🕵 Ofc Admins :-*
*_${ofcAdmins}_*

*🥏 Ofc News Group :-*
*_${ofcNewsGroup}_*


*© CYBERKILLERSTEAM | 2021 - 2024*`;

let buttonMessage = {
            image: {url: imageNews},
            caption: desctext,
            contextInfo: {
             forwardingScore: 1, 
             isForwarded: true, 
             forwardedNewsletterMessageInfo: {
             newsletterJid: "120363261989936335@newsletter",
             newsletterName: "H I R U  N E W S"
  }
 }
};
	      
        for (const address of addressArray) {
        const sentmsg = await conn.sendMessage(address, buttonMessage,{messageId:genMsgId()} );
        await sleep(2000)
        conn.sendMessage(address, { react: { text: '📰', key: sentmsg.key } });
        }
       // hiruPreviousLinkId.length = 0;
        hiruPreviousLinkId = firstLink;

      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
setInterval(hiruNews, 1 * 60 * 1000);
//=============================== DERANA-NEWS SCRIPT ===============================
const Nurl = 'https://sinhala.adaderana.lk/sinhala-hot-news.php';            
async function AdaDeranaNews() {                                          
  try {                                                                   
    const response = await axios.get(Nurl);                                
    const html = response.data;                                           
    const $ = cheerio.load(html);                                         
    const link = $('.story-text h2 a').attr('href');
	
    const match = link.match(/\/(\d+)/);          
    if (match && match[1]) {                                              
      const firstLink = match[1];    
	   //await  conn.sendMessage('94785635619@s.whatsapp.net',{text:firstLink},{messageId:genMsgId()} );
      if (firstLink != deranaPreviousLinkId) {                                 
        const newsurl = `https://sinhala.adaderana.lk/news/${firstLink}`;          
        const newsResponse = await axios.get(newsurl);
        const $ = cheerio.load(newsResponse.data);
        const mainTitle = $('h1.news-heading').text().trim();          
        const publishedTime = $('.news-datestamp').text().trim().replace(/\t\t/g, ' - ');
        const description = $('.news-content p').text().trim().replace(/\n/g, '\n');
        const imageNews = $('div.news-banner img.img-responsive').attr('src');
        deranaPreviousLinkId = firstLink;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
AdaDeranaNews()
 sleep(5000)
async function deranaNews() {
  try {
    const response = await axios.get(Nurl);
    const html = response.data;
    const $ = cheerio.load(html);
    const link = $('.story-text h2 a').attr('href');
    const match = link.match(/\/(\d+)/);
    if (match && match[1]) {
      const firstLink = match[1];
      if (firstLink != deranaPreviousLinkId) {
        const newsurl = `https://sinhala.adaderana.lk/news/${firstLink}`;          
        const newsResponse = await axios.get(newsurl);
        const $ = cheerio.load(newsResponse.data);
        const mainTitle = $('h1.news-heading').text().trim();          
        const publishedTime = $('.news-datestamp').text().trim().replace(/\t\t/g, ' - ');
        const description = $('.news-content p').text().trim().replace(/\n/g, '\n');
        const imageNews = $('div.news-banner img.img-responsive').attr('src');

const deranaNewsDesc = `◦| ${publishedTime} |◦

*_${mainTitle}_*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
${description}

*🌍 Derana News :-*
*_${newsurl}_*

*🕵 Ofc Admins :-*
*_Isuru Chamika and Tharusha Kavindya_*

*🥏 Ofc News Group :-*
*_https://chat.whatsapp.com/GBmuabtVf5MJ1PnXYpTgIb_*


*© CYBERKILLERSTEAM | 2021 - 2024*`;

let buttonMessage = {
            image: {url: imageNews},
            caption: deranaNewsDesc,
            contextInfo: {
             forwardingScore: 1, 
             isForwarded: true, 
             forwardedNewsletterMessageInfo: {
             newsletterJid: "120363261989936335@newsletter",
             newsletterName: "D E R A N A  N E W S"
  }
 }
};



for (const address of addressArray) {
const dmsg = await conn.sendMessage(address, buttonMessage, {messageId:genMsgId()} );
await sleep(2000)

conn.sendMessage(address, { react: { text: '📰', key: dmsg.key } });
}
deranaPreviousLinkId = firstLink;

}
}
} catch (error) {
console.error(error);
return null;
}
};

setInterval(deranaNews, 1 * 60 * 1000);
/*=========================SIRASA-NEWS=====================================================
const sirasaApiLink = 'https://www.dark-yasiya-api.site/news/sirasa';
async function sirasaNews() {
  try {
      const response = await axios.get(sirasaApiLink);

const data = response.result;

    const link = data.url;
    const match = link.match(/\/(\d+)/);
    if (match && match[1]) {
      const firstLink = match[1];
      await  conn.sendMessage('94766632281@s.whatsapp.net',{text:firstLink},{messageId:genMsgId()} );
      if (firstLink != sirasaPreviousLinkId) {
let newsurl = `https://sinhala.newsfirst.lk${firstLink}`;
let Title = data.title;
let publishedTime = 'Today';
let description = data.desc;
let image = data.image;


const sirasaNewsDesc = `◦| ${publishedTime} |◦

*_${Title}_*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
${description}

*🔺 Sirasa News :-*
*_${newsurl}_*

*🕵 Ofc Admins :-*
*_Isuru Chamika and Tharusha Kavindya_*

*🥏 Ofc News Group :-*
*_https://chat.whatsapp.com/GBmuabtVf5MJ1PnXYpTgIb_*


*© CYBERKILLERSTEAM | 2021 - 2024*`;

let buttons = {
            text: sirasaNewsDesc,
            contextInfo: {
                externalAdReply: {
                    title: "S L  N E W S  U P D A T E S",
                    body: "ᴘ ᴏ ᴡ ᴇ ʀ ᴇ ᴅ  ʙ ʏ  ᴄ ʏ ʙ ᴇ ʀ ᴋ ɪ ʟ ʟ ᴇ ʀ ꜱ ᴛ ᴇ ᴀ ᴍ",
                    thumbnailUrl: image,
                    sourceUrl: newsurl,
                    mediaType: 1,
                    renderLargerThumbnail: true
   },
             forwardingScore: 1, 
             isForwarded: true, 
             forwardedNewsletterMessageInfo: {
             newsletterJid: "120363261989936335@newsletter",
             newsletterName: "S I R A S A  N E W S"
  }
 }
};



for (const address of addressArray) {
const dmsg = await conn.sendMessage(address, buttons, {messageId:genMsgId()} );
await sleep(2000)

conn.sendMessage(address, { react: { text: '📰', key: dmsg.key } });
}
sirasaPreviousLinkId = firstLink;
}
}

} catch (error) {
console.error(error);
return null;
}};

setInterval(sirasaNews, 1 * 60 * 1000); */
//==================================================================================
}
})
conn.ev.on('creds.update', saveCreds)

conn.ev.on('messages.upsert', async(mek) => {
try {
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'No Name'
const isuru = '94766632281'
const isIsuru = isuru?.includes(senderNumber)	
const isMe = botNumber?.includes(senderNumber)	
const isOwner = ownerNumber?.includes(senderNumber) 
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins?.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins?.includes(sender) : false
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: mek ,messageId:genMsgId()  })
}
conn.sendFileUrl = async(jid, url, caption, quoted, options = {}) => {
  let mime = '';
  let res = await axios.head(url)
  mime = res.headers['content-type']
  if (mime.split("/")[1] === "gif") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted,   ...options })
  }
  let type = mime.split("/")[0] + "Message"
  if (mime === "application/pdf") {
      return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted,  ...options })
  }
  if (mime.split("/")[0] === "image") {
      return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted ,  ...options })
  }
  if (mime.split("/")[0] === "video") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted ,  ...options })
  }
  if (mime.split("/")[0] === "audio") {
      return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted,  ...options })
  }
}
	let isThisBot = true
	if(isIsuru){
 await conn.sendMessage(from, { react: { text: '🥷', key: mek.key } });

	}else if(isOwner){
  await conn.sendMessage(from, { react: { text: '👨‍💻', key: mek.key } });
	}

if (!isMe && !isIsuru && !isOwner && !isGroup && config.ONLY_GROUP == 'true') return 
if (!isMe && !isIsuru && !isOwner && config.ONLY_ME == 'true') return 
//==================================plugin map================================//

//=====Auto-Read-Cmd==========
if (isIsuru) {
              await conn.readMessages([mek.key])  // Mark command as read
}

const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias?.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isIsuru, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[PLUGIN ERROR] ", e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isIsuru,isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isIsuru, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isIsuru, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isIsuru, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});
//====================================================================
switch (command) {
case 'jid':
reply(from)
break

default:				
if ((isOwner || isIsuru || isMe) && body.startsWith('>')) {
let bodyy = body.split('>')[1]
let code2 = bodyy.replace("°", ".toString()");
try {
let resultTest = await eval(code2);
if (typeof resultTest === "object") {
reply(util.format(resultTest));
} else {
reply(util.format(resultTest));
}
} catch (err) {
reply(util.format(err));
}}}
} catch (e) {
const isError = String(e)
console.log(isError)}
})
}
app.get("/", (req, res) => {
res.send("NEWS BOT WORKING ✅");
});
app.listen(port, () => console.log(`Server Running on PORT http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
