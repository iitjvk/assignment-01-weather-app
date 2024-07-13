// // app.js

const app = require("./weather");
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
