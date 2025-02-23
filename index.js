const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  .then((result) => {
    // Run your code here, after you have insured that the connection was made
    const recipe = {
        "title": "Igor fake recipe",
        "level": "Amateur Chef",
        "ingredients": [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 skinless, boneless chicken thighs"
        ],
        "cuisine": "Asian",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        "duration": 40,
        "creator": "Chef LePapu"
    }

    Recipe.create(recipe)
        .then((results) => console.log(`Title of the recipe: ${results}`))
        .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
    
      Recipe.insertMany(data);
      Recipe.find({});

      Recipe.deleteOne({ title: "Carrot Cake" })
      .then((del) => {
        console.log(`Deleted: ${del}`)
      })
      .catch((err) => {
        console.log(`Not deleted: ${err}`);
      })

      Recipe.findOneAndUpdate({ title:"Rigatoni alla Genovese"}, {duration : 100})
        .then((update) => {
        console.log(`Updated: ${update}`);
      })
        .catch((error) => {
      console.error(`Error connecting to the database ${error}`);
      })

      mongoose.connection.close();
})