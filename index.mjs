import pkg from 'sequelize';
import db from './models/index.mjs';

const { Op } = pkg;

const COMMAND = process.argv[2];
const VALUES = process.argv.slice(3);

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

/* FUNCTIONS:
* CREATE NEW TRIP: node index.mjs create <trip>
* ADD ATTRACTION: node index.mjs add-attrac <trip> <attraction> <category> <latitude> <longitude>
* GET TRIP DETAILS: node index.mjs trip <trip>
* CREATE NEW CATEGORY: node index.mjs add-category <category>
* GET ATTRACTIONS IN TRIP WITH CATEGORY: node index.mjs category-trip <trip> <category>
* GET ATTRACTIONS FROM ALL TRIPS FROM CATEGORY: node index.mjs category-attractions <category>
* GET ATTRACTION IN DIRECTION: node index.mjs get-attractions-from <trip> <latitude> <longitude> <direction>
* GET ATTRACTIONS WITHIN 10KM: node index.mjs get-attractions-within <trip> <latitude> <longitude>
*/

const queryDb = {
  create: ([tripName]) => {
    db.Trip.create({
      name: tripName,
      created_at: Date.now(),
      updated_at: Date.now(),
    })
      .then((trip) => {
        console.log(`new trip created! \n trip name: ${trip.name} \n trip id: ${trip.id}`);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'add-attrac': ([tripName, attrName, catName, latVal, longVal]) => {
    const getTrip = db.Trip.findOne({ where: { name: tripName } });
    const getCty = db.Category.findOne({ where: { name: catName } });
    Promise.all([getTrip, getCty])
      .then(([retTrip, retCty]) => db.Attraction.create({
        name: attrName,
        tripId: retTrip.id,
        created_at: Date.now(),
        updated_at: Date.now(),
        categoryId: retCty.id,
        latitude: latVal,
        longitude: longVal,
      }))
      .then((attraction) => {
        console.log(`attraction added to trip! \n attraction id: ${attraction.id} \n trip id: ${attraction.tripId} \n category id: ${attraction.categoryId} lat/long: ${attraction.latitude}, ${attraction.longitude}`);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  trip: ([tripName]) => {
    db.Trip.findOne({ where: { name: tripName } })
      .then((retTrip) => retTrip.getAttractions())
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'add-category': ([catName]) => {
    db.Category.create({
      name: catName,
      created_at: Date.now(),
      updated_at: Date.now(),
    })
      .then((category) => {
        console.log(`new category created! \n category name: ${category.name} \n category id: ${category.id}`);
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'category-trip': ([tripName, catName]) => {
    const getTrip = db.Trip.findOne({ where: { name: tripName } });
    const getCty = db.Category.findOne({ where: { name: catName } });
    Promise.all([getTrip, getCty])
      .then(([retTrip, retCty]) => retTrip.getAttractions({ where: { categoryId: retCty.id } }))
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'category-attractions': ([catName]) => {
    db.Category.findOne({ where: { name: catName } })
      .then((category) => category.getAttractions())
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      })
      .catch((error) => console.log(error));
  },
  'get-attractions-from': ([tripName, latVal, longVal, direction]) => {
    db.Trip.findOne({ where: { name: tripName } })
      .then((retTrip) => {
        let latObj;
        let longObj;
        if (direction === 'north') {
          latObj = { [Op.gte]: latVal };
        } else if (direction === 'south') {
          latObj = { [Op.lte]: latVal };
        } else if (direction === 'east') {
          longObj = { [Op.gte]: longVal };
        } else if (direction === 'west') {
          longObj = { [Op.lte]: longVal };
        }
        return retTrip.getAttractions({
          where: {
            latitude: latObj || { [Op.not]: null },
            longitude: longObj || { [Op.not]: null },
          },
        });
      })
      .then((attractions) => {
        console.log(attractions.map((attraction) => attraction.name));
        db.sequelize.close();
      });
  },
  'get-attractions-within': ([tripName, latVal, longVal]) => {
    db.Trip.findOne({ where: { name: tripName } })
      .then((retTrip) => retTrip.getAttractions())
      .then((attractions) => {
        const filAttrArr = attractions.filter((attraction) => getDistanceFromLatLonInKm(latVal, longVal, attraction.latitude, attraction.longitude) <= 10);
        console.log(filAttrArr.map((filAttr) => filAttr.name));
        db.sequelize.close();
      });
  },
};

if (!(COMMAND in queryDb)) {
  console.log('invalid command!');
  process.exit();
}

queryDb[COMMAND](VALUES);
