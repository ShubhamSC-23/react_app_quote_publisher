const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();


// Quotes API's

//Get All Quotes
router.get("", (req, resp) => {
	db.query("SELECT * FROM quote", (err, result) => {
		if (err) return resp.send(apiError(err));
		resp.send(apiSuccess(result));
	});
});


//GET quoteById
router.get("/:id", (req, resp) => {
    db.query("SELECT * FROM quote WHERE id=?", [req.params.id],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.length !== 1)
                return resp.send(apiError(" not found"))
            return resp.send(apiSuccess(results[0]))
        }
    )
})


//POST Quote
router.post("", (req, resp) => {
    const {author,contents,userId} = req.body
    //const encPasswd = bcrypt.hashSync(passwd, 10)
    //const enabled = 1
    //const role = "ROLE_CUSTOMER"
    db.query("INSERT INTO quote (author,contents,userId,createdTime) VALUES (?,?,?,now())",
        [author,contents,userId],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            // if user inserted successfully, return new user object
            if(result.affectedRows === 1) {
                db.query("SELECT * FROM quote WHERE id=?", [result.insertId],
                    (err, results) => {
                        if(err)
                            return resp.send(apiError(err))
                        resp.send(apiSuccess(results[0]))
                    }
                )
            }
        }
    )
})


//PUT - Edit Quote
router.put("/:id", (req, resp) => {
	const {author,contents,userId} = req.body;
	db.query(
		"UPDATE quote SET author=?, contents=?, userId=?, createdTime=now() WHERE id=?",
		[author,contents,userId,req.params.id],
		(err, result) => {
			if (err) return resp.send(apiError(err));
			resp.send(apiSuccess({ id: req.params.id, ...req.body }));
		}
	);
});


//DELETE Quote
router.delete("/:id", (req, resp) => {
	db.query("DELETE FROM quote WHERE id=?", [req.params.id], (err, result) => {
		if (err) return resp.send(err);
		if (result.affectedRows === 1) resp.send(apiSuccess(" deleted"));
		else resp.send(apiError(" not found"));
	});
});



module.exports = router