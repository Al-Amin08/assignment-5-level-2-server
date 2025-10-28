
import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";

import { generateToken } from "./jwt";


export const createUserToken = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    

    
    return {
        accessToken,
        
    }
}

// export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    
//     const verifiedSecretToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload
    
//     const isUserExist = await User.findOne({ email: verifiedSecretToken.email })
    
//     if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist")
//     }

//     if (isUserExist.current_status === Current_Status.BLOCKED || isUserExist.current_status === Current_Status.SUSPEND) {
//         throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.current_status}`)
//     }

//     const jwtPayload = {
//         userId: isUserExist._id,
//         email: isUserExist.email,
//         role:isUserExist.role
//     }

//     const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    
//     return accessToken
// }