const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const multer = require("multer");
const User = require("./models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 3001;
const Handlebars = require("handlebars");
Handlebars.registerHelper("reverse", function (arr) {
  return arr.reverse();
});
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/public/css", (req, res, next) => {
  res.set("Content-Type", "text/css");
  next();
  console.log("css");
});
app.use("/public", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

const hbs = exphbs.create({
  helpers: {
    get_emoji: () => {
      const emojis = [];
      const randomIndex = Math.floor(Math.random() * emojis.length);
      return emojis[randomIndex];
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "views"));

app.post(
  "/api/profile-picture",
  upload.single("profile_picture"),
  async (req, res) => {
    if (!req.session.user_id) {
      res.status(401).json({ url: "./public/uploads/${req.file.filename}" });
      return;
    }

    try {
      const updatedUser = await User.update(
        { profile_picture: req.file.filename },
        { where: { id: req.session.user_id } }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      res
        .status(200)
        .json({
          message: "Profile picture uploaded successfully.",
          url: `/public/uploads/${req.file.filename}`,
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});