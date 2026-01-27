import bcrypt from "bcrypt";

export const encryptPassword = async (password) =>{
    return await bcrypt.hash(password, 12);
}

export const passwordMatch = async (password, hashedPsw) =>{
    return await bcrypt.compare(password, hashedPsw)

}