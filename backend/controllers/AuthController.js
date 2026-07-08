import {
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/AuthService.js";

export const login = async (
  req,
  res
) => {


  try {


    const user =
      await loginUser(
        req.body
      );


    res.status(200).json({

      success:true,

      message:
        "Login successful.",

      user,

    });


  } catch(error) {


    res.status(401).json({

      success:false,

      message:
        error.message,

    });

  }

};


export const logout = async (
  req,
  res
) => {


  try {


    const result =
      await logoutUser();


    res.status(200).json({

      success:true,

      message:
        result.message,

    });


  } catch(error) {


    res.status(400).json({

      success:false,

      message:
        error.message,

    });

  }

};


export const currentUser = async (
  req,
  res
) => {


  try {


    const user =
      await getCurrentUser();


    res.status(200).json({

      success:true,

      user,

    });


  } catch(error) {

    res.status(401).json({

      success:false,

      message:
        error.message,

    });

  }

};