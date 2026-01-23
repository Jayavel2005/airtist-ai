import app from "./app.js";
import {config} from "./config/env.js";
import {connectDB} from "./config/db.js";

await connectDB();

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
})