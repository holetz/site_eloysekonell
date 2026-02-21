const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");
const TEMPLATES_DIR = path.join(SRC_DIR, "templates");
const ASSETS_DIR = path.join(SRC_DIR, "assets");
const VENDOR_DIR = path.join(SRC_DIR, "vendor");

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  DIST_DIR,
  COMPONENTS_DIR,
  TEMPLATES_DIR,
  ASSETS_DIR,
  VENDOR_DIR,
};
