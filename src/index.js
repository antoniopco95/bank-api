const app = require('./servidor');
const routes = require('./routes');

app.use(routes);

app.listen(3000);
