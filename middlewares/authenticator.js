const { OAuth2Client } = require('google-auth-library');

const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Authenticate routes by oauth token
module.exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid access token' });

    const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: [process.env.GOOGLE_CLIENT_ID]
    });
    
    if (!ticket) return res.status(401).json({ message: 'Invalid access token' });

    next();
}