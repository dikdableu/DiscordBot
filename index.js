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
            if(args.length <= 0)
            {
                (async () => {
                    const browser = await puppeteer.launch({
                        "headless": true,
                        "executablePath": '/usr/bin/chromium',
                        "args": [
                            '--no-sandbox',
                            '--disable-gpu',
                        ]
                    })
                    const page = await browser.newPage();
                    await page.goto('https://nomanssky.fandom.com/fr/wiki/Recettes_de_raffinerie');
                    let urls1 = await page.evaluate(() => {
                        console.log(document)
                        console.log('test')
                        headings_elements_table1 = document.querySelectorAll('td')
                        console.log('debug')
                        headings_array_table1 = Array.from(headings_elements_table1); 
                        headings_array_table1.map(heading => {
                            var tmpString = heading.textContent
                            var tmpStringModify = tmpString.replace('\n', ' ')
                            return tmpStringModify;
                        });
                    });
                    let urls2 = await page.evaluate(() => {
                        headings_elements_table1 = document.querySelectorAll('table:nth-child(2) tbody tr td ');
                        console.log('debug1')
                        headings_array_table1 = Array.from(headings_elements_table1); 
                        headings_array_table1.map(heading => {
                            console.log(heading.textContent)
                            var tmpString = heading.textContent
                            var tmpStringModify = tmpString.replace('\n', '')
                            return tmpStringModify;
                        });
                    });
                    let urls3 = await page.evaluate(() => {
                        headings_elements_table1 = document.querySelectorAll('table:nth-child(3) tbody tr td');
                        console.log('debug2')
                        headings_array_table1 = Array.from(headings_elements_table1); 
                        headings_array_table1.map(heading => {
                            console.log(heading.textContent)
                            var tmpString = heading.textContent
                            var tmpStringModify = tmpString.replace('\n', '')
                            return tmpStringModify;
                        });
                    });
                    console.log(urls1)
                    message.reply("Recettes à un composant : \n \n" + urls1);
                    message.reply("Recettes à deux composant : \n \n" + urls2);
                    message.reply("Recettes à trois composant : \n \n " + urls3);
                    await browser.close();
                  })();
            }else{
                (async () => {
                    const browser = await puppeteer.launch({
                        "headless": true,
                        "executablePath": '/usr/bin/chromium',
                        "args": [
                            '--no-sandbox',
                            '--disable-gpu',
                        ]
                    })
                    const page = await browser.newPage();
                    await page.goto('https://nomanssky.fandom.com/fr/wiki/'+args);
                    console.log(page.querySelector('td:first-child > a:last-child').textContent)
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
