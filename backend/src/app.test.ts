import request from 'supertest';
import app from './app';  // Import your app
import path from 'path';
describe('POST /upload', () => {
  it('should upload a file', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('files', path.join(__dirname,'../public/data/test.txt'));
    expect(response.status).toBe(200);
    expect(response.text).toBe('Files uploaded successfully.');
  });
});
