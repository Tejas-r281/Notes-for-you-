const express= require("express");

const multer= require('multer');


const {
  uploadFile,
  getfile,
  deletefile,
  getAllFiles,
  acceptfile,
  getAllKey,
  rejectFile,
  likeFile,
  commentFile,
  getAllComments,
  getAllKeyBySubject,
  getSubjectDetails,
  admindeletefile
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
router.route("/file/:id").get(getfile);
router.route("/allfiles").get(getAllFiles);
router.route("/deletefile").delete(isAuthenticatedUser ,deletefile);
router.route("/admin/deletefile").delete(isAuthenticatedUser,authorizeRoles("admin") ,admindeletefile);

router.route("/acceptfile").put(isAuthenticatedUser, authorizeRoles("admin") ,acceptfile);
router.route("/getallkey").get( getAllKey);
router.route("/rejectfile").put(isAuthenticatedUser, authorizeRoles("admin") ,rejectFile);
router.route("/likefile").put(isAuthenticatedUser,likeFile);
router.route("/commentfile").post(isAuthenticatedUser,commentFile);
router.route("/getallcomments").get(isAuthenticatedUser, authorizeRoles("admin") ,getAllComments);
router.route("/getallkeybysubject").get(getAllKeyBySubject);
router.route("/subject/:key").get(getSubjectDetails);







module.exports = router;
