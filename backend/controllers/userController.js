const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
// const makePdf = require("../utils/makePdf");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } =
        req.body;
    // console.log(name);
    // console.log(email);
    // console.log(password);
    const user = await User.create({
        name,
        email,
        password,
    });


    // 2) Generate ResetPassword Token
    const resetToken = user.getResetPasswordTokenemailconfirm();
    // 3) Save the resetToken in the user's document
    await user.save({ validateBeforeSave: false });
    // 3) Send it to user's email
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //     "host"
    // )}/api/v1/user/confirm/${resetToken}`;
    const resetPasswordUrl = `http://localhost:5000/api/v1/user/confirm/${resetToken}`;

    const message = `Please click this link to confirm your email address: ${resetPasswordUrl}.\n`;
    const data =
    {
        from: "<no.reply.4328@gmail.com>",
        to: user.email,
        // email:user.email,
        text: message,
        subject: "Please click to confirm the you email address"
    }
    try {
        await sendEmail(data);
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (err) {
        console.log(err);
        // agar saara galt ho jaata hai then humko dubaara user ka reset token bagerah ko undefined karna padega
        user.resetPasswordTokenemailconfirm = undefined;
        user.resetPasswordExpireemailconfirm = undefined;

        await user.save({ validateBeforeSave: false });

        return next(
            new ErrorHander(
                "There was an error sending the email. Try again later!",
                500
            )
        );
    }

    //  sendToken(user, 201, res);
});

// confirm user
exports.confirmUser = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordTokenemailconfirm = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordTokenemailconfirm,
        resetPasswordExpireemailconfirm: { $gt: Date.now() },
    });


    if (!user) {
        return next(new ErrorHander("Ooops , Invalid token", 400));
    }

    user.confirmed = true;
    user.resetPasswordTokenemailconfirm = undefined;
    user.resetPasswordExpireemailconfirm = undefined;
    // await user.save({ validateBeforeSave: false });

    await user.save();

    sendToken(user, req, 200, res, "confirmation");
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }
    if (user.confirmed == false) {
        return next(new ErrorHander("Please confirm your email", 401));
    }
    //pdf formation

    // const from1 = "<raushan.043.kumar@gmail>";
    const data = {
        from: "<raushan.043.kumar@gmail>",
        to: user.email,
        subject: "Thanks for visiting us ",
        html: `
        <div  style=" height:500px; width:500px;background:#E5E5E5;">
         <h2>Your details as follows</h2>
        <div style="height:300px; width:300px;display:flex; flex-direction:column; justify-content:center; text-align:center;">

<table>
  <tr>
    <th>Field</th>
    <th>Enter value </th>

  </tr>
  <tr>
    <td>Name</td>
    <td>${user.name}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${user.email}</td>
  </tr>
  <tr>
    <td>Year</td>
    <td>${user.year}</td>
  </tr>
  <tr>
    <td>Branch</td>
    <td>${user.branch}</td>
  </tr>
  <tr>
    <td>Alloted</td>
    <td>${user.hostel}</td>
  </tr>
  <tr>
    <td>Expected</td>
    <td>${user.nexthostel ? user.nexthostel : "not applicable"}</td>
  </tr>

</table>
        </div>
        </div>
        `,
        // attachments: [
        //   {
        //     filename: "hostel.pdf",
        //     path: "hostel.pdf",
        //     cid: "hostel",
        //   },
        // ],
    };

    sendToken(user, req, 200, res);
});
// send user email

exports.sendUserEmail = catchAsyncErrors(async (req, res, next) => {
    const { sender, reciever } = req.body;
    // console.log(sender);
    // console.log(reciever);
    const user = await User.findOne({ email: sender });


    // console.log((user.sentEmail).includes(reciever));

    const value = (user.sentEmail).includes(reciever);
    //  console.log(value);
    if (value) {
        res.status(200).json({
            success: true,
            alreadysent: true,
            data: "Email sent to user successfully",
            message: `Email already already sent, so please wait fews days`,
        });
        return;
    }



    // console.log("out of the block");
    const data = {
        from: sender,
        to: reciever,
        subject: "I want to Exchange hostel with you  ",
        html: `
        <div  style=" height:500px; width:500px;background:#E5E5E5;">
          <h2>My details as follows</h2>
           <p> Name: ${user.name}</p>
            <p> Email: ${user.email}</p>
              <p> Year: ${user.year}</p>
                <p> Branch: ${user.branch}</p>
                  <p> Alloted: ${user.hostel}</p>
                    <p> Expected: ${user.nexthostel ? user.nexthostel : "not applicable"}</p>


                    <div>
                    this is autogenerated mail, please do not reply to this mail and if want to exchange the room then you have connect with exchanger email.
                    </div>
          </div>`
    };

    try {
        await User.updateOne(
            { email: sender },
            { $addToSet: { sentEmail: { email: reciever } } }
        );
        // await user.sentEmail.push(reciever);
        // await user.save();
        await sendEmail();
        res.status(200).json({
            success: true,
            data: "Email sent to user successfully",
            alreadysent: false,
            message: `Email sent to  successfully`,
        });
    }
    catch (err) {
        console.log(err);
        return next(new ErrorHander("There was an error sending the email. Try again later!", 500));
    }
});


// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    const { notes_for_you } = req.cookies;
    // console.log(notes_for_you);
//    delete this notes_for_you from the cookie list
    res.clearCookie("notes_for_you");


    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    // console.log("inside the forgot password");
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //     "host"
    // )}/password/reset/${resetToken} `;

    const resetPasswordUrl = `http://localhost:5000/api/v1/user/password/reset/${resetToken}`;



    const message = `Your password reset token is: - \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    const data =
    {
        from: "<raushan.043.kumar@gmail>",
        to: user.email,
        // email:user.email,
        text: message,
        subject: "Please click to reset your password"
    }
    try {
        await sendEmail(data);

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    // console.log(req.params.token);
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHander(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, req, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    // console.log(req);
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, req, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const curr = req.body.hostel;


    const newUserData = {
        name: req.body.name,
        hostel: req.body.hostel,
        change: req.body.change,
        nexthostel: req.body.nexthostel,
    };



    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id} `)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id} `));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        user,
    });
}
);

exports.deleteUsers = catchAsyncErrors(async (req, res, next) => {
    console.log("inside the delete section");
    const user = await User.findById(req.params.id);
    // console.log(user);
    // console.log(req.params.id);


    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id} `, 400)
        );
    }

    //   const imageId = user.avatar.public_id;

    //   await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});



exports.comment= catchAsyncErrors(async (req, res, next) => {
    const {comment}=req.body.comment;
    const user = await User.findById(req.user._id);

    console.log(user);
    console.log(comment);

    return res.status(200).json({
        data: user,
        success: true,
        message: "User Recommendations successfully",
    });

})

