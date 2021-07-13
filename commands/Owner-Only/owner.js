
const { Message } = require('discord.js')

module.exports = {
    name : 'dev',

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
message.channel.send(`my owner is Lina.#6666`)
    }
}