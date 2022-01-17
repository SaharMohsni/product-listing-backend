const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

const db = router.db.getState();
const items = db.items;

var itemsTags = [];
var itemsTypes = [];

const getAllTags = () => {
	items.forEach((element) => {
		element.tags.forEach((tag) => {
			!itemsTags.includes(tag) && itemsTags.push(tag);
		});
	});
};

const getAllTypes = () => {
	items.forEach((element) => {
		!itemsTypes.includes(element.itemType) && itemsTypes.push(element.itemType);
	});
};

(function() {
	getAllTags();
	getAllTypes();
})();


/**** Apis added that we don't need to fetch all products : huge number of products ****/

// Products total count
server.get('/total-items-count', (req, res, next) => {
	var itemsCount = db.items.length;
	res.jsonp(itemsCount);
});

// Products types count
server.get('/products-types', (req, res) => {
	res.jsonp(itemsTypes);
});

// Products tags count
server.get('/tags', (req, res) => {
	res.jsonp(itemsTags);
});

/**********************************************/

server.use(router);

server.listen(4000, () => {
	console.log('JSON Server is running');
});
