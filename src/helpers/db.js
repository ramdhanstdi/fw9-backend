const {Pool} = require('pg');

const {DATABASE_URL: connectionString} = process.env;

const db = new Pool({
  connectionString
});
// const Query = require('pg').Query;
// const submit = Query.prototype.submit;
// Query.prototype.submit = function() {
//   const text = this.text;
//   const values = this.values;
//   const query = values.reduce((q, v, i) => q.replace(`$${i + 1}`, v), text);
//   console.log(query);
//   submit.apply(this, arguments);
// };

module.exports = db;