const request = require('supertest');
const app = require('../../server');

describe('Post Endpoints', () => {
  it('Create a new Tutorial', async () => {
    const res = await request(app)
      .post('/api/tutorials')
      .send({
        title: "test title",
        description: "Test desc"
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
  });

  it('Retrieve a single Tutorial with id', async () => {
    const postId = 3;
    const res = await request(app).get(`/api/tutorials/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
  });

  it('should fetch all tutorials', async () => {
    const res = await request(app).get('/api/tutorials/all');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('posts');
    expect(res.body.posts).toHaveLength(1);
  });

  it('should update a tutorials', async () => {
    const res = await request(app)
      .put('/api/tutorials/1')
      .send({
        title: 'updated title',
        description: 'Lorem ipsum',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
    expect(res.body.title).toHaveProperty('title', 'updated title');
  });

  it('should return status code 500 if db constraint is violated', async () => {
    const res = await request(app)
      .post('/api/tutorials')
      .send({
        title: 'test is cool',
        description: 'Lorem ipsum',
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });

  it('should delete a post', async () => {
    const res = await request(app).delete('/api/tutorials/1');
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const postId = 1;
    const res = await request(app).get(`/api/tutorials/${postId}`);
    expect(res.statusCode).toEqual(404);
  });
});
