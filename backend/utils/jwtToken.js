// Create Token and saving in cookie

const sendToken = (user, req, statusCode, res, confirm) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + 5* 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (confirm === "confirmation") {
        res.redirect(`${req.protocol}://${req.get("host")}`);
    } else {
        res.status(statusCode).cookie("notes_for_you", token, options).json({
            success: true,
            user,
            token,
            // secure:true,
        });
    }

};

module.exports = sendToken;
