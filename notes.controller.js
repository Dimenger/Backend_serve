import { existsSync } from "fs";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesPath = path.join(__dirname, "db.json");

export const addNote = async (title) => {
  try {
    if (!existsSync(notesPath)) {
      console.log(
        chalk.green(
          "The file at the specified path does not exist. The db.json has been created."
        )
      );
      await fs.writeFile(notesPath, JSON.stringify([], null, 2));
    }
    const data = await fs.readFile(notesPath, "utf-8");
    const parsed = data.trim() ? JSON.parse(data) : [];
    const notes = Array.isArray(parsed) ? parsed : [];
    const note = {
      title,
      id: Date.now().toString(),
    };
    if (!note.title) {
      return;
    }
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
    console.log(chalk.bgCyan("Note was added."));
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

export const getNote = async () => {
  try {
    if (!existsSync(notesPath)) {
      console.log(
        chalk.green(
          "The file at the specified path does not exist. The db.json has been created."
        )
      );
      await fs.writeFile(notesPath, JSON.stringify([], null, 2));
    }
    const data = await fs.readFile(notesPath, "utf-8");
    const parsed = data.trim() ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

export const editNote = async (id, newTitle) => {
  try {
    const notes = await getNote();
    const editedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: newTitle } : note
    );
    await fs.writeFile(notesPath, JSON.stringify(editedNotes, null, 2));
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

export const removeNote = async (id) => {
  try {
    const notes = await getNote();
    const newNotes = notes.filter((note) => note.id !== id);
    await fs.writeFile(notesPath, JSON.stringify(newNotes, null, 2));
    console.log(chalk.red(`The note with id:${id} removed.`));
  } catch (err) {
    console.error("Error removing note:", err);
  }
};
