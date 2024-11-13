import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
const PORT = process.env.PORT || 8000;

// Set up CORS to allow requests only from your Netlify frontend
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://your-netlify-site.netlify.app'); // Replace with your Netlify URL
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true'); // Enable if you're using credentials
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.db = router.db;

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600,
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
