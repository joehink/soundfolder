module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
        resolve: 'gatsby-plugin-lunr',
        options: {
            languages: [{ name: 'en' }],
            fields: [
                { name: 'id', store: true },
                { name: 'title', store: true, attributes: { boost: 20 } },
                { name: 'description', store: true, attributes: { boost: 5 }},
                { name: 'categories', store: true },
                { name: 'mp3', store: true },
                { name: 'wav', store: true },
                { name: 'fields', store: true },
            ],
            resolvers: {
                SoundsCsv: {
                    id: node => node.id,
                    title: node => node.title,
                    description: node => node.description,
                    categories: node => node.categories,
                    mp3: node => node.mp3,
                    wav: node => node.wav,
                    fields:  node => ({ slug: node.fields.slug })
                }
            },
            filename: 'search_index.json',
        }
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `data`,
          path: `${__dirname}/src/data/`,
        },
    },
    `gatsby-transformer-csv`,
    `gatsby-plugin-sass`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
