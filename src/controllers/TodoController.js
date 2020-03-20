const { insert, update, deleteById, findAll, clearCompleted } = require('../models/todo');

exports.createTodo = (req, res) => {
  const todo = req.body;
  const inserted = insert(todo);
  res.status(200).json(inserted);
};
exports.updateTodo = (req, res) => {
  const todo = req.body;
  const updated = update(todo);
  if (updated) {
    res.status(200).json(updated);
  } else {
    res.status(400).send('Update False');
  }
};

exports.deleteTodo = (req, res) => {
  let { id } = req.body;
  const deleted = deleteById(id);
  if (deleted) {
    res.status(200).json({ delete: deleted });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.getTodoList = (req, res) => {
  let { completed } = req.body;
  if (completed != undefined) {
    if (typeof completed !== 'boolean' && completed !== 'true' && completed !== 'false') {
      res.status(400).send('Bad Request');
    } else {
      completed = completed === true || completed === 'true' ? true : false;
      let todos = findAll({ completed: completed });
      res.status(200).json(todos);
    }
  } else {
    let todos = findAll();
    res.status(200).json(todos);
  }
};

exports.clearCompleted = (_, res) => {
  const clear = clearCompleted();
  res.status(200).json(clear);
};
