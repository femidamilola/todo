"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path = require("path");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
console.log(PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.post('/todo/add', (req, res) => {
//   res.json({req: req.body})
// })
app.use(routes_1.default);
app.use(express_1.default.static(path.join(__dirname, "client", "build")));
const uri = 'mongodb+srv://ogsholzy:jUD9XPitrb7FnDs@cluster0.a1irs.mongodb.net/todo?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
console.log(uri);
mongoose_1.default
    .connect(uri, options)
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
    .catch(error => {
    throw error;
});
