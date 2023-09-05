// import express
import express from "express";
const app = express();

// convert responses to json
app.use(express.json());

// get all the emojis
app.get("/emojis", (req, res) => {
  res.send({ success: true, emojis });
});

//get a specific emoji
app.get("/emojis/:emojiId", (req, res) => {
  const id = req.params.emojiId;
  const emojiSearch = emojis.filter((emoji) => {
    return emoji.id === Number(id);
  });

  if (isNaN(id)) {
    return res.send({
      success: false,
      error: "the id to search for an emoji must be a number",
    });
  }

  if (emojiSearch.length === 0) {
    res.send({ success: false, error: "Emoji not found" });
  } else {
    res.send({ success: true, emoji: emojiSearch[0] });
  }
});

// adds a new emoji to the array

app.post("/emojis", (req, res) => {
  const { body } = req;
  if (!body.name || !body.character) {
    return res.send({
      success: false,
      error: "Both name and character must be provided to create an emoji",
    });
  }
  if (body.name.length < 3) {
    return res.send({ success: false, error: "Please provide a valid name" });
  }
  if (body.character.length > 2) {
    console.log(body.character.length);
    return res.send({
      success: false,
      error: "The character must be an emoji!",
    });
  }
  const toPush = { ...body, id: emojis.length + 1 };
  emojis.push(toPush);
  res.send({ success: true, emoji: toPush });
});

// deletes an entry

app.delete("/emojis/:emojiId", (req, res) => {
  const { emojiId } = req.params;
  const index = emojis.findIndex((emoji) => Number(emojiId) === emoji.id);
  if (isNaN(emojiId)) {
    return res.send({
      success: false,
      error: "the id to delete an emoji must be a number",
    });
  }
  if (index === -1) {
    return res.send({
      success: false,
      error: "An emoji with that ID was not found",
    });
  }
  const returnValue = emojis.splice(index, 1);
  res.send({ success: true, emoji: returnValue });
});

// modify an emoji with put
app.put("/emojis/:emojiId", (req, res) => {
  const { emojiId } = req.params;
  const { body } = req;
  const index = emojis.findIndex((emoji) => Number(emojiId) === emoji.id);
  if (isNaN(emojiId)) {
    return res.send({
      success: false,
      error: "the id to delete an emoji must be a number",
    });
  }
  if (index === -1) {
    return res.send({
      success: false,
      error: "An emoji with that ID was not found",
    });
  }
  if (!body.name || !body.character) {
    return res.send({
      success: false,
      error: "Both name and character must be provided to modify an emoji",
    });
  }
  if (body.name.length < 3) {
    return res.send({ success: false, error: "Please provide a valid name" });
  }
  if (body.character.length > 2) {
    console.log(body.character.length);
    return res.send({
      success: false,
      error: "The character must be an emoji!",
    });
  }
  emojis.splice(index, 1);
  const returnValue = { ...body, id: +emojiId };
  emojis.push(returnValue);
  res.send({ success: true, returnValue });
});

// path not found default

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

// essential boilerplate
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

let emojis = [
  { id: 1, character: "😀", name: "Grinning Face" },
  { id: 2, character: "🚀", name: "Rocket" },
  { id: 3, character: "🌟", name: "Star" },
  { id: 4, character: "🎉", name: "Party Popper" },
  { id: 5, character: "🐱", name: "Cat Face" },
  { id: 6, character: "🌺", name: "Hibiscus" },
  { id: 7, character: "🍔", name: "Hamburger" },
  { id: 8, character: "🚲", name: "Bicycle" },
  { id: 9, character: "📚", name: "Books" },
  { id: 10, character: "🎈", name: "Balloon" },
  { id: 11, character: "🍕", name: "Pizza" },
  { id: 12, character: "🏖️", name: "Beach with Umbrella" },
  { id: 13, character: "🎸", name: "Guitar" },
  { id: 14, character: "🌈", name: "Rainbow" },
  { id: 15, character: "🌊", name: "Ocean Wave" },
  { id: 16, character: "🍦", name: "Ice Cream" },
  { id: 17, character: "🎨", name: "Artist Palette" },
  { id: 18, character: "🐶", name: "Dog Face" },
  { id: 19, character: "🌄", name: "Sunrise Over Mountains" },
  { id: 20, character: "🎓", name: "Graduation Cap" },
  { id: 21, character: "🍂", name: "Fallen Leaf" },
  { id: 22, character: "🍁", name: "Maple Leaf" },
  { id: 23, character: "🎃", name: "Jack-O-Lantern" },
  { id: 24, character: "🎄", name: "Christmas Tree" },
  { id: 25, character: "❄️", name: "Snowflake" },
  { id: 26, character: "🌻", name: "Sunflower" },
  { id: 27, character: "🌍", name: "Earth Globe Europe-Africa" },
  { id: 28, character: "🌞", name: "Sun with Face" },
  { id: 29, character: "🌚", name: "New Moon Face" },
  { id: 30, character: "🎶", name: "Musical Notes" },
];
