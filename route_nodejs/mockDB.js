const User = [
  { id: 1, name: "Dinh", age: 12 },
  { id: 2, name: "Dinh3", age: 32 },
];

module.exports = {
  findAllUser: async () => User,
  findById: async (id) => {
    return User.find((user) => user.id === Number(id));
  },
};
