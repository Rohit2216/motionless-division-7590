const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if (token) {
        const decoded = jwt.verify(token, "shhhhh")
        if (decoded) {
            req.body.userId=decoded.userId
            // console.log(decoded)
            next()
        } else {
            res.status(400).send({"msg":"Please Login first"})
        }
    } else {
        res.status(400).send({"msg":"Please Login first"})
    }
}
module.exports = {
    authenticate
}


// {
//     "title":"goa trip",
//     "note":"go to anjuna beach",
//     "category":"friends"
// }