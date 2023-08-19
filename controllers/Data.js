import fs from "fs/promises";
import path from "path";
import Members from "../models/Members.js";

// Controller methods
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const jsonDataPath = path.join(__dirname, "..", "sample.json");

export const getData = async (req, res) => {
  try {
    const data = await fs.readFile(jsonDataPath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading JSON data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLowBalanceByTransportation = async (req, res) => {
  try {
    const data = await fs.readFile(jsonDataPath, "utf8");
    const jsonData = JSON.parse(data);

    const lowBalanceByTransportation = {};

    jsonData.forEach((entry) => {
      const transportation = entry.favoriteTransportation;
      const balance = entry.details[0].balance;

      if (balance < 10000) {
        if (!lowBalanceByTransportation[transportation]) {
          lowBalanceByTransportation[transportation] = [];
        }
        lowBalanceByTransportation[transportation].push({
          name: entry.details[0].name,
          balance: entry.details[0].balance,
          transportation: entry.favoriteTransportation,
        });
      }
    });

    // Simpan data ke database menggunakan Members.create()
    for (const transportation in lowBalanceByTransportation) {
      const transportData = lowBalanceByTransportation[transportation];
      await Promise.all(
        transportData.map(async (data) => {
          await Members.create(data);
        })
      );
    }
    res.json(lowBalanceByTransportation);
  } catch (error) {
    console.error(error);
  }
};
