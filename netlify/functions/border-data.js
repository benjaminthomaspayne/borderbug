exports.handler = async (event) => {
  // Get the URL from query parameters
  const targetUrl = event.queryStringParameters.url;
  
  if (!targetUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL parameter is required' })
    };
  }

  try {
    // Fetch the data from the target URL
    const response = await fetch(targetUrl);
    const data = await response.text();
    
    // Return the data with CORS headers
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': response.headers.get('content-type') || 'text/plain'
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch data',
        message: error.message 
      })
    };
  }
};
