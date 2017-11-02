const fs = require('fs')
const uuid = require('uuid/v4')

describe('post routes', function () {
  describe('GET /', function () {
    it('should return all posts', function (done) {
      const expected = { posts: [] }
      chai.request(app)
        .get('/posts')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal(expected)
          done()
        })
    })
  })

  describe('POST /', function () {
    it('should create a new post', function (done) {
      const post = { title: 'xxx', content: 'yyy' }
      chai.request(app)
      .post('/posts')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.post.id).to.be.ok
        expect(res.body.post.title).to.deep.equal('xxx')
        expect(res.body.post.content).to.deep.equal('yyy')
        done()
      })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve a specific post', function (done) {
      const post = { id: uuid(), title: 'xxx', content: 'yyy' }
      fs.writeFileSync(db, JSON.stringify([ post ]))

      chai.request(app)
      .get(`/posts/${post.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.post).to.deep.equal(post)
        done()
      })
    })
  })

  describe('DELETE /:id', function () {
    it('should destroy a specific post', function (done) {
      const post = { id: uuid(), title: 'xxx', content: 'yyy' }
      fs.writeFileSync(db, JSON.stringify([ post ]))

      chai.request(app)
        .delete(`/posts/${post.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.post).to.deep.equal(post)
          done()
        })
    })
  })

  describe('PATCH /:id', function () {
    it('should partially modify an existing post', function (done) {
      const post = { id: uuid(), title: 'xxx', content: 'yyy' }
      fs.writeFileSync(db, JSON.stringify([ post ]))

      const patch = { title: 'zzz' }
      const expected = Object.assign(post, patch)
      chai.request(app)
        .patch(`/posts/${post.id}`)
        .send(patch)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.post).to.deep.equal(expected)
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should completely modify an existing post', function (done) {
      const post = { id: uuid(), title: 'xxx', content: 'yyy' }
      fs.writeFileSync(db, JSON.stringify([ post ]))

      const replacement = { id: post.id, title: 'zzz', content: 'www' }
      chai.request(app)
        .put(`/posts/${post.id}`)
        .send(replacement)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.post).to.deep.equal(replacement)
          done()
        })
    })
  })
})
