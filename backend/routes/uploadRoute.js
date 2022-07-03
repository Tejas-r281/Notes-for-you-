const express= require("express");

const multer= require('multer');


const {
  uploadFile,
  getfile,
  deletefile,
  getAllFiles,
  changeStatus,
  getAllKey,
  rejectFile
} = require("../controllers/uploadController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


// router.route("/test").get(homepage)
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})
const upload = multer({ storage }).single('file');

router.route("/uploadfile").post(isAuthenticatedUser,upload,uploadFile);
router.route("/file/:key").get(getfile);
router.route("/allfiles").get(getAllFiles);
router.route("/deletefile/:key").delete(deletefile);

router.route("/updatefile").post(isAuthenticatedUser,authorizeRoles("admin"),changeStatus);
router.route("/getallkey").get(isAuthenticatedUser, authorizeRoles("admin") ,getAllKey);
router.route("/rejectfile").post(isAuthenticatedUser,authorizeRoles("admin"),rejectFile);





module.exports = router;
