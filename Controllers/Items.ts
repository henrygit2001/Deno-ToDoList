import {Application, Context} from "https://deno.land/x/abc@v1.3.3/mod.ts";
import {Item} from '../Models/itemModel.ts';

let items: Item[] = [
    {number : 1, name: "Cleaning Dishes", important: true},
    {number : 2, name: "Folding Clothes", important: true},
    {number : 2, name: "Folding Clothes", important: true},
    {number : 2, name: "Folding Clothes", important: true}, 
]

export const get_All_Items = (ctx)=>{
    return ctx.json(items, 200);
}
export const get_Items = (ctx) =>{
    const { id } = ctx.params;
    const item = items.filter((b) => String(b.important) === id);
    if (item.length) {
        return ctx.json(item, 200);
    }
    return ctx.string('no item with that id', 404);
}

export const set_Items = async (ctx) => {
   let body = await ctx.body;
   body = JSON.parse(body);
   const {number , name, important} = body;
   if(!name){
    return ctx.json('can\'t add item', 404);
   }
   const itemToPush = {number, name, important};
   items.push(itemToPush);

   return ctx.json('Item added successfully', 201);
   
}

export const delete_Items = (ctx: Context) =>{
    const {name} = ctx.params;
    const item = items.find((b: Item) => b.name === name);
    
    if (item) {
      items = items.filter((b: Item) => b.name !== name);
      return ctx.string('Item deleted successfully!', 201);
    }
    return ctx.string('can\'t add item', 404);
}

//   export const create_book = async (ctx: Context) => {
//     const { title, author, pages } = await ctx.body();
  
//     // validate data & types of data
//     const id = v4.generate();
//     const book = { id, title, author, pages };
//     books.push(book);
  
//     return ctx.json(book, 201);
//   }
  
//   export const delete_book = (ctx: Context) => {
//     const { id } = ctx.params;
//     const book = books.find((b: Book) => b.id === id);
    
//     if (book) {
//       books = books.filter((b: Book) => b.id !== id);
//       return ctx.json(book, 200);
//     }
//     return ctx.string('no book with that id', 404);
//   }