import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { syncTables } from "./db.js";
import Users from "./models/user.model.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "exp://192.168.0.10:8081",
  "http://localhost:8081"
]
//Se usan los modulos que importamos
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/insert", upload.single("image"), async (req, res) => {
  try {
    const { name, lastName } = req.body;

    const compressedImageData = await sharp(req.file.buffer)
      .resize({ width: 500 })
      .toBuffer();

    const compressedImageBase64 = compressedImageData.toString("base64");

    const user = Users.build({ name, lastName, image: compressedImageBase64 });
    const newUser = await user.save();

    console.log("Imagen comprimida y guardada con éxito");
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json([error.message]);
  }
});
app.get("/api/get", async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const users = await Users.findAll({
      attributes: ["name", "lastName", "image"],
      raw: true,
      limit: pageSize,
      offset: offset,
      chunkSize: 500,
    });
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json([error.message]);
  }
});
syncTables();

app.listen(port, () => {
  console.log("Server running on port " + port);
});
