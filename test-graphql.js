const fetch = require('node-fetch');

async function testGraphQL() {
    try {
        const response = await fetch('https://drtunitski.neo-lines.bond/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        posts {
                            edges {
                                node {
                                    id
                                    title
                                    slug
                                    language {
                                        code
                                    }
                                }
                            }
                        }
                    }
                `
            })
        });

        const data = await response.json();
        console.log('GraphQL Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

testGraphQL();

