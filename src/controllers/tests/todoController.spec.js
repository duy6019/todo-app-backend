const { createTodo, updateTodo, deleteTodo, getTodoList, clearCompleted } = require('../TodoController');
const { todos } = require('../../models/todo');

const mockRequest = body => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test todo controller', () => {
  it('should response status 200 and todo when created ', () => {
    const req = mockRequest({ id: 1, title: 'First Todo' });
    const res = mockResponse();
    createTodo(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'First Todo', completed: false });
  });

  it('should be response status 200 and todo when updat success', () => {
    const req = mockRequest({ id: 1, title: 'First Todo', completed: true });
    const res = mockResponse();
    updateTodo(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'First Todo', completed: true });
  });

  it('should be response status 400 when update fail', () => {
    const req = mockRequest({ id: 2, title: 'First Todo', completed: true });
    const res = mockResponse();
    updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should be response status 400 when delete with wrong id', () => {
    const req = mockRequest({ id: 'any string' });
    const res = mockResponse();
    deleteTodo(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Bad Request');
  });

  it('should be response status 404 when delete with notFound todo', () => {
    const req = mockRequest({ id: 2 });
    const res = mockResponse();
    deleteTodo(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Not Found');
  });

  it('should be response status 200 when delete success', () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();
    deleteTodo(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ delete: true });
  });

  it('should be response status 400 when getAll with wrong params', () => {
    const req = mockRequest({ completed: 'asdasdsa' });
    const res = mockResponse();
    getTodoList(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Bad Request');
  });

  it('should be response status 200 when getAll success with completed false', () => {
    const req = mockRequest({ completed: false });
    const res = mockResponse();
    const copyRes = { ...res };
    createTodo({ body: { id: 1, title: '1 Todo' } }, copyRes);
    createTodo({ body: { id: 2, title: '2 Todo' } }, copyRes);
    getTodoList(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, title: '1 Todo', completed: false },
      { id: 2, title: '2 Todo', completed: false },
    ]);
  });

  it('should be response status 200 when getAll success with completed true', () => {
    const req = mockRequest({ completed: true });
    const res = mockResponse();
    const copyRes = { ...res };
    updateTodo({ body: { id: 1, title: '1 Todo', completed: true } }, copyRes);
    getTodoList(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: '1 Todo', completed: true }]);
  });

  it('should be response status 200 when getAll success', () => {
    const req = mockRequest({});
    const res = mockResponse();
    getTodoList(req, res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, title: '1 Todo', completed: true },
      { id: 2, title: '2 Todo', completed: false },
    ]);
  });

  it('should be response status 200 when clear success', () => {
    const res = mockResponse();
    clearCompleted('', res);
    expect.assertions(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 2, title: '2 Todo', completed: false }]);
  });
});
