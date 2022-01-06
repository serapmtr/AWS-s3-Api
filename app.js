require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');

// routers
const uploadRouter = require('./routes/uploadRoutes');
const bucketRouter = require('./routes/bucketRoutes')
const fileRouter = require('./routes/fileRoutes')

// error handler


app.use(express.static('./public'));

app.use(express.json());
app.use(fileUpload({ useTempFiles: false }));   // !!!!!!!!!!!   true olduğu durumda temp klasörü oluşturuyor


app.use('/api/files', uploadRouter);
app.use('/api/buckets', bucketRouter)
app.use('/api/files', fileRouter)



const port = process.env.PORT 

const start = async () => {
  try {
   
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
