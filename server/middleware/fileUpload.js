
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const filename = `${file.fieldname}-${uuidv4()}.${ext}`;
    cb(null, filename);
  }
});

// Filter only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

// Create the multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// Export in ES Module format
const fileUploader = {
  single: (fieldName) => upload.single(fieldName),
  array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
  fields: (fieldsArray) => upload.fields(fieldsArray)
};

export default fileUploader;