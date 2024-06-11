### How to run this application
To run this program, please type this command.

    > npx ts-node src/index.ts

### Test API
#### Create Item

    > curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"java developer\", \"description\":\"create a application\"}" http://localhost:3000/items
    > curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"golang developer\", \"description\":\"create a application\"}" http://localhost:3000/items
#### Read Items

    > curl http://localhost:3000/items
#### Read Item

    > curl http://localhost:3000/item/2