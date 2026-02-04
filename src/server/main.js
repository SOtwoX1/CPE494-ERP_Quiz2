import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import mysql from "mysql2";
import mongoose from "mongoose";
import cron from "node-cron";
import { Card } from '@mui/material';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware to parse JSON bodies
app.use(express.json());


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);