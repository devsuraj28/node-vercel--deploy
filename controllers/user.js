const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,'data.json'), 'utf-8'));
const users = data.users;

exports.createUsers= (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
}

exports.getAllUsers = (req, res) => {
    res.json(users);
}

exports.getUserByID = (req, res) => {
    const id = +req.params.id;
    const user = users.find(p => p.id === id);
    res.json(user);
};

exports.replaceUser= (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(p => p.id === id);
    users.splice(userIndex, 1, { id: id, ...req.body });
    res.status(202).json({ 'msg': "User Updated Successfully" });
};

exports.updateUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(p => p.id === id);
    const user = users[userIndex];
    users.splice(userIndex, 1, { ...user, ...req.body });
    res.status(202).json({ 'data': users[userIndex], 'msg': "User Details Updated Successfully" });
};

exports.deleteUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex(p => p.id === id);
    const user = users[userIndex];
    users.splice(userIndex, 1);
    res.json({ 'data': user, 'msg': "User Deleted Successfully" });
};
