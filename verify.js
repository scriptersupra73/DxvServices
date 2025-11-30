const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Link your account for verification'),

  async execute(interaction) {
    // Build URLs from your environment variables
    const verifyUrl = `${process.env.VERIFY_URL}?user=${interaction.user.id}`;
    const tutorialUrl = 'https://www.youtube.com/watch?v=ToltKa0eLd0';

    // Embed message
    const embed = new EmbedBuilder()
      .setTitle('Verification Required')
      .setDescription(`To verify with **DXV'S SERVICES|V2|**, click the button below.`)
      .setColor(0x5865F2);

    // Buttons
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Verify with DXV'S SERVICES|V2|")
        .setStyle(ButtonStyle.Link)
        .setURL(verifyUrl),
      new ButtonBuilder()
        .setLabel('Stuck? See a Tutorial')
        .setStyle(ButtonStyle.Link)
        .setURL(tutorialUrl)
    );

    // Reply publicly once
    await interaction.reply({
      embeds: [embed],
      components: [row],
      flags: 0, // 0 = public
    });
  },
};
