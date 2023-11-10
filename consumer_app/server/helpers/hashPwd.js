import bcrypt from "bcrypt";

const hashPwd = (pwd) => {
    return bcrypt.hash(pwd, 10);
};

export default hashPwd;
