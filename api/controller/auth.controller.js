import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const signup = async(req, res, next) =>{
    const { username, email, password } = req.body;
    
        if( !username || !email || !password || username === '' || email === '' || password === '')
        {
            next(errorHandler(400, 'All fields are required')); 
        }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
        const newUser = new User({ username, email, password: hashedPassword });
        try 
        {
            await newUser.save();
            res.json('Signup successfull');
        }
        catch(error)
        {
            
            next(error);
        }
};


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    
    // Check if both email and password are provided
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Find the user by email
        const validUser = await User.findOne({ email });
        
        if (!validUser) {
            return next(errorHandler(400, 'User not Found'));
        }

        // Check if the password is correct
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        // If user is authenticated, create a session
        req.session.userId = validUser._id; // Storing the user's ID in the session
        
        // Remove password field from the user object before sending the response
        const { password: pass, ...rest } = validUser._doc;
        
        res.status(200).json({
            message: 'Successfully signed in',
            user: rest
        });

    } catch (error) {
        next(error); 
    }
};