import db from './models/index.mjs';

const COMMAND = process.argv[2];
const VALUES = process.argv.slice(3);

/* FUNCTIONS:
* CREATE NEW TRIP: node index.mjs create <trip>
* ADD ATTRACTION: node index.mjs add-attrac <trip> <attraction> <category>
* GET TRIP DETAILS: node index.mjs trip <trip>
* CREATE NEW CATEGORY: node index.mjs add-category <category>
* GET ATTRACTIONS IN TRIP WITH CATEGORY: node index.mjs category-trip <trip> <category>
* GET ATTRACTIONS FROM ALL TRIPS FROM CATEGORY: node index.mjs category-attractions <category>
*/

const funcObj = {
  create: (input) => {
    db.Trip.create({
      name: input[0],
      created_at: Date.now(),
      updated_at: Date.now(),
    })
      .then((trip) => {
        console.log('trip created!');
        console.log(trip);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'add-attrac': (input) => {
    // CAN SIMPLIFY????
    let retTripId;
    db.Trip.findOne({
      where: {
        name: input[0],
      },
    })
      .then((retTrip) => {
        retTripId = retTrip.id;
        return db.Category.findOne({
          where: {
            name: input[2],
          },
        });
      })
      .then((retCty) => db.Attraction.create({
        name: input[1],
        tripId: retTripId,
        created_at: Date.now(),
        updated_at: Date.now(),
        categoryId: retCty.id,
      }))
      .then((retAttr) => {
        console.log('attraction added to trip!');
        console.log('attraction id:', retAttr.id);
        console.log('trip id of attraction:', retAttr.tripId);
        console.log('category id of attraction:', retAttr.categoryId);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  trip: (input) => {
    db.Trip.findOne({
      where: {
        name: input[0],
      },
    })
      .then((retTrip) => retTrip.getAttractions())
      .then((attractions) => console.log(attractions.map((attraction) => attraction.name)))
      .catch((error) => {
        console.log(error);
      });
  },
  'add-category': (input) => {
    db.Category.create({
      name: input[0],
      created_at: Date.now(),
      updated_at: Date.now(),
    })
      .then((category) => {
        console.log('category created!');
        console.log(category);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'category-trip': (input) => {
    db.Trip.findOne({
      where: {
        name: input[0],
      },
    })
      .then((retTrip) => retTrip.getAttractions({
        where: {
          // TODO
        },
      }))
      .catch((error) => {
        console.log(error);
      });
  },
};

if (!(COMMAND in funcObj)) {
  console.log('invalid command!');
  process.exit();
}

funcObj[COMMAND](VALUES);
