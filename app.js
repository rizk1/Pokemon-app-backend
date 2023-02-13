const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const http = require('http')
const app = express();

const server = http.createServer(app)
app.use(helmet());
app.use(morgan('tiny'));
const corsOptions = {
	origin: '*',
	allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
	credentials: true,
	enablePreflight: true
}
app.use(
	cors(corsOptions)
);
app.options('*', cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res, next) => {
	try {
		res.json({
			status: 'success',
			message: 'Welcome',
		});
	} catch (err) {
		return next(err);
	}
});

const routes = require('./src/routes/pokemonRoute')
app.use(routes)

//404 error
app.get('*', function (req, res) {
	res.status(404).json({
		message: 'Page Not Found',
	});
});

// Run the server
const port = process.env.PORT || 3001;
server.listen(port, () =>
	console.log(`app listening on http://localhost:${port}`)
);