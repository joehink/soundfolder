/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `SoundsCsv`) {
        const slug = `/${node.title.toLowerCase().split(' ').join('_')}_${node.id}`;
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allSoundsCsv {
                nodes {
                    title
                    categories
                    fields {
                        slug
                    }
                }
            }
        }
    `);

    // create page for each category
    result.data.allSoundsCsv.nodes
        .flatMap(sound => sound.categories.split(','))
        .reduce((uniqueCategories, category) => 
            uniqueCategories.includes(category) ? uniqueCategories : [...uniqueCategories, category], [])
        .forEach(category => {
            createPage({
                path: category,
                component: path.resolve(`./src/templates/category.js`),
                context: {
                    category,
                    categoryRegex: `/${category}/`
                }
            })
        })


    // Page for each sound
    result.data.allSoundsCsv.nodes.forEach(sound => {
        createPage({
            path: sound.fields.slug,
            component: path.resolve(`./src/templates/sound.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: sound.fields.slug,
            },
        });
    });
}
