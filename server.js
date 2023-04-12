const app = require('./app');
const port = process.env.PORT || 4000;


//Listen to port
app.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Listening on port ${port}`);
    }
  });
  