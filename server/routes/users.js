const db = require("../utils/dbpool");
const {apiSuccess, apiError, apiResult} = require("../utils/apiresult");
const {createToken} = require("../utils/jwtauth");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

//Start Writing API's for Users :


// POST (Insert) User :
router.post("/signup", (req, resp) => {
    const {firstName, lastName, email, password, phoneno, address} =req.body
    const encPassword = bcrypt.hashSync(password, 10)

    db.query("INSERT INTO user (firstName, lastName, email, password, phoneno, address) VALUES (?, ?, ?, ?, ?, ?)", 
        [firstName, lastName, email, encPassword, phoneno, address], (err, result) => {
            if (err)
                return resp.send(apiError(err))

            if (result.affectedRows === 1) {
                db.query("SELECT * FROM user WHERE id=?",
                    [result.insertId], (err, result) => {
                        if (err)
                            return resp.send(apiError(err))
                        resp.send(apiSuccess(result[0]))
                    }
                )
            }
        }
    )
})


// POST (Insert Signin) User:
router.post("/signin", (req, resp) => {
    const {email, password} = req.body

    db.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
        if (err)
            return resp.send(apiError(err))

        if (result.length !== 1)
            return resp.send(apiError("Invalid Email.."))

        const dbUser = result[0]
        const isMatching = bcrypt.compareSync(password, dbUser.password)

        if (!isMatching)
            return resp.send(apiError("Invalid Password.."))

        const token = createToken(dbUser)
        resp.send(apiSuccess({...dbUser, token}))
    })
})


// PATCH (Update Password) User :
router.patch("/changepassword", (req, resp) => {
    const {email, password} = req.body
    const encPassword = bcrypt.hashSync(password, 10)

    db.query("UPDATE user SET password=? WHERE email=?", [encPassword, email], (err, result) => {
        if (err)
            return resp.send(apiError(err))
        if (result.affectedRows !== 1)
            return resp.send(apiError("User Not Found.."))
        resp.send(apiSuccess("User Password Updated.."))
    })
})


//PUT (Update) User:
router.put("/:id", (req, resp) => {
    const {firstName, lastName, email, password, phoneno, address} = req.body
    const encPassword = bcrypt.hashSync(password, 10)

    db.query("UPDATE user SET firstName=?, lastName=?, email=?, password=?, phoneno=?, address=? WHERE id=?",
        [firstName, lastName, email, encPassword, phoneno, address, req.params.id], (err, result) => {
            if (err)
                return resp.send(apiError(err))
            resp.send(apiSuccess({id: req.params.id, ...req.body}))
        }
    )
})


// GET /users/byemail/:email
router.get("/byemail/:email", (req, resp) => {
    db.query("SELECT * FROM user WHERE email=?", [req.params.email],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.length !== 1)
                return resp.send(apiError("User not found"))
            return resp.send(apiSuccess(results[0]))
        }
    )
})


module.exports = router