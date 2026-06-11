const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
console.log("Starting MongoDB connection...");
mongoose.connect(
  "mongodb+srv://chanshi099_db_user:J2A2F0aGmC9hf3Ha@cluster0.ty7yxmz.mongodb.net/studyhub?retryWrites=true&w=majority"
)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log("MongoDB Error ❌");
  console.log(err);
});
// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Note Schema
const NoteSchema = new mongoose.Schema({
  subject: String,
  title: String,
  content: String
});

const User = mongoose.model("User", UserSchema);
const Note = mongoose.model("Note", NoteSchema);

// Home
app.get("/", (req, res) => {
  res.send("Home Route Working ✅");
});

// Subjects
app.get("/subjects", (req, res) => {
  res.json([
    {
      name: "Engineering Calculus",
      semester: 1
    },
    {
      name: "Python",
      semester: 1
    },
    {
      name: "Electronics",
      semester: 1
    },
    {
      name: "Java",
      semester: 2
    }
  ]);
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      username
    });

    if (existingUser) {
      return res.json({
        message: "Username already exists ❌"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "Signup Successful ✅"
    });

  } catch (error) {
    console.log(error);

    res.json({
      message: "Signup Error ❌"
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username
    });

    if (!user) {
      return res.json({
        message: "Invalid Username or Password ❌"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (isMatch) {
      res.json({
        message: `Welcome, ${user.username} 🎉`
      });
    } else {
      res.json({
        message: "Invalid Username or Password ❌"
      });
    }

  } catch (error) {
    console.log(error);

    res.json({
      message: "Login Error ❌"
    });
  }
});

// All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Profile
app.get("/profile/:username", async (req, res) => {

  const user = await User.findOne({
    username: req.params.username
  });

  if (user) {
    res.json(user);
  } else {
    res.json({
      message: "User not found ❌"
    });
  }

});

// Add Note
app.post("/notes", async (req, res) => {

  const { subject, title, content } = req.body;

  const newNote = new Note({
    subject,
    title,
    content
  });

  await newNote.save();

  res.json({
    message: "Note Added Successfully ✅"
  });

});

// View Notes
app.get("/notes", async (req, res) => {

  const notes = await Note.find();

  res.json(notes);

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});