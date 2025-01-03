const mongoose = require("mongoose");
const upload = require("../middleware/upload.js");

const BuletinSchema = new mongoose.Schema(
  {
    fileBuletin: {
      type: String,
      required: true,
    },
    nomor: {
      type: String,
      required: true,
    },
    tanggalMasehi: {
      type: Date,
      required: true,
    },
    judul: {
      type: String,
      required: true,
    },
    kelompok: {
      type: String,
      enum: [
        "Produk",
        "Financing Model",
        "Program",
        "Policy & Procedure",
        "Fitur Produk",
        "Dana Kebajikan & Zakat",
      ],
      default: "Lain-Lain",
      required: true,
    },
    kategori: {
      type: String,
      enum: [
        "Financing",
        "Asuransi",
        "Kepatuhan Syariah",
        "Dana Kebajikan & Zakat",
        "Funding",
        "Syariah Card",
        "Investment",
        "Trade Finance",
        "Layanan Jasa",
        "Zakat",
        "Treasury",
        "DBLM",
      ],
      default: "Lain-Lain",
      required: true,
    },
    subKategori: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const buletin = mongoose.model("Buletin", BuletinSchema);
module.exports = buletin;
