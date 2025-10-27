"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserToken = void 0;
const env_1 = require("../config/env");
const jwt_1 = require("./jwt");
const createUserToken = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
    return {
        accessToken,
        // refreshToken
    };
};
exports.createUserToken = createUserToken;
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
