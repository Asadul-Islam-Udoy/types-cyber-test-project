import app from './app';
import {DbConnection} from './config/DbConnerction';

///database connection method
DbConnection();


///server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running http://localhost:${PORT}`)
})