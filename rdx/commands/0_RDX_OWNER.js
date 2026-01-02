const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: 'owner',
    aliases: ['dev', 'creator', 'developer'],
    description: 'Show bot owner information',
    credits: 'MEHAK JUTTI',
    usage: 'owner',
    category: 'Info',
    prefix: false
  },

  async run({ api, event, send, config }) {
    const { threadID, messageID } = event;

    const ownerPics = [
      'https://video.xx.fbcdn.net/v/t42.3356-2/608426649_25124766130557254_7356419902144397071_n.mp4?_nc_cat=105&ccb=1-7&_nc_sid=4f86bc&_nc_eui2=AeEc29SQKL7H21iIHcHtClJeAoNWJHb5OmICg1Ykdvk6YgWRVaB3O1FqJd_O10bbEWe0MzBl7olHVrBTgvGbSjB-&_nc_ohc=LDnb8zn-uwQQ7kNvwF_QLDb&_nc_oc=AdnrsVB0MzLZ49BDDJ-1n4ZGsiZwbxfTWBMVMNKC-uDcKc5GWf29pjAhpmsCSd7zj_0&_nc_zt=28&_nc_ht=video.xx&_nc_gid=QtH3yKW5zj0l5bMrh7BIoQ&oh=03_Q7cD4QEG3OeSdUJmdwRE1DGbtjTPECUe1Vh09mVcntAGG9Fh2A&oe=69595D2D&dl=1',
      'https://i.ibb.co/Kc0vPR0K/532bbc2c873c.jpg',
      'https://i.ibb.co/FqKwsKHz/c44acc0d60bd.jpg',
      'https://i.ibb.co/gqkgvvG/10c959c9a891.jpg'
    ];

    const randomPic = ownerPics[Math.floor(Math.random() * ownerPics.length)];

    const ownerInfo = `
╔═══════════════════════════╗
║   ✨ 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 ✨   ║
╠═══════════════════════════╣
║                           ║
║  👤 𝐍𝐚𝐦𝐞: ⎯꯭̽  𝐌𝐄𝐇𝐀𝐊 ⎯꯭̽³>     ║
║                           ║
╠═══════════════════════════╣
║  📱 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐈𝐧𝐟𝐨:          ║
║                           ║
║  🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤:              ║
║  https://www.facebook.com/profile.php?id=61578393323391 ║
║                           ║
║  📲 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩:              ║
║  wa.me/       ║
║                           ║
╠═══════════════════════════╣
║  🤖 𝐁𝐨𝐭 𝐃𝐞𝐭𝐚𝐢𝐥𝐬:           ║
║                           ║
║  📛 Name: ${config.BOTNAME || '⎯꯭̽ 𝐌𝐄𝐇𝐀𝐊•𝐁𝐎𝐓 ⎯꯭̽³>'}
║  ⚡ Prefix: ${config.PREFIX || '.'}
║  💻 Version: 2.0.0        ║
║  🛠️ Framework: WS3-FCA    ║
║                           ║
╠═══════════════════════════╣
║  💝 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪 𝙛𝙤𝙧 𝙪𝙨𝙞𝙣𝙜!  ║
╚═══════════════════════════╝
    `.trim();

    try {
      const cacheDir = path.join(__dirname, 'cache');
      fs.ensureDirSync(cacheDir);
      const imgPath = path.join(cacheDir, `owner_${Date.now()}.jpg`);
      
      const response = await axios.get(randomPic, { responseType: 'arraybuffer' });
      fs.writeFileSync(imgPath, Buffer.from(response.data));
      
      api.sendMessage(
        {
          body: ownerInfo,
          attachment: fs.createReadStream(imgPath)
        },
        threadID,
        () => {
          try { fs.unlinkSync(imgPath); } catch {}
        },
        messageID
      );
    } catch (error) {
      return send.reply(ownerInfo);
    }
  }
};
