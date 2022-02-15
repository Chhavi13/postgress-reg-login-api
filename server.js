
const express = require('express')
const bodyparser = require('body-parser')
const PORT = 5000;
const app =express();
const db = require('./models/index.model')
const userRoutes = require('./routers/users.routes')
const classRoutes = require('./routers/classRoutes')
const studentRoutes = require('./routers/student.routes')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
db.sequelize.sync();


app.use('/user',userRoutes)
app.use('/class',classRoutes)
app.use('/student',studentRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });