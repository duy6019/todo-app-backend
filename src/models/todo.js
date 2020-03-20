const shortid = require('shortid');
const db = require('../db');
/**
 * Insert todo to database
 * @todo {id,title}
 */
exports.insert = todo => {
  const addTodo = { ...todo, completed: false, id: shortid() };
  db.get('todos')
    .push(addTodo)
    .write();
  return addTodo;
};
/**
 * Delete todo by Id
 * @param {todo}
 * @return {todo || false}
 */
exports.update = todo => {
  let todoIdx = db
    .get('todos')
    .findIndex(t => t.id === todo.id)
    .value();
  if (todoIdx !== -1) {
    let updated = db
      .get('todos')
      .find({ id: todo.id })
      .assign({ ...todo })
      .write();
    return updated;
  } else {
    return false;
  }
};
/**
 * Delete todo by Id
 * @param {id:number}
 * @return {boolean}
 */
exports.deleteById = id => {
  const todoIdx = db
    .get('todos')
    .findIndex(t => t.id === id)
    .value();
  if (todoIdx === -1) {
    return false;
  } else {
    db.get('todos')
      .remove({ id: id })
      .write();
    return true;
  }
};
/**
 * find All todos
 * @params {completed}
 * @return {list}
 */
exports.findAll = params => {
  if (!params) {
    return db.get('todos').value();
  } else {
    const { completed } = params;
    let todoList = db
      .get('todos')
      .filter(p => p.completed === completed)
      .value();
    return todoList;
  }
};

/**
 * Clear completed todo
 * @return {true||false}
 */

exports.clearCompleted = () => {
  db.get('todos')
    .remove({ completed: true })
    .write();
  let todoList = db.get('todos').value();
  return todoList;
};
