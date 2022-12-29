import { Application, Router } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { get_All_Items, get_Items, set_Items, delete_Items} from "./Controllers/Items.ts";

const app = new Application();

app.static('/', './static');

console.log("http://localhost:3005/");

app.get('/', async (ctx)=> {
  await ctx.file('./index.html');
})

app
  .get('/items', get_All_Items)
  .get('/items/:id', get_Items)
  .post('/items', set_Items)
  .delete('/items/:name', delete_Items)

app.start({ port: 3005 });
