const sharp = require("sharp");
const fs = require("fs");

const SetImgsize = (dimensions) => {
  return (req, res, next) => {
    // If no files, move to the next middleware
    if (!req.files && !req.file) return next();

    const validationPromises = [];

    // Function to validate a single file
    const validateFile = (file, dimension) => {
      return sharp(file.path)
        .metadata()
        .then((metadata) => {
          const { width: maxWidth, height: maxHeight } = dimension;
          const { width: imgWidth, height: imgHeight } = metadata;

          // Allow images with width and height up to the specified max values
          if (imgWidth > maxWidth || imgHeight > maxHeight) {
            fs.unlinkSync(file.path); // Delete the uploaded file
            throw new Error(
              `${file.originalname}. Image Only Allowed up to Width ${maxWidth} x ${maxHeight} px Height .`
            );
          }
        });
    };

    // Handle single file 
    if (req.file) {
      const dimension = dimensions[req.file.fieldname];
      validationPromises.push(validateFile(req.file, dimension));
    }

    // Handle multiple files
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        const files = req.files[key];
        files.forEach((file) => {
          const dimension = dimensions[key];
          validationPromises.push(validateFile(file, dimension));
        });
      });
    }

    Promise.all(validationPromises)
      .then(() => next())
      .catch((err) => res.status(400).send({ msg: err.message }));
  };
};

module.exports = SetImgsize;
