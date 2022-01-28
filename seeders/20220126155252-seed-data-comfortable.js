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
        latitude: 1.2567631040786877,
        longitude: 103.82123147491468,
      },
      {
        name: 'National Gallery',
        trip_id: 2,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.2903825907896405,
        longitude: 103.85146305386165,
      },
      {
        name: 'River Wonders',
        trip_id: 1,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.4032978765912616,
        longitude: 103.79068392177773,
      },
      {
        name: 'Chomp Chomp Food Centre',
        trip_id: 1,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.3643805601262209,
        longitude: 103.86638984036652,
      },
      {
        name: 'Bread Street Kitchen',
        trip_id: 2,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.2827187912785645,
        longitude: 103.8575932133771,
      },
      {
        name: 'LAVO Rooftop Bar',
        trip_id: 1,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.282578312842017,
        longitude: 103.85998711337697,
      },
      {
        name: 'Gardens by the Bay',
        trip_id: 2,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.2816970128869989,
        longitude: 103.86359174036684,
      },
      {
        name: 'Asian Civilisations Museum',
        trip_id: 2,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.2875612558231662,
        longitude: 103.8513646403668,
      },
      {
        name: 'Lee Kong Chian Natural History Museum',
        trip_id: 1,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.301517960681238,
        longitude: 103.77343372616018,
      },
      {
        name: 'Singapore Zoo',
        trip_id: 1,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.404362777732663,
        longitude: 103.79305089756485,
      },
      {
        name: 'Wild Wild Wet',
        trip_id: 2,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
        latitude: 1.3776439306085793,
        longitude: 103.95429198269645,
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
