module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          age: 29,
          name: 'Noelle Hines',
          email: 'noellehines@cosmetex.com',
          weight: 94.6,
          height: 1.73,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          age: 27,
          name: 'Madge Vazquez',
          email: 'madgevazquez@cosmetex.com',
          weight: 92.2,
          height: 1.66,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          age: 37,
          name: 'Morse Meyers',
          email: 'morsemeyers@cosmetex.com',
          weight: 97.2,
          height: 1.73,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          age: 20,
          name: 'Johnson Peck',
          email: 'johnsonpeck@cosmetex.com',
          weight: 98,
          height: 1.73,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          age: 34,
          name: 'Regina Ray',
          email: 'reginaray@cosmetex.com',
          weight: 77.8,
          height: 1.83,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
