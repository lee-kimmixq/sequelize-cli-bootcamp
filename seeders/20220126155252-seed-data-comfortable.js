module.exports = {
  up: async (queryInterface) => {
    const categoriesList = [
      {
        name: 'museum',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'nature',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'restaurant',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'theme park',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      'categories',
      categoriesList,
      { returning: true },
    );

    const tripsList = [
      {
        name: 'Christmas PH',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Staycation',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      'trips',
      tripsList,
      { returning: true },
    );

    const attractionsList = [
      {
        name: 'Universal Studios',
        trip_id: 1,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'National Gallery',
        trip_id: 2,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'River Wonders',
        trip_id: 1,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Crab In Da Bag',
        trip_id: 1,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bread Street Kitchen',
        trip_id: 2,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'LAVO Rooftop Bar',
        trip_id: 1,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Gardens by the Bay',
        trip_id: 2,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Asian Civilisations Museum',
        trip_id: 2,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lee Kong Chian Natural History Museum',
        trip_id: 1,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Singapore Zoo',
        trip_id: 1,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Wild Wild Wet',
        trip_id: 2,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('attractions', attractionsList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('attractions', null, {});
    await queryInterface.bulkDelete('trips', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  },
};
