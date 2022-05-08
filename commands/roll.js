const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription(`Roll a set of dice.`)
        .addStringOption((option) => option.setName('die').setDescription('Number and type of dice to roll.').setRequired(true))
        .addBooleanOption((option) => option.setName('advantage').setDescription('Roll two dice for advantage/disadvantage.')),

    run: async ({ client, interaction }) => {
        let text = interaction.options.getString('die');

        if (!text.includes('d')) return interaction.editReply('Incorrect usage. Try [n]d[m] instead.');

        const params = text.split('d');
        let rolls = [];
        const num = parseInt(params[0]);
        const type = parseInt(params[1]);
        let result = 0;

        for(let i = 0; i < num; i++) {
            let roll = Math.floor(Math.random() * type+1);
            rolls.push(roll);
            result += roll;
        }

        const rollList = rolls.join(" + ");

        return interaction.editReply(`${interaction.user.tag} rolled \`${text}\`\n\nResult: \`${rollList} = ${result}\``);
    }
}