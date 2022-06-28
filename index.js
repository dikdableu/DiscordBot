const Discord = require("discord.js");
const config = require("./config.json");
const puppeteer = require('puppeteer');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const prefix = "!";

client.login(config.BOT_TOKEN);

client.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;      
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case "help":
            
            break;
        case "recettes":
            if(!args)
            {
                (async () => {
                    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    });
                    const page = await browser.newPage();
                    await page.goto('https://nomanssky.fandom.com/fr/wiki/Recettes_de_raffinerie');
                    let urls = await page.$$eval('.toc tbody > tr', links => {
                        result = links.filter(link => {
                            return link.querySelector('td:first-child > a:last-child').textContent + " -> " + link.querySelector('td:last-child > a:last-child').textContent;
                        });
                        return result;
                    });
                    console.log(urls)
                    message.reply("ceci est un test : \n " + urls);
                    await browser.close();
                  })();
            }else{
                (async () => {
                    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    });
                    const page = await browser.newPage();
                    await page.goto('https://nomanssky.fandom.com/fr/wiki/'+args);
                    await page.screenshot({path: 'example.png'});
                  
                    await browser.close();
                  })();
            }
            break;
        case "help":
            
            break;
        default:
            message.reply(`C'est bizarre je n'ai pas reconnu cette commande ..... essayez de faire !help pour connaitre toutes les commandes disponible`);
            break;
    }
}); 
