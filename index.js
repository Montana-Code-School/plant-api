const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();

const Plant =  require("./server/models/plant.js");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

mongoose.connect('mongodb://localhost:27017/plants', { useNewUrlParser: true});
mongoose.Promise = global.Promise;

// connection error handling
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware
router.use((req, res, next) => {
  console.log("This is happening!");
  next();
});

router.get('/test', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

const plantPostValidator = (body) => {
    let valid = true;
    let error = {}
    // make post validator
}

router.route('/plants')
  .post((req, res) => {
    let plant = new Plant();
    for (let key in req.body) {
      plant[key] = req.body[key];
    }
    plant.save((err, plant) => {
      if (err)
        res.send(err);
      res.json({
        message: "Plant Saved",
        plant
      });
    });
  })
  .get((req, res) => {
    Plant.find((err, plants) => {
      if (err)
        res.send(err);
      res.json({
        plants
      });
    });
  })

  router.route('/plants/:plant_id')
    .get((req, res) => {
      Plant.findById(req.params.plant_id, (err, plant) => {
        if (err)
          res.send(err);
        res.json({
          message: "Plant Found!",
          plant
        });
      });
    })
    .put(function(req, res) {
      Plant.findById(req.params.plant_id, (err, plant) => {
        if (err)
          res.send(err);
        for (key in req.body) {
          plant[key] = req.body[key];
        }

        plant.save((err, plant) => {
          if (err)
            res.send(err);
          res.json({
            message: "Plant Updated!",
            plant
          });
        });
      });
    })

app.use('/api', router);

app.set('port', (process.env.PORT || 3000));

// start the serve
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
