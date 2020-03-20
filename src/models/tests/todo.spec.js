const { insert, deleteById, update, findAll, clearCompleted, todos } = require('../todo');
describe('Test todo model', () => {
  it('should create todo and insert todo', () => {
    const inserted = insert({ title: '1 Todo' });
    expect.assertions(3);
    expect(inserted).toEqual({ id: inserted.id, title: '1 Todo', completed: false });
    expect(todos.length).toEqual(1);
    expect(todos[0]).toEqual({ id: inserted.id, title: '1 Todo', completed: false });
  });

  it('should update todo and return one', () => {
    const updated = update({ id: 1, title: '2 Todo' });
    expect.assertions(3);
    expect(todos[0]).toEqual(updated);
    expect(updated.title).toEqual('2 Todo');
    expect(updated.completed).toEqual(false);
  });

  it('should return false if not found todo id', () => {
    const updated = update({ id: 2, title: '2 Todo' });
    expect(updated).toEqual(false);
  });

  it('should delete todo with id ', () => {
    const deleted = deleteById(1);
    expect.assertions(2);
    expect(deleted).toEqual(true);
    expect(todos.length).toEqual(0);
  });

  it('should return false if not found todo id', () => {
    insert({ id: 1, title: '1 Todo' });
    const deleted = deleteById(2);
    expect.assertions(2);
    expect(deleted).toEqual(false);
    expect(todos.length).toEqual(1);
  });

  it('should return all todos', () => {
    const todolist = findAll();
    expect(todolist).toEqual(todos);
  });

  it('should return all activated todos', () => {
    insert({ id: 2, title: '2 Todo' });
    update({ id: 2, title: '3 Todo', completed: true });
    insert({ id: 4, title: '4 Todo' });
    const todolist = findAll({ completed: false });
    expect(todolist.length).toEqual(2);
  });

  it('should return all completed todos', () => {
    const todolist = findAll({ completed: true });
    expect(todolist.length).toEqual(1);
  });

  it('should return all activated todo when clear completed todo', () => {
    const todolist = clearCompleted();
    expect(todolist.length).toEqual(2);
  });
});
