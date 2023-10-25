"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    // */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          names: "John Doe",
          lastnames: "Doe",
          birthdate: "1990-10-10",
          cuit: "20-12345678-9",
          residence: "Buenos Aires",
          cellphone: "123456789",
          email: "jhon.doe@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          names: "Jane Doe",
          lastnames: "Doe",
          birthdate: "1990-10-10",
          cuit: "20-12345678-9",
          residence: "Buenos Aires",
          cellphone: "123456789",
          email: "jane.doe@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          names: "Laura",
          lastnames: "Gomez",
          birthdate: "1990-10-10",
          cuit: "20-12345678-9",
          residence: "Buenos Aires",
          cellphone: "123456789",
          email: "laura.gomez@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
