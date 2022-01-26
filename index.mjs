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

const queryDb = {
  create: (input) => {
    db.Trip.create({
      name: input[0],
      created_at: Date.now(),
      updated_at: Date.now(),
    })
      .then((trip) => {
        console.log(`new trip created! \n trip name: ${trip.name} \n trip id: ${trip.id}`);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'add-attrac': (input) => {
    const getTrip = db.Trip.findOne({ where: { name: input[0] } });
    const getCty = db.Category.findOne({ where: { name: input[2] } });
    Promise.all([getTrip, getCty])
      .then(([retTrip, retCty]) => db.Attraction.create({
        name: input[1],
        tripId: retTrip.id,
        created_at: Date.now(),
        updated_at: Date.now(),
        categoryId: retCty.id,
      }))
      .then((attraction) => {
        console.log(`attraction added to trip! \n attraction id: ${attraction.id} \n trip id: ${attraction.tripId} \n category id: ${attraction.categoryId}`);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  trip: (input) => {
    db.Trip.findOne({ where: { name: input[0] } })
      .then((retTrip) => retTrip.getAttractions())
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'add-category': (input) => {
    db.Category.create({
      name: input[0],
      created_at: Date.now(),
      updated_at: Date.now(),
    })
      .then((category) => {
        console.log(`new category created! \n category name: ${category.name} \n category id: ${category.id}`);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'category-trip': (input) => {
    const getTrip = db.Trip.findOne({ where: { name: input[0] } });
    const getCty = db.Category.findOne({ where: { name: input[1] } });
    Promise.all([getTrip, getCty])
      .then(([retTrip, retCty]) => retTrip.getAttractions({ where: { categoryId: retCty.id } }))
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'category-attractions': (input) => {
    db.Category.findOne({ where: { name: input[0] } })
      .then((category) => category.getAttractions())
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
};

if (!(COMMAND in queryDb)) {
  console.log('invalid command!');
  process.exit();
}

queryDb[COMMAND](VALUES);
