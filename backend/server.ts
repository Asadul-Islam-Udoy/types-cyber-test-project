import app from './app';
import {DbConnection} from './config/DbConnerction';

///database connection method
DbConnection();

/// first pages
app.use('/',(req,res)=>{
  res.send('<h1>Hello Word</h1>');
});

/// 404 pages
app.use('*',(req,res)=>{
    res.send('<h1>404</h1>');
});

///server connection
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server running http://localhost:${PORT}`)
})