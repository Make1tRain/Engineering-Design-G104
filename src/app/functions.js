const http = require("http");

const get = (ip, port, barcode) => {
    let type;
    http.get(`http://${ip}:${port}/products/${barcode}`, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          type = JSON.parse(data).explanation;
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}

module.exports = {get};