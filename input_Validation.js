const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
];

app.get('/', (req, res) => {
    res.send('Hello World! Building My First Web Server!!! endpoint!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(4).required()
    };

    const result = new Joi.ValidationError(req.body, schema);
    if (result.error) { 
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});



// /api/courses/1 - Single Route Parameters
// -we use route parameters for essential or required values
// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) res.status(404).send('The course with the given ID was not found.');
//     res.send(course);
// });

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


// Documentation:- 
// How to replace this validation logic with joi?
// => 1. npm i joi
//    2. load the joi modules with capital J at the top of the code/ 
//    import the module coz what is return from this module is a class.
//    and as we knew before, in javascript, use pascal naming convention to 
//    name our classes. Also, as a best practice, put all your required calls
//    on top of the file. This way we can easily see what are the dependencies are on this module.
//    This module index module, is dependent upon modules, one is joi, the other is 
//    express.
//    Now with joy first we need to define a schema. A schema defines the shape of our objects.
//    what properties do we have in an object? what is the type of each property, do we have an email,
//    do we have a string? what are the minimun or maximum  number of characters? Do we have a number?
//    What range should that number be? so this is sthe job of the schema.
//   3. define schema at app.post ->constant schema, we set it to object, 
//   this is the shape of our course object.
//   4. here we have name property Joi.string

