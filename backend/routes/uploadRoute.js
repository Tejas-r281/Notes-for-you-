const express= require("express");

const multer= require('multer');


const {
  uploadFile,
  getfile,
  deletefile,
  getAllFiles,
  changeStatus,
  getAllKey,
  rejectFile,
  likeFile,
  commentFile,
  getAllComments,
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
router.route("/getallkey").get( getAllKey);
router.route("/rejectfile").post(isAuthenticatedUser,authorizeRoles("admin"),rejectFile);
router.route("/likefile").post(isAuthenticatedUser,likeFile);
router.route("/commentfile").post(isAuthenticatedUser,commentFile);
router.route("/getallcomments").get(isAuthenticatedUser, authorizeRoles("admin") ,getAllComments);





module.exports = router;
