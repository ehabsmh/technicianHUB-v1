import jwt from 'jsonwebtoken';



export const auth = (req, res, next) => {
    // Check if the request has a header called 'token'
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}


export const userAuthorizations = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
}

export const technicianAuthorizations = (req, res, next) => {
    if (req.user.role !== 'technician') {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
}
