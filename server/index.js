require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "image",
           "name",
           "price",
           "productId",
           "shortDescription"
    from "products"
  `;
  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.json(products);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  const sql = `
  select *
  from "products"
  where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({
          error: `Cannot find product with productId ${productId}`
        });
      } else {
        res.json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    const sql = `
    select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1
  `;
    const param = [req.session.cartId];
    return (
      db.query(sql, param)
        .then(result => {
          const checkItem = result.rows;
          res.json(checkItem);
        })
        .catch(err => next(err))
    );
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (parseInt(productId, 10) <= 0) {
    return res.status(400).json({
      error: 'productId must be positive integer'
    });
  }
  const sql = `
  select "price"
  from "products"
  where "productId" = $1
  `;
  const param = [productId];
  db.query(sql, param)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        throw new ClientError('Doesnt work', 400);
      }
      const newSql = `
      insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"
      `;
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: product.price
        };
      } else {
        return db.query(newSql)
          .then(result => {
            const cart = result.rows[0];
            return {
              price: product.price,
              cartId: cart.cartId
            };
          });
      }
    })

    .then(result => {
      req.session.cartId = result.cartId;
      const cartItemSql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;
      const param1 = [req.session.cartId, req.body.productId, result.price];
      return db.query(cartItemSql, param1)
        .then(result => {
          const cartItemId = result.rows[0];
          return cartItemId;
        });
    })
    .then(result => {
      const allCartSql = `
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1
      `;
      const param2 = [result.cartItemId];
      return db.query(allCartSql, param2)
        .then(productData => {
          res.status(201).json(productData.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'cartId is missing.' });
  }
  if (!req.body.name) {
    return res.status(400).json({ error: 'name is required.' });
  }
  if (!req.body.creditCard) {
    return res.status(400).json({ error: 'creditCard is required.' });
  }
  if (!req.body.shippingAddress) {
    return res.status(400).json({ error: 'shippingAddress is required.' });
  }
  const sql = `
  insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
  values ($1, $2, $3, $4)
  returning *
  `;
  const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, params)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({
      error: 'product Id must be a positive number'
    });
  }
  const sqlDelete = `
    delete from "cartitems"
    where "cartItemId" = $1
    returning *
  `;
  const params = [productId];
  db.query(sqlDelete, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({
          error: `Cannot find product with "productId" ${productId}`
        });
      } else {
        res.status(204).json(product);
      }
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
