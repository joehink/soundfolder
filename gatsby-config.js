module.exports = {
  siteMetadata: {
    title: `SoundFolder.com`,
    description: `SoundFolder is a growing library of free sound effects with categories ranging from ordinary to cinematic. Royalty-free, open-source sound effects. No attribution required.`,
    author: `SoundFolder`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-155327149-1"
        },
    },
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
        name: `SoundFolder`,
        short_name: `SoundFolder`,
        start_url: `/`,
        background_color: `#FAFAFA`,
        theme_color: `#008457`,
        display: `standalone`,
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
                { name: 'file_name', store: true },
                { name: 'fields', store: true },
            ],
            resolvers: {
                SoundsCsv: {
                    id: node => node.id,
                    title: node => node.title,
                    description: node => node.description,
                    categories: node => node.categories,
                    file_name: node => node.file_name,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
