const Telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const { MongoClient } = require('mongodb');
const data = require('./data')
const WAValidator = require('multicoin-address-validator');
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const tronWeb = require('tronweb');
const Markup = require('telegraf/markup')
const { leave } = Stage
const Web3 = require('web3')
const stage = new Stage()
const { Captcha } = require('captcha-canvas');
var http = require('http')
var fs = require('fs')
const { writeFileSync, fsync } = require('fs');
const Coinbase = require('coinbase');
const { count } = require('console');
const { channel } = require('diagnostics_channel');
const Client = require('coinbase').Client;

const min_wd = data.min_wd
const max_wd = data.max_wd
const bot_cur = data.symbol
var cur = data.currency
const payment_channel = data.payment_channel
const admin = data.admin
const refer_bonus = data.refer_bonus
const daily_bonus = data.daily_bonus
const channels = data.channels
const bot_username = data.bot_username

 const Web3js = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"))
const privateKey = 'd7d63f6a5e45d7e5444ed8f374a9b8344e91a24d3df49a21f93302f421abb51d'
let tokenAddress = '0xE69328043B689da3eC7a4a08cEDeE73d2f08B706'
let fromAddress = '0xD9F6eaAF1d4DeA14501E5F6CE82cA98Bc08fc111'

let contractABI = [
   
   {
       'constant': false,
       'inputs': [
           {
               'name': '_to',
               'type': 'address'
           },
           {
               'name': '_value',
               'type': 'uint256'
           }
       ],
       'name': 'transfer',
       'outputs': [
           {
               'name': '',
               'type': 'bool'
           }
       ],
       'type': 'function'
   }
]
const bot = new Telegraf(data.token)
let db

/*const balance = new Scene('balance')
stage.register(balance)
const bonus = new Scene('bonus')
stage.register(bonus)
const referral = new Scene('referral')
stage.register(referral)
const withdraw = new Scene('withdraw')
stage.register(withdraw)*/

mongo.connect(data.mongoLink, {useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.log(err)
  }

  db = client.db(bot_username)
  bot.telegram.deleteWebhook().then(success => {
  success && console.log('Tera Bot Start Ho Gyo Check Krle')
  bot.startPolling()
})

})

//const stage = new Stage()
bot.use(session())
bot.use(stage.middleware())

const onCheck = new Scene('onCheck')
stage.register(onCheck)

const getWallet= new Scene('getWallet')
stage.register(getWallet)


const twiterhandle = new Scene('twiterhandle')
stage.register(twiterhandle)
const fbhandle = new Scene('fbhandle')
stage.register(fbhandle)
const adreshandle = new Scene('adreshandle')
stage.register(adreshandle)
const discord = new Scene('discord')
stage.register(discord)
const insta = new Scene('insta')
stage.register(insta)
const getMsg = new Scene('getMsg')
stage.register(getMsg)

const onWithdraw = new Scene('onWithdraw')
stage.register(onWithdraw)

const onConfirmation = new Scene('onConfirmation')
stage.register(onConfirmation)


bot.hears(/^\/start (.+[1-9]$)/, async (ctx) => { 
    try { 
    if(ctx.message.chat.type != 'private'){
      return
      }
       let dbData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()
     let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()
     
        let botData = await db.collection('botData').find({bot: "mybot"}).toArray()
      
      if(botData.length===0){
      db.collection('botData').insertOne({bot: 'mybot',wdstat: "active",cur: cur,admin:data.admin,maxwd:data.maxwd}) .catch((err) => sendError(err, ctx))
      }
      const captcha = new Captcha(450,175); //create a captcha canvas of 100x300.
      captcha.async = false //Sync
      captcha.addDecoy(); //Add decoy text on captcha canvas.
      captcha.drawTrace(); //draw trace lines on captcha canvas.
      captcha.drawCaptcha({size: 85, color: "red"}); //draw captcha text on captcha canvas.
      console.log(captcha.text); //log captcha text. 
      const captcha1 = new Captcha(450,200); //create a captcha canvas of 100x300.
      captcha1.async = false //Sync
      captcha1.addDecoy(); //Add decoy text on captcha canvas.
      captcha1.drawTrace(); //draw trace lines on captcha canvas.
      captcha1.drawCaptcha({size: 90, color: "red"}); //draw captcha text on captcha canvas.
      console.log(captcha1.text); //log captcha text. 
      const captcha2 = new Captcha(150,450); //create a captcha canvas of 100x300.
      captcha2.async = false //Sync
      captcha2.addDecoy({size: 15, opacity: 0.1}); //Add decoy text on captcha canvas.
      captcha2.drawTrace(); //draw trace lines on captcha canvas.
      captcha2.drawCaptcha({size: 90, color: "red"}); //draw captcha text on captcha canvas.
      console.log(captcha2.text); //log captcha text. 
      const captca34 = captcha.text
         
  if(bData.length===0){
    writeFileSync('captcha'+captca34+'.png', captcha.png); //create 'captcha.png' file in your directory.
    if(ctx.from.id != +ctx.match[1]) {
    db.collection('pendUsers').insertOne({userId: ctx.from.id, inviter: +ctx.match[1] })}
    let valid = ctx.from.first_name
    let top = ctx.from.first_name
    db.collection('allUsers').insertOne({userId: ctx.from.id, virgin: true, paid: false,inviter: +ctx.match[1] })
    db.collection('balance').insertOne({userId: ctx.from.id, balance:0,adbal:0,withdraw:0,name: valid ,refbalance: 0})
    db.collection('top10').insertOne({ userId: ctx.from.id, top: top})
    let q1 = rndInt(1,3)  
    
    if(q1==1){
        await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha.text, callback_data: "captchacheck" },{ text: captcha1.text, callback_data: "cfail" },{ text: captcha2.text, callback_data: "cfail" }]]}})
        try{ fs.unlinkSync('./captcha'+captca34+'.png');
        console.log("Deleted"); 
      } catch (err) {
          sendError(err, ctx)
        }
    } 
    if(q1==2){
      await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha1.text, callback_data: "cfail" },{ text: captcha.text, callback_data: "captchacheck" },{ text: captcha2.text, callback_data: "cfail" }]]}})
      try{ fs.unlinkSync('./captcha'+captca34+'.png');
      console.log("Deleted"); 
    } catch (err) {
        sendError(err, ctx)
      }
    } 
  if(q1==3){
    await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha2.text, callback_data: "cfail" },{ text: captcha1.text, callback_data: "cfail" },{ text: captcha.text, callback_data: "captchacheck" }]]}})
    try{ fs.unlinkSync('./captcha'+captca34+'.png');
    console.log("Deleted"); 
  } catch (err) {
      sendError(err, ctx)
    }
  } 
}else{
  ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
  db.collection('joinedUsers').insertOne({userId: ctx.from.id, join: true}) 

 
       let msg = ''+data.welcome+''
       let pic = ''+data.welcomepic+''
       ctx.replyWithPhoto(pic,{caption:msg,parse_mode:'markdown', disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "✔️ Done, Let's Start", callback_data: "cbcheck" }]] }})
      }


} catch (err) {
sendError(err, ctx)
}
})
bot.hears(['/start', '⬅️ Back'], async (ctx) => {
  try {
    
  if(ctx.message.chat.type != 'private'){
  return
  }
  
  let dbData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()
  let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()
  let botData = await db.collection('botData').find({bot: "mybot"}).toArray()
  
  if(botData.length===0){
  db.collection('botData').insertOne({bot: 'mybot',wdstat: "active",cur:cur,admin:data.admin,maxwd:data.maxwd}) 
  }
  const captcha = new Captcha(450,175); //create a captcha canvas of 100x300.
  captcha.async = false //Sync
  captcha.addDecoy(); //Add decoy text on captcha canvas.
  captcha.drawTrace(); //draw trace lines on captcha canvas.
  captcha.drawCaptcha({size: 85, color: "red"}); //draw captcha text on captcha canvas.
  console.log(captcha.text); //log captcha text. 
  const captcha1 = new Captcha(450,200); //create a captcha canvas of 100x300.
  captcha1.async = false //Sync
  captcha1.addDecoy(); //Add decoy text on captcha canvas.
  captcha1.drawTrace(); //draw trace lines on captcha canvas.
  captcha1.drawCaptcha({size: 90, color: "red"}); //draw captcha text on captcha canvas.
  console.log(captcha1.text); //log captcha text. 
  const captcha2 = new Captcha(150,450); //create a captcha canvas of 100x300.
  captcha2.async = false //Sync
  captcha2.addDecoy({size: 15, opacity: 0.1}); //Add decoy text on captcha canvas.
  captcha2.drawTrace(); //draw trace lines on captcha canvas.
  captcha2.drawCaptcha({size: 90, color: "red"}); //draw captcha text on captcha canvas.
  console.log(captcha2.text); //log captcha text. 
  const captca34 = captcha.text
  
  if(bData.length===0){
    writeFileSync('captcha'+captca34+'.png', captcha.png); //create 'captcha.png' file in your directory.
  	let valid = ctx.from.first_name
let top = ctx.from.first_name
  db.collection('balance').insertOne({userId: ctx.from.id, balance:0,adbal:0,name: valid ,refbalance: 0})
  db.collection('top10').insertOne({ userId: ctx.from.id, top: top})
  db.collection('allUsers').insertOne({userId: ctx.from.id, virgin: true, balance: 0})
  db.collection('pendUsers').insertOne({userId: ctx.from.id})
  let q1 = rndInt(1,3)  
    
  if(q1==1){
      await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha.text, callback_data: "captchacheck" },{ text: captcha1.text, callback_data: "cfail" },{ text: captcha2.text, callback_data: "cfail" }]]}})
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second
      try{ fs.unlinkSync('./captcha'+captca34+'.png');
      console.log("Deleted"); 
    } catch (err) {
        sendError(err, ctx)
      }
    } 
  if(q1==2){
    await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha1.text, callback_data: "cfail" },{ text: captcha.text, callback_data: "captchacheck" },{ text: captcha2.text, callback_data: "cfail" }]]}})
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second
    try{ fs.unlinkSync('./captcha'+captca34+'.png');
    console.log("Deleted"); 
  } catch (err) {
      sendError(err, ctx)
    }
  } 
if(q1==3){
  await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha2.text, callback_data: "cfail" },{ text: captcha1.text, callback_data: "cfail" },{ text: captcha.text, callback_data: "captchacheck" }]]}})
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second
  try{ fs.unlinkSync('./captcha'+captca34+'.png');
  console.log("Deleted"); 
} catch (err) {
    sendError(err, ctx)
  }
}}else{
  ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
      db.collection('joinedUsers').insertOne({userId: ctx.from.id, join: true}) 

 
       let msg = ''+data.welcome+''
       let pic = ''+data.welcomepic+''
       ctx.replyWithPhoto(pic,{caption:msg,parse_mode:'markdown', disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "✔️ Done, Let's Start", callback_data: "cbcheck" }]] }})
      }
 
 } catch (err) {
   sendError(err, ctx)
 }
})


bot.action('cfail', async (ctx) => {
  try {
    ctx.deleteMessage().catch((err) => sendError(err, ctx));
    ctx.answerCbQuery('‼️ Wrong Answer try again...', {
      show_alert: true
    })
    const captcha = new Captcha(450,175); //create a captcha canvas of 100x300.
  captcha.async = false //Sync
  captcha.addDecoy(); //Add decoy text on captcha canvas.
  captcha.drawTrace(); //draw trace lines on captcha canvas.
  captcha.drawCaptcha({size: 85, color: "darkgreen"}); //draw captcha text on captcha canvas.
  console.log(captcha.text); //log captcha text. 
  const captcha1 = new Captcha(450,200); //create a captcha canvas of 100x300.
  captcha1.async = false //Sync
  captcha1.addDecoy(); //Add decoy text on captcha canvas.
  captcha1.drawTrace(); //draw trace lines on captcha canvas.
  captcha1.drawCaptcha({size: 90, color: "darkgreen"}); //draw captcha text on captcha canvas.
  console.log(captcha1.text); //log captcha text. 
  const captcha2 = new Captcha(150,450); //create a captcha canvas of 100x300.
  captcha2.async = false //Sync
  captcha2.addDecoy({size: 15, opacity: 0.1}); //Add decoy text on captcha canvas.
  captcha2.drawTrace(); //draw trace lines on captcha canvas.
  captcha2.drawCaptcha({size: 90, color: "darkgreen"}); //draw captcha text on captcha canvas.
  console.log(captcha2.text); //log captcha text. 
  const captca34 = captcha.text
  writeFileSync('captcha'+captca34+'.png', captcha.png); //create 'captcha.png' file in your directory.
  let q1 = rndInt(1,3)  
    
  if(q1==1){
      await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha.text, callback_data: "captchacheck" },{ text: captcha1.text, callback_data: "cfail" },{ text: captcha2.text, callback_data: "cfail" }]]}})
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second
      try{ fs.unlinkSync('./captcha'+captca34+'.png');
      console.log("Deleted"); 
    } catch (err) {
        sendError(err, ctx)
      }
    } 
  if(q1==2){
    await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha1.text, callback_data: "cfail" },{ text: captcha.text, callback_data: "captchacheck" },{ text: captcha2.text, callback_data: "cfail" }]]}})
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second
    try{ fs.unlinkSync('./captcha'+captca34+'.png');
    console.log("Deleted"); 
  } catch (err) {
      sendError(err, ctx)
    }
  } 
if(q1==3){
  await ctx.replyWithPhoto({source: './captcha'+captca34+'.png'},{ caption: '*🚊 Click on Correct Option...*',parse_mode: 'markdown',  reply_markup: {inline_keyboard: [[{ text: captcha2.text, callback_data: "cfail" },{ text: captcha1.text, callback_data: "cfail" },{ text: captcha.text, callback_data: "captchacheck" }]]}})
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second
  try{ fs.unlinkSync('./captcha'+captca34+'.png');
  console.log("Deleted"); 
}  catch (err) {
  sendError(err, ctx)
}
}
  }
  catch (err) {
    sendError(err, ctx)
  }
 })

 
bot.action('captchacheck', async (ctx) => {
  try {
    
    ctx.deleteMessage().catch((err) => sendError(err, ctx));

    ctx.answerCbQuery('🥳 Congratulation, Captcha Solve...', {
      show_alert: true
    })
    if(ctx.from.last_name){
      valid = ctx.from.first_name+' '+ctx.from.last_name
      }else{
      valid = ctx.from.first_name
      }
      db.collection('vUsers').insertOne({userId: ctx.from.id, answer:"Done Captcha Verified",name:valid})
      let inChannel = await findUser(ctx)
      
      db.collection('joinedUsers').insertOne({userId: ctx.from.id, join: true}) 

 
let msg = ''+data.welcome+''
       let pic = ''+data.welcomepic+''
       ctx.replyWithPhoto(pic,{caption:msg,parse_mode:'markdown', disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "✔️ Done, Let's Start", callback_data: "cbcheck" }]] }})
      }
   catch (err) {
    sendError(err, ctx)
  }
})

bot.action('channelcheck', async (ctx) => {
  try {
let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()

if(bData.length===0){
return}

ctx.deleteMessage().catch((err) => sendError(err, ctx)); 

db.collection('joinedUsers').insertOne({userId: ctx.from.id, join: true}) 

 
ctx.replyWithMarkdown(
    data.welcome,{ disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "Check ✅", callback_data: "channelcheck" }]] }})

}
  catch (err) {
    sendError(err, ctx)
  }
})

bot.action('cbcheck', async (ctx) => {
  try {
    ctx.deleteMessage().catch((err) => sendError(err, ctx)); 

    let res = await bot.telegram.getChatMember(data.channel1, ctx.from.id)
    let result = res.status
    let res2 = await bot.telegram.getChatMember(data.channel2, ctx.from.id)
    let result2 = res2.status
    let res3 = await bot.telegram.getChatMember(data.channel3, ctx.from.id)
    let result3 = res3.status
    let res4 = await bot.telegram.getChatMember(data.channel4, ctx.from.id)
    let result4 = res4.status
    let res5 = await bot.telegram.getChatMember(data.channel5, ctx.from.id)
    let result5 = res5.status
    if ((result == 'creator' || result == 'administrator' || result == 'member') && (result2 == 'creator' || result2 == 'administrator' || result2 == 'member') && (result3 == 'creator' || result3 == 'administrator' || result3 == 'member')&& (result4 == 'creator' || result4 == 'administrator' || result4 == 'member')&& (result5 == 'creator' || result5 == 'administrator' || result5 == 'member')) {
      ctx.scene.enter('twiterhandle')
      await ctx.replyWithMarkdown(data.media, { disable_web_page_preview: true, reply_markup: { remove_keyboard: true } }).then((m) => {
        console.log(m.message_id)
        var msid = m.message_id
        db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
      })
         }else{
      ctx.answerCbQuery('‼️ Must Join All Channels', {
        show_alert: true
      })
    ctx.replyWithMarkdown(
        data.channel,{ disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "Check ✅", callback_data: "channelcheck" }]] }})
    
    }  
  }
  
  catch (err) {
    sendError(err, ctx)
  }
})

    
twiterhandle.on('text', async (ctx) => {
  try{
    let MSGid = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let deletemsg = MSGid[0].msid*1
    ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
    ctx.deleteMessage(deletemsg).catch((err) => sendError(err, ctx)); 
  if (ctx.message.text.length<=15){
   
    await ctx.replyWithMarkdown('*‼️ Invalid URL please submit valid URL ‼️*\n\n'+data.media+'', { disable_web_page_preview: true, reply_markup: { remove_keyboard: true } }).then((m) => {
      console.log(m.message_id)
      var msid = m.message_id
      db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
    })
    
    }else{
  var first = await db.collection('balance').find({ userId: ctx.from.id })
  if (first.length == 0) {
    await db.collection('balance').insertOne({ userId: ctx.from.id, twiter: ctx.message.text })
  } else {
    await db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { twiter: ctx.message.text } }, { upsert: true })
  }
  ctx.scene.leave();
  let pData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()
       if(('inviter' in pData[0]) && !('referred' in pData[0])){
   let bal = await db.collection('balance').find({userId: pData[0].inviter}).toArray()

 var cal = bal[0].balance*1
 var sen = refer_bonus*1
 var ref = bal[0].refbalance * 1
 var see1 = ref + 1
 var see = cal+sen

 let dbData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()
   bot.telegram.sendMessage(pData[0].inviter, '➕ *New Referral on your link* you received '+refer_bonus+' '+cur, {parse_mode:'markdown'})
    db.collection('allUsers').updateOne({userId: ctx.from.id}, {$set: {inviter: pData[0].inviter, referred: 'surenaa'}}, {upsert: true})
     db.collection('joinedUsers').insertOne({userId: ctx.from.id, join: true})
    db.collection('balance').updateOne({userId: dbData[0].inviter}, {$set: {balance: see}}, {upsert: true})
    db.collection('balance').updateOne({userId: dbData[0].inviter}, {$set: {refbalance: see1}}, {upsert: true})
      }
  let msg = data.addtext
   await ctx.replyWithPhoto(data.addimage, { caption: ' '+msg+' ',parse_mode:'markdown', disable_web_page_preview: true}).then((m) => {
    console.log(m.message_id)
    var msid = m.message_id
    db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
  })
  ctx.scene.enter('adreshandle');
    }
  } catch (err) {
    sendError(err, ctx)
  }
})

 adreshandle.on('text', async (ctx) => {
  try {
    let MSGid = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let deletemsg = MSGid[0].msid*1
    ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
    ctx.deleteMessage(deletemsg).catch((err) => sendError(err, ctx)); 
    
    let text = ctx.message.text
    
    var valid = ctx.message.text.length=42
    if(valid){
  var second = await db.collection('balance').find({ userId: ctx.from.id })
  if (second.length == 0) {
    db.collection('balance').insertOne({ userId: ctx.from.id, Address: ctx.message.text })
  } else {
    db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { address: ctx.message.text } }, { upsert: true })
  }
  ctx.scene.leave();
  let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
  let bal = maindata[0].balance
  let adbal = maindata[0].adbal
  if(adbal<=0){
    amount = bal+data.joinbal
    db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { balance: amount } }, { upsert: true })
    db.collection('balance').updateOne({ userId: ctx.from.id }, { $set: { adbal: 1 } }, { upsert: true })
  }
  let maaindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let maindaata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let fb = maindata[0].twiter
  let address = maindata[0].address
  let discord = maindata[0].discord
  let sum = maindaata[0].balance
  let insta = maindata[0].insta
  await ctx.replyWithMarkdown('*👋Hello '+ctx.from.first_name+' || Here is your statics*\n\n*📊 Airdrop Balance: '+sum+' $'+bot_cur+'*\n\n🙇‍♀️* Your personal referral link: https://t.me/'+data.bot_username.split('@')[1]+'?start=' + ctx.from.id + '*\n\n*👨‍✈️ Telegram: **'+ctx.from.first_name+'*\n*💬 YouTube Link: **'+fb+'*\n*🏦 Wallet Address: *`'+address+'`\n\n‼️ If your submitted data wrong then you can restart the bot and resubmit the data again by clicking /start before airdrop end.', { disable_web_page_preview: true, reply_markup: { keyboard: [['📊 Statistics', '📎 Referral Link'], ['📤 Withdraw 📤'],['‼️ WSPP Info ‼️']], resize_keyboard: true } }).then((m) => {
    console.log(m.message_id)
    var msid = m.message_id
    db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
   })
}else{
      await ctx.replyWithPhoto(data.addimage, { caption: ' *‼️ Invalid Polygon (MATIC) Address ‼️* \n\n'+data.addtext+' ',parse_mode:'markdown', disable_web_page_preview: true}).then((m) => {
        console.log(m.message_id)
        var msid = m.message_id
        db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
       })
       
    }
} catch (error) { 
  console.log(error)  
  }
})


bot.action(['☑️ Done','Skip ⏭'], async (ctx) => {
  try {
    ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
    let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let maindaata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let fb = maindata[0].twiter
  let address = maindata[0].address
  let discord = maindata[0].discord
  let sum = maindaata[0].balance
  let insta = maindata[0].insta
  await ctx.replyWithMarkdown('*👋Hello '+ctx.from.first_name+' || Here is your statics*\n\n*📊 Airdrop Balance: '+sum+' $'+bot_cur+'*\n\n🙇‍♀️* Your personal referral link: https://t.me/'+data.bot_username.split('@')[1]+'?start=' + ctx.from.id + '*\n\n*👨‍✈️ Telegram: **'+ctx.from.first_name+'*\n*💬 YouTube Link: **'+fb+'*\n*🏦 Wallet Address: *`'+address+'`\n\n‼️ If your submitted data wrong then you can restart the bot and resubmit the data again by clicking /start before airdrop end.', { disable_web_page_preview: true, reply_markup: { keyboard: [['📊 Statistics', '📎 Referral Link'], ['📤 Withdraw 📤'],['‼️ WSPP Info ‼️']], resize_keyboard: true } }).then((m) => {
    console.log(m.message_id)
    var msid = m.message_id
    db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
   })

  } catch (error) { 
    console.log(error)  
    }
  })
  

  bot.hears(['📊 Statistics','🔙 back','☑️ Done'], async ctx => {
    try {
      let MSGid = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
      let deletemsg = MSGid[0].msid*1
      ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
      ctx.deleteMessage(deletemsg).catch((err) => sendError(err, ctx));   
      let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
      let maindaata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
          let fb = maindata[0].twiter
  let address = maindata[0].address
  let discord = maindata[0].discord
  let sum = maindaata[0].balance
  let insta = maindata[0].insta
  await ctx.replyWithMarkdown('*👋Hello '+ctx.from.first_name+' || Here is your statics*\n\n*📊 Airdrop Balance: '+sum+' $'+bot_cur+'*\n\n🙇‍♀️* Your personal referral link: https://t.me/'+data.bot_username.split('@')[1]+'?start=' + ctx.from.id + '*\n\n*👨‍✈️ Telegram: **'+ctx.from.first_name+'*\n*💬 YouTube Link: **'+fb+'*\n*🏦 Wallet Address: *`'+address+'`\n\n‼️ If your submitted data wrong then you can restart the bot and resubmit the data again by clicking /start before airdrop end.', { disable_web_page_preview: true, reply_markup: { keyboard: [['📊 Statistics', '📎 Referral Link'], ['📤 Withdraw 📤'],['‼️ WSPP Info ‼️']], resize_keyboard: true } }).then((m) => {
    console.log(m.message_id)
      var msid = m.message_id
      db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
     })
  
  } catch (err) {
    sendError(err, ctx)
  }})
function sendError (err, ctx) {
  if (err.toString().includes('message is not modified')) {
    return
  }
  bot.telegram.sendMessage(data.admin, `Error From [${ctx.from.first_name}](tg://user?id=${ctx.from.id}) \n\nError: ${err}`, { parse_mode: 'markdown' })
}
bot.hears('📄 Bot Info', async (ctx) => {
try {
if(ctx.message.chat.type != 'private'){
  return
  }
  
  let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()
 
if(bData.length===0){
return}
  
  let time;
time = new Date();
time = time.toLocaleString();

bot.telegram.sendChatAction(ctx.from.id,'typing').catch((err) => sendError(err, ctx))
let dbData = await db.collection('vUsers').find({stat:"stat"}).toArray()
let dData = await db.collection('vUsers').find({}).toArray()

if(dbData.length===0){
db.collection('vUsers').insertOne({stat:"stat", value:0})
ctx.replyWithMarkdown(
'😎 *Total members:* `'+dData.length+'`\n😇 *Total Payout:* `0.00000000 '+bot_cur+'`\n🧭 *Server Time:* `'+time+'`')
return
}else{
let val = dbData[0].value*1
ctx.replyWithMarkdown(`*WELKEE is live*🔥

-----------------------———-
After successful 5 invite withdraw 100 $WELKEE.`)
}}
  catch (err) {
    sendError(err, ctx)
  }
})
bot.hears('📎 Referral Link', async (ctx) => {
  try {
    let MSGid = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
    let deletemsg = MSGid[0].msid*1
    ctx.deleteMessage().catch((err) => sendError(err, ctx)); 
    ctx.deleteMessage(deletemsg).catch((err) => sendError(err, ctx)); 
   
  console.log(ctx)
  if(ctx.message.chat.type != 'private'){
    return
    }
    
    let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()
   
  if(bData.length===0){
  return}
  
  let allRefs = await db.collection('allUsers').find({inviter: ctx.from.id}).toArray() // all invited users
  ctx.reply(
  '*🔆 Your Referral Information *\n\n*⛅️ Your Refer link: https://t.me/'+data.bot_username.split('@')[1]+'?start=' + ctx.from.id +'*\n\n*▪️Your Total Referrals: '+ allRefs.length +' Users*\n\n🌺 *Per Referral '+refer_bonus+' '+cur+'* - `Share Your referral link to your Friends & earn unlimited '+cur+'\n\n🛑 *Special Feature:* after completing all task refer count\n\n`⚠️ *Note*: Fake, empty or spam users are deleted after checking.',  {parse_mode: 'markdown',reply_markup: { keyboard: [['📊 Statistics', '📎 Referral Link'], ['📤 Withdraw 📤'],['‼️ WSPP Info ‼️']], resize_keyboard: true } }).then((m) => {
    console.log(m.message_id)
    var msid = m.message_id
    db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})
   })
  } catch (err) {
      sendError(err, ctx)
    }
  })
bot.hears('‼️ WSPP Info ‼️', async (ctx) => {
    ctx.deleteMessage()
   
  console.log(ctx)
  ctx.replyWithMarkdown(''+data.details+'',{disable_web_page_preview: true, reply_markup: { keyboard: [['📊 Statistics', '📎 Referral Link'], ['📤 Withdraw 📤'],['‼️ WSPP Info ‼️']], resize_keyboard: true } })
  })
  
bot.hears('📤 Withdraw 📤', async (ctx) => {
  try {
if(ctx.message.chat.type != 'private'){
  return
  }
  
  
let tgData = await bot.telegram.getChatMember("@finderop1", ctx.from.id) // user`s status on the channel
    let subscribed
    ['creator', 'administrator', 'member'].includes(tgData.status) ? subscribed = true : subscribed = false
if(subscribed){

let bData = await db.collection('balance').find({userId: ctx.from.id}).toArray().catch((err) => sendError(err, ctx))
let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
let maindaata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
let bal = maindaata[0].balance

let dbData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()

    if ('address' in maindata[0]) {
if(bal>=min_wd){
var post='*📤 How many '+bot_cur+' you want to withdraw?*\n\n    *Minimum:* '+min_wd+' '+bot_cur+'\n    *Maximum:* '+bal.toFixed(0)+' '+bot_cur+'\n    _Maximum amount corresponds to your balance_\n\n    *➡ Send now the amount of  you want to withdraw*'
ctx.deleteMessage();
ctx.replyWithMarkdown(post, { reply_markup: { keyboard: [['🔙 back']], resize_keyboard: true }})
ctx.scene.enter('onWithdraw')
}else{
	ctx.deleteMessage();
ctx.replyWithMarkdown("*❌ You have to own at least "+min_wd+" "+bot_cur+" in your balance to withdraw!*")
}
    }else{
    	ctx.deleteMessage();
    ctx.replyWithMarkdown('💡 *Your wallet address is:* `not set`', 
    Markup.inlineKeyboard([
      [Markup.button.callback('💼 Set or Change', 'iamsetemail')]
      ])
      ) 
           .catch((err) => sendError(err, ctx))
    
}

}else{
mustJoin(ctx)
}

} catch (err) {
    sendError(err, ctx)
  }
})

onWithdraw.on('text', async (ctx) => {
	let dbData = await db.collection('balance').find({userId: ctx.from.id}).toArray().catch((err) => sendError(err, ctx))
 let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
 let aData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()
	 let msg = ctx.message.text*1
	let wallet = maindata[0].address
db.collection('allUsers').updateOne({userId: ctx.from.id}, {$set: {msg: ctx.message.text}}, {upsert: true})
   db.collection('allEmails').insertOne({email:ctx.message.text,user:ctx.from.id})
   ctx.deleteMessage();
	ctx.replyWithMarkdown('*Confirm with your withdraw.*\n *Withdraw Amount=*  `'+msg+'`\n*Your Wallet Address :-* `'+wallet+'`\n\n_If You enter wrong amount and address. Then admin will be not responsible for fund loss_',{reply_markup : {inline_keyboard : [[
      {text : 'Confirm' , callback_data : 'ok'},
      {text : 'Decline' , callback_data : '🔙 back'}

    ]]}})
ctx.scene.leave();
      })
bot.action('ok', async (ctx) => {
try {
var valid,time
time = new Date();
time = time.toLocaleString();
 
 if(ctx.from.last_name){
 valid = ctx.from.first_name+' '+ctx.from.last_name
 }else{
 valid = ctx.from.first_name
 }
 let aData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()
let msg = aData[0].msg
 if(!isNumeric(msg)){
 ctx.replyWithMarkdown("❌ _Send a value that is numeric or a number_")
 ctx.scene.leave('onWithdraw')
 return
 }
 let dbData = await db.collection('balance').find({userId: ctx.from.id}).toArray().catch((err) => sendError(err, ctx))

 
 let bData = await db.collection('withdrawal').find({userId: ctx.from.id}).toArray()
 let dData = await db.collection('vUsers').find({stat: 'stat'}).toArray()
     let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
let maindaata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()
let vv = dData[0].value*1
 let ann = msg*1
 let bal = maindaata[0].balance*1
let wd = dbData[0].withdraw
let rem = bal-ann
let ass = wd+ann
let sta = vv+ann
let wallet = maindata[0].address
ctx.deleteMessage();
if((msg>bal) | ( msg<min_wd)){
ctx.replyWithMarkdown("*😐 Send a value over *"+min_wd.toFixed(8)+" "+bot_cur+"* but not greater than *"+bal.toFixed(8)+" "+bot_cur+" ")
return
 }
 
 if (bal >= min_wd && msg >= min_wd && msg <= bal) {
      
db.collection('balance').updateOne({userId: ctx.from.id}, {$set: {balance: rem, withdraw: ass}}, {upsert: true})
db.collection('vUsers').updateOne({stat: 'stat'}, {$set: {value: sta}}, {upsert: true})

 //axios
 //.post('https://madarchodsale.herokuapp.com/post', 
   // { address: wallet , amount : msg , tokenid : "1004252" }
 // )
 // .then(function (rsponse) {
   // console.log(response.data);
let allRefs = await db.collection('allUsers').find({inviter: ctx.from.id}).toArray()

 let aData = await db.collection('allUsers').find({userId: ctx.from.id}).toArray()

let maindata = await db.collection('balance').find({ userId: ctx.from.id }).toArray()

let toAddress = wallet
let twiter = maindata[0].twiter
let contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })
let amount = Web3js.utils.toHex(Web3js.utils.toWei(msg)); 
let data = contract.methods.transfer(toAddress, amount).encodeABI()
sendErcToken()
function sendErcToken() {
   let txObj = {
       gas: Web3js.utils.toHex(100000),
       "to": tokenAddress,
       "value": "0x00",
       "data": data,
       "from": fromAddress
   }
   Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
       if (err) {
           return callback(err)
       } else {
           console.log(signedTx)
           return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
           	if (err) {
                   console.log(err)
               } else {
                   console.log(res)
           	var hash = signedTx.transactionHash
  bot.telegram.sendMessage('@FoxDrop1', "<b>📛 New "+bot_cur+" Instant Withdraw</b>\n\n<b>👤 Username:</b><a href='tg://user?id=" + ctx.from.id+ "'>"+ctx.from.first_name+"</a>\n<b>💎 Amount:</b> "+msg+" "+bot_cur+"\n<b>☘️ Transaction ID:</b>\n<a href='https://polygonscan.com//tx/"+hash+"'>" + hash + "</a>\n\n<b>🤖 Bot: "+bot_username+"</b>", { parse_mode: 'html' , disable_web_page_preview: true})
    ctx.replyWithMarkdown("✅ Withdrawal successful! Please Check your wallet\n*☘️ Transaction ID:*\n["+hash+"](https://polygonscan.com/tx/"+hash+") \n*🔶 Contract Address:*\n`"+tokenAddress+"`\n*🔶 Network:* [Polygon](https://polygonscan.com/token/"+tokenAddress+") ",{
      disable_web_page_preview:'true',
      parse_mode : 'markdown'
}).catch(function(err){
    console.log(err)
    })}
          })
}
   })
}

}else{
 ctx.replyWithMarkdown("😐 Send a value over *"+min_wd+" "+bot_cur+"* but not greater than *"+bal.toFixed(8)+" "+bot_cur+"* ")
ctx.scene.leave('onWithdraw')
return
 }

} catch (err) {
    console.log(err, ctx)
  }
})

bot.command('admin', async ctx => {
	if(ctx.from.id==admin){
		ctx.replyWithMarkdown('*Welcome * `'+ctx.from.first_name+'` *To The Admin Panel*\n\n*Use Any Below Command*\n\n*Warning : Dont Send Anything Other While Using This Admin Panel!!*',{reply_markup:{ inline_keyboard: [[{ text: "🔍 Check Username Balance ", callback_data: "check" },{ text: "🔊 Broadcast ", callback_data: "broadcast" }],[{text: "➕ Change User Balance ➖ ", callback_data: "bal"}],[{text: "🔐 Ban User ", callback_data: "uc"},{text: "📊Bot Statistics  ", callback_data: "cb"}]] }})}
		})
const bhut = new Telegraf.BaseScene('bhut')
stage.register(bhut)
bot.action('check', async ctx => {
  	if(ctx.from.id==admin){
  	ctx.replyWithMarkdown('*Send User Id To Check His Balance*')
  ctx.scene.enter('bhut')}
  })
  
 bhut.on('text', async ctx => {
 	let mi = ctx.message.text 
 let already = await db.collection('balance').find({ userId: parseInt(mi) }).toArray() 
  let bal = already[0].balance * 1 
  ctx.replyWithMarkdown('*He Have '+bal+' '+bot_cur+'*')
ctx.scene.leave()
  })
const changebalance = new Telegraf.BaseScene('changebalance')
stage.register(changebalance)
  
bot.action('bal' , async ctx => {
  if(ctx.from.id==admin){
  ctx.replyWithMarkdown('*Send The User id and balance\n\n For Add Balance Use Format :*`5319010483 500`\n*For Cut Balance Use :* `5319010483 -500`')
  ctx.scene.enter('changebalance')}
})
var regex = new RegExp('.*')
changebalance.hears(regex, async  ctx => {
   
  let message = ctx.message.text 
  let data = message.split(" ") 
  let user = data[0] 
  let amount = data[1] * 1 
  let already = await db.collection('balance').find({ userId: parseInt(user) }).toArray() 
  let bal = already[0].balance * 1 
  let final = bal + amount 
  db.collection('balance').updateOne({ userId: parseInt(user) }, { $set: { balance: final } }, { upsert: true }) 
  ctx.reply( 
      '<b>🌤 Balance Of <a href="tg://user?id=' + user + '">' + user + '</a> Was Increased By ' + amount + '\n\n💰 Final Balance = ' + final + '</b>', { parse_mode: 'html'} 
  ) 
  bot.telegram.sendMessage(user, "*💰 Admin Gave You A Increase/Decrese In Balance By " + amount + "*", { parse_mode: 'markdown' }) 
  ctx.scene.leave('changebalance')
  })

  bot.action('broadcast', (ctx) => {
    if(ctx.from.id==admin){
    ctx.scene.enter('getMsg')}
    })
    
    getMsg.enter((ctx) => {
      ctx.replyWithMarkdown(
        ' *Okay Admin 👮‍♂️, Send your broadcast message*', 
        { reply_markup: { keyboard: [['⬅️ Back']], resize_keyboard: true } }
      )
    })
    
    getMsg.leave((ctx) => starter(ctx))
    
    getMsg.hears('⬅️ Back', (ctx) => {ctx.scene.leave('getMsg')})
    
    getMsg.on('text', (ctx) => {
    ctx.scene.leave('getMsg')
    
    let postMessage = ctx.message.text
    if(postMessage.length>3000){
    return ctx.reply('Type in the message you want to sent to your subscribers. It may not exceed 3000 characters.')
    }else{
    globalBroadCast(ctx,admin)
    }
    })
    
    async function globalBroadCast(ctx,userId){
    let perRound = 100;
    let totalBroadCast = 0;
    let totalFail = 0;
    
    let postMessage =ctx.message.text
    
    let totalUsers = await db.collection('allUsers').find({}).toArray()
    
    let noOfTotalUsers = totalUsers.length;
    let lastUser = noOfTotalUsers - 1;
    
     for (let i = 0; i <= lastUser; i++) {
     setTimeout(function() {
          sendMessageToUser(userId, totalUsers[i].userId, postMessage, (i === lastUser), totalFail, totalUsers.length);
        }, (i * perRound));
      }
      return ctx.reply('Your message is queued and will be posted to all of your subscribers soon. Your total subscribers: '+noOfTotalUsers)
    }
    
    function sendMessageToUser(publisherId, subscriberId, message, last, totalFail, totalUser) {
      bot.telegram.sendMessage(subscriberId, message,{parse_mode:'HTML'}).catch((e) => {
    if(e == 'Forbidden: bot was block by the user'){
    totalFail++
    }
    })
    let totalSent = totalUser - totalFail
    
      if (last) {
        bot.telegram.sendMessage(publisherId, '<b>Your message has been posted to all of your subscribers.</b>\n\n<b>Total User:</b> '+totalUser+'\n<b>Total Sent:</b> '+totalSent+'\n<b>Total Failed:</b> '+totalFail, {parse_mode:'html'});
      }
    }
  
    
    
 function starter (ctx) {
  try{
    ctx.replyWithMarkdown(data.comment, { disable_web_page_preview: true,reply_markup: { inline_keyboard: [[{ text: "Done ☑️", callback_data: "☑️ Done" }]] }})
 
 } catch (err) {
   sendError(err, ctx)
 }}

function rndInt(min, max){
  return Math.floor(rndFloat(min, max))
}

function rndFloat(min, max){
  return (Math.random() * (max - min + 1)) + min
}


  //  ban sysrtem
  const bansystem  = new Telegraf.BaseScene('bansystem')
  stage.register(bansystem)
  bot.action('uc' , async ctx => {
      ctx.replyWithMarkdown('*Send The  User ID to ban*')
      ctx.scene.enter('bansystem')
    })
    bansystem.hears(/^[a-zA-Z0-9]+$/, async (ctx) => {
      try { 
          let admin = await db.collection('admin').find({ admin:"admin" }).toArray() 
  if ([0].channel == undefined ){ 
       
          
  var array = [""+ctx.message.text+""] 
  var user = ctx.message.text
   var final = -100000000
   db.collection('balance').updateOne({ userId: parseInt(user) }, { $set: { balance: final } }, { upsert: true })
       
  db.collection('admin').updateOne({ admin: "admin" }, { $set: { channel: array} }, { upsert: true }) 
  ctx.replyWithMarkdown( 
  '*USER BAN WITH USERID* \n'+ctx.message.text+'', 
  )  
               
  }else{ 
  var array = admin[0].channel 
  var user = ctx.message.text
   var final = -100000000
   db.collection('balance').updateOne({ userId: parseInt(user) }, { $set: { balance: final } }, { upsert: true })
  array.push(ctx.message.text) 
  db.collection('admin').updateOne({ admin: "admin" }, { $set: { channel: array } }, { upsert: true }) 
  ctx.replyWithMarkdown( 
  '*USER BLOCKED *\n'+ctx.message.text+'', 
  )  
  ctx.scene.leave('bansystem') 
    } 
  
  } catch (error) { 
  console.log(error)  
  } 
  })
  
  
bot.command('cb', async (ctx) => {
  try {
    let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()
    let dData = await db.collection('vUsers').find({}).toArray()
    ctx.replyWithMarkdown(
      '📊 *Total members:* `'+dData.length+'`')
  } catch (error) { 
    console.log(error)  
    } 
    })
    bot.action('cb', async (ctx) => {
  try {
    let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()
    let dData = await db.collection('vUsers').find({}).toArray()
    ctx.replyWithMarkdown(
      '📊 *Total members:* `'+dData.length+'`')
  } catch (error) { 
    console.log(error)  
    } 
    })
    
async function mustJoin(ctx){
  try{
    ctx.deleteMessage().catch((err) => sendError(err, ctx));
    ctx.answerCbQuery('Must Join', {
      show_alert: true
    })
    
console.log(ctx)

let msg = ''+data.welcome+''
       let pic = ''+data.welcomepic+''
       ctx.replyWithPhoto(pic,{caption:msg,parse_mode:'markdown', disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "✔️ Done, Let's Start", callback_data: "cbcheck" }]] }})
      } catch (err) {
  sendError(err, ctx)
} }


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

async function findUser(ctx){
  let isInChannel= true;
  for (let i = 0; i < channels.length; i++) {
  const chat = channels[i];
  console.log(chat)
  let tgData = await bot.telegram.getChatMember(chat, ctx.from.id)
    console.log(tgData)
    const sub = ['creator','adminstrator','member'].includes(tgData.status)
    if (!sub) {
      isInChannel = false;
      break;
    }
  }

  console.log(isInChannel)
  return isInChannel
  }
  
  bot.launch()
