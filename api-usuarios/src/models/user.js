let users = [
    { id: 1, name: 'Juan Perez', email: 'juan.perez@example.com' }
];

const getUsers = () => users;

const getUserById = (id) => users.find(user => user.id === id);

const createUser = (user) => {
    const newUser = { id: users.length + 1, ...user };
    users.push(newUser);
    return newUser;
};

const updateUser = (id, user) => {
    let index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { id, ...user };
    return users[index];
};

const deleteUser = (id) => {
    let index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
