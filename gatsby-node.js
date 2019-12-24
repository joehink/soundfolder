/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `SoundsCsv`) {
        const slug = `/${node.title.toLowerCase().replace(' ', '_')}_${node.id}`;
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
                    fields {
                        slug
                    }
                }
            }
        }
    `);
    
    result.data.allSoundsCsv.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/sound.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.fields.slug,
            },
        });
    });
}
