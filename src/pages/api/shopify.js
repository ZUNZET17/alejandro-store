// pages/api/fetch-orders.js

export default async function handler(req, res) {
  const SHOPIFY_STORE_URL = "https://alejandro-test-123.myshopify.com/admin/api/2021-07/graphql.json";
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  const fetchGraphQLData = async () => {
    const graphQLQuery = `
      {
        orders(first: 10) {
          edges {
            node {
              id
              createdAt
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    image {
                      url
                    }
                    customAttributes {
                      key
                      value
                    }
                    variant {
                      image {
                        originalSrc
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://alejandro-test-123.myshopify.com/admin/api/2021-07/graphql.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': "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",
      },
      body: JSON.stringify({ query: graphQLQuery }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error('Failed to fetch data from Shopify:', data.errors);
    }

    return data.data;
  };

  try {
    const data = await fetchGraphQLData();
    res.status(200).json(data.orders.edges);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from Shopify' });
  }
}
