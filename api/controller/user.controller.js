export const test = (req, res, next) => {
res.json({message:'api is working'});
};

export const signout = async (req, res, next) => {
    try {
        // Destroy the user session
        req.session.destroy((err) => {
            if (err) {
                return next(err);  // Pass error to the error handler
            }

            // Optionally clear cookies if needed
            res.clearCookie('connect.sid');  // 'connect.sid' is the default session cookie name in express-session
            
            // Respond with a success message
            res.status(200).json('User has been signed out');
        });
    } catch (error) {
        next(error);
    }
};