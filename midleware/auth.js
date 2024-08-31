import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(12121212,"data validation in token ",authHeader);
        
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(' ')[1];
          console.log(121212121212,"this is token ",token,12121212121212121);
          
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decoded = jwt.verify(token, "adfflasdfjjao");

        if (decoded) {
            req.user = decoded; 
            console.log(12121212121212121212121,decoded);
            
            
            next(); 
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "User unauthorized", error: err.message });
    }
};
