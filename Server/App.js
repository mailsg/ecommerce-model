const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
const port = process.env.port || 3000;
app.use(express.json());

/** GET Route to fetch products from the products.json file */
app.get('/products', (req, res) => {
  
  fs.readFile('products.json', 'utf8', (err, data) => {
    
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const products = JSON.parse(data);
    res.json(products);

  });
});

/** POST Route to write purchase to the purchase.json file */
app.post('/purchase', (req, res) => {
  
  const productData = req.body;

  fs.readFile('purchase.json', 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let purchases = [];

    if (data) {
      try {
        purchases = JSON.parse(data);
      } catch (jsonParseError) {
        console.error(jsonParseError);
        return res.status(500).json({ error: 'JSON Parse Error' });
      }
    }

    purchases.push({ ...productData, timestamp: new Date() });

    fs.writeFile('purchase.json', JSON.stringify(purchases), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Item purchased successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
