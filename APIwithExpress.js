const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses =
[
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

app.get('/', (req, res) =>
{
    {
        res.send("hello");
    }
});

app.get('/api/courses', (req, res) =>
{
    res.send(courses);
});


app.post('/api/courses', (req,res) =>
{
    const {error} = validateCourse(req.body); //result.error

    if (error) return res.status(400).send(error.details[0].message);

    const course = 
    {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});




app.get('/api/courses/:id', (req, res)=>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found!');
    else res.send(course);
}
);

app.put('/api/courses/:id', (req, res) =>
{
    //find course
    //if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found!');

    //validate
    //if invalid, return 400
    const {error} = validateCourse(req.body); //result.error

    if (error) return res.status(400).send(error.details[0].message);
    //update course
    course.name = req.body.name;
    
    //return the updated course
    res.send(course);
}
);

app.delete('/api/courses/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
}
);

function validateCourse(course)
{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port ' + port + '...'));
