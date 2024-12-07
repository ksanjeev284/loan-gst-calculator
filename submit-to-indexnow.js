import https from 'https';

const data = JSON.stringify({
  "host": "paisafinance.fun",
  "key": "08562bacba794ea1b05aed31867ae86f",
  "keyLocation": "https://paisafinance.fun/08562bacba794ea1b05aed31867ae86f.txt",
  "urlList": [
    "https://paisafinance.fun/",
    "https://paisafinance.fun/loan-emi",
    "https://paisafinance.fun/gst",
    "https://paisafinance.fun/tax",
    "https://paisafinance.fun/loan-comparison",
    "https://paisafinance.fun/privacy-policy",
    "https://paisafinance.fun/terms"
  ]
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
