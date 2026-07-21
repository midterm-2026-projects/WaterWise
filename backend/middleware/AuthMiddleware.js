import {
  isAuthenticated,
} from "../services/AuthService.js";


export const authenticate = (
  req,
  res,
  next
) => {


  if (!isAuthenticated()) {


    return res.status(401).json({

      success:false,

      message:
        "Unauthorized."

    });


  }


  next();

};