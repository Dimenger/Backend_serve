import { fileURLToPath } from "node:url";
import express from "express";
import path from "node:path";
import chalk from "chalk";
import { getNote, addNote, removeNote, editNote } from "./notes.controller.js";

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); /*отправлять на сервер данные в формате JSON*/

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNote(),
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.redirect("/");
});

app.put("/:id", async (req, res) => {
  await editNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express app",
    notes: await getNote(),
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  console.log("delete id", req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNote(),
  });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`App listening on port ${port}`));
});
