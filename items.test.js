process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app")

let items = require("../fakeDb");


let item = { name: popsicle, price: 1.45};

beforeEach(function(){
    items.push(item);
});

afterEach(function(){
    item = []
});

describe("GET /items", function(){
    test("Gets a list of items", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [popsicle]});
    });
});

describe("GET /items/:name", function(){
    test("Gets a single item", async function() {
        const resp = await request(app).get(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({item:popsicle})
    });

    test("Responds with 404 if can't find item", async function(){
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("POST /items", function(){
    test("Creates new items", async function(){
        const resp = await request(app)
        .post(`/items`)
        .send({
            name: "cheese",
            price: 5.80
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body.item.name).toEqual({name:"cheese"});
        expect(resp.body.item.price).toEqual({price: 5.80});
    });
})

describe("PATCH /items/:name", function(){
    test("Updates a single item", async function(){
        const resp = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "gyro"
        });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
        item: {name: "gyro"}
    });
  });
  test("Responds with 404 if id invalid", async function(){
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404)
  });
});

describe("DELETE /items/:name", function(){
    test("Delete a single item", async function(){
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Deleted"});
    })
})

