const express = require("express");
const router = express.Router();
const con = require("../db");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_TOKEN = "IAMVIHAANSINGLA";
const multer = require("multer");
const fetchuserdata = require("../middleware/fetchuserdata");
const fetchuserdataadmin = require("../middleware/fetchuserdataadmin");
var val = Math.floor(1000000 + Math.random() * 9000);
var nodemailer = require("nodemailer");

let newname2 = "";
router.post(
  "/sendmail",
  body("email", "Enter a valid email").isEmail().trim(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 200, error: errors.array() });
    }
    const { name, email } = req.body;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vihaansingla555@gmail.com",
        pass: "#@vihaan9092khush9092@#",
      },
    });

    var mailOptions = {
      from: "vihaansingla555@gmail.com",
      to: `${email}`,
      subject: `${name}, Thank you for register`,
      text: `Now you start enroll in companies`,
      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        res.send("Email sent: " + info.response);
      }
    });
  }
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resume_files/");
  },
  filename: (req, file, cb) => {
    let newname = Date.now() + "-" + file.originalname;
    cb(null, newname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only pdf file allowed!"));
    }
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/userprofile/");
  },
  filename: (req, file, cb) => {
    newname2 = Date.now() + "-" + file.originalname;
    cb(null, newname2);
  },
});
const upload2 = multer({
  storage: storage2,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only jpeg,jpg,png file allowed!"));
    }
  },
});


router.post('/companylisting',fetchuserdataadmin,
   async(req,res)=>{





})
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: "error",
        message: "You miss some input fields",
      });
    }
    const { email, password } = req.body;
    try {
      con.query(
        "SELECT * FROM `users` WHERE `email`=?",
        [email],
        (error, result) => {
          if (result.length === 1) {
            bcrypt.compare(password, result[0].password, (err, success) => {
              if (success) {
                const data = {
                  user: {
                    id: result[0].user_id,
                    status: result[0].type,
                  },
                };
                const authtoken = jwt.sign(data, JWT_TOKEN);

                return res.json({
                  status: "success",
                  authtoken: authtoken,
                  userstatus: result[0].type,
                  userid: result[0].user_id,
                });
              } else {
                return res.json({
                  status: "error",
                  message: "You entered credentials are not valid",
                });
              }
            });
          } else {
            return res.json({
              status: "error",
              message: "You entered credentials are not valid",
            });
          }
        }
      );
    } catch (error) {
      return res.json({ status: "error", message: "Some error occured" });
    }
  }
);
const generatetoken = (len) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
const sendMailtouser = (id,name,auth_token,email)=>{

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "vihaansingla555@gmail.com",
          pass: "#@vihaan9092khush9092@#",
        },
      });
  
      var mailOptions = {
        from: "vihaansingla555@gmail.com",
        to: `${email}`,
        subject: `Password Recovery Link`,
        text: `Hii,${name} This is your password revcovery Link http://localhost:3000/recover/${id}/${auth_token}
        `,
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log(info)
        }
      });

}
router.post('/recover',(req,res)=>{



    const auth_token = req.body.auth_token;
    const id = req.body.id;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const newpass = bcrypt.hashSync(password, salt);
    const token = generatetoken(30);

    con.query(
        "SELECT `user_id`,`name`,`auth_token`,`email` FROM `users` WHERE `user_id`=?",
        [id],
        (error, result) => {
            if (result.length > 0) {
               
                con.query(
                    "SELECT `user_id`,`name`,`auth_token`,`email`,`password` FROM `users` WHERE `auth_token`=?",
                    [auth_token],
                    (error, result2) => {
                        if (result2.length > 0) {
                            con.query("UPDATE `users` SET `password`=?,`auth_token`=? WHERE `user_id`=? AND `auth_token`=?",[newpass,token,id,auth_token],(error,result3)=>{

                                return res.json({
                                    status: "success",
                                    message: "update successfully",
                                  });
                            })

                        }
                        else{
                            return res.json({
                                status: "error",
                                message: "Some error occured",
                              });
                        }
            
                    });



            }
            else{
                return res.json({
                    status: "error",
                    message: "Some error occured",
                  });
            }

        });




})
router.post(
  "/recoverpassword",
  [body("email").isEmail().withMessage("Not a valid email")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            status: "error",
            message: "Please enter your email",
          });    }

    const email = req.body.email;
    con.query(
      "SELECT `user_id`,`auth_token`,`email` FROM `users` WHERE `email`=?",
      [req.body.email],
      (error, result) => {
        if (result.length > 0) {
            con.query(
                "SELECT `user_id`,`name`,`auth_token`,`email` FROM `users` WHERE `auth_token`=?",
                [result[0].auth_token],
                (error, result) => {
                  if (result.length > 0) {
                    
                    sendMailtouser(result[0].user_id,result[0].name,result[0].auth_token,result[0].email);
                    return res.json({
                        status: "success",
                        message: "Email sent successfully please also check your spam folder",
                      });
                } else {
                    return res.json({
                      status: "error",
                      message: "Some error occured",
                    });
                  }
                }
              );
        } else {
          return res.json({ status: "error", message: "Some error occured" });
        }
      }
    );
  }
);
router.post(
  "/register",
  upload2.single("profilepic"),
  [
    body("name").isLength({ min: 3 }),
    body("surname").isLength({ min: 3 }),
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json([{ status: 200, error: errors.array() }]);
    }
    const username = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const created_at = new Date().toLocaleDateString();
    const type = "user";
    const profilepicname = req.body.profilepic_filename;
    const token = generatetoken(30);
    con.query(
      "SELECT * FROM `users` WHERE `email`=?",
      [email],
      (error, result) => {
        if (result.length > 0) {
          return res.json({ status: "error", message: "Email already exist" });
        } else {
          con.query(
            "SELECT * FROM `users` WHERE `phone_number`=?",
            [phone],
            (error, result2) => {
              if (result2.length > 0) {
                return res.json({
                  status: "error",
                  message: "Phone number already exist",
                });
              } else {
                const salt = bcrypt.genSaltSync(10);
                const newpass = bcrypt.hashSync(password, salt);
                con.query(
                  "INSERT INTO `users`(`name`,`surname`,`email`,`phone_number`,`password`, `type`, `user_image`,`auth_token`,`created_at`) VALUES(?,?,?,?,?,?,?,?,?)",
                  [
                    username,
                    surname,
                    email,
                    phone,
                    newpass,
                    type,
                    newname2,
                    token,
                    created_at,
                  ],
                  (err, success) => {
                    if (success.affectedRows === 1) {
                      const data = {
                        user: {
                          id: success.insertId,
                          status: type,
                        },
                      };

                      const authtoken = jwt.sign(data, JWT_TOKEN);
                      return res.json({
                        status: "success",
                        authtoken: authtoken,
                        userstatus: type,
                        userid: success.insertId,
                      });
                    } else {
                      return res.json({
                        status: "error",
                        message: "Some error ocuured",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);

router.post("/userdata", fetchuserdata, (req, res) => {
  // get user basic info
  var sql =
    "SELECT `user_id`,`name`,`surname`,`email`,`phone_number` FROM `users` WHERE `user_id`=?";
  con.query(sql, [req.user.id], (error, userdata) => {
    res.send({ userdata: userdata });
  });
});
router.post("/profile", fetchuserdata, (req, res) => {
  // get user basic info
  var sql =
    "SELECT `user_id`,`name`,`surname`,`email`,`phone_number`,`user_image` FROM `users` WHERE `user_id`=?";
  con.query(sql, [req.user.id], (error, userdata) => {
    //get user company registration information
    var sql2 =
      "SELECT * FROM `student_company_registration` WHERE `user_id` =?";
    con.query(sql2, [req.user.id], (error, usercompanydata) => {
      res.send({ userdata: userdata, usercompanydata: usercompanydata });
    });
  });
});
router.post("/checktokensecure", fetchuserdataadmin, async (req, res) => {
  if (req.user.status !== "admin") {
    res.send({ status: "error", message: "Invalid request token" });
  } else {
    res.send({ status: "success", message: "success" });
  }
});
router.post("/checktoken", fetchuserdata, async (req, res) => {
  if (req.user.status === "error") {
    res.send({ status: "error" });
  } else {
    res.send({ status: "success" });
  }
});

router.post(
  "/companyRegistration",
  fetchuserdata,
  upload.single("resume_file"),
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("phone").isLength({ min: 10, max: 10 }),
    body("stream").isLength({ min: 3 }),
    body("year").isLength({ min: 1, max: 1 }),
    body("gender").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: "error", message: `${errors}` });
    }

    var filename = req.body.resume_filename;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var stream = req.body.stream;
    var year = req.body.year;
    var company_id = req.body.company_id;
    var user_id = req.user.id;
    var created_at = new Date().toLocaleDateString();
    // if(type !== "admin"){
    //     res.status(401).send({error:"NOT ALLOWED TO ACCESS"});

    // }
    var sql2 =
      "SELECT * FROM `student_company_registration` WHERE `company_id`=? AND `user_id`=?";
    con.query(sql2, [company_id, user_id], (error, result) => {
      if (result.length >= 1) {
        return res.json({
          status: "error",
          message: "You already enroll for this company",
        });
      } else {
        var sql =
          "INSERT INTO `student_company_registration`(`name`, `email`, `phone_number`, `gender`, `resume`, `stream`, `year`,`user_id`,`company_id`, `create_at`) VALUES(?,?,?,?,?,?,?,?,?,?)";

        con.query(
          sql,
          [
            name,
            email,
            phone,
            gender,
            filename,
            stream,
            year,
            user_id,
            company_id,
            created_at,
          ],
          (error, result) => {
            if (result.affectedRows === 1) {
              return res.json({
                status: "success",
                message: "Register successfully",
              });
            } else {
              return res.json({
                status: "error",
                message: "Some error occured",
              });
            }
          }
        );
      }
    });
  }
);

router.post("/companyinfointernship", (req, res) => {
  try {
    const sql = "SELECT * FROM `companyinfo` WHERE `purposeofcompany`=?";
    con.query(sql, ["internship"], (error, result) => {
      if (result.length > 0) {
        res
          .status(200)
          .json({
            totalresult: result.length,
            companyinfointern: result,
            status: "ok",
          });
      } else {
        res.status(200).json({ data: "no data found", status: "ok" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "some problem occured", status: "error" });
  }
});
router.post("/companyinfoplacement", (req, res) => {
  try {
    const sql = "SELECT * FROM `companyinfo` WHERE `purposeofcompany`=?";
    con.query(sql, ["placement"], (error, result) => {
      if (result.length > 0) {
        res
          .status(200)
          .json({
            totalresult: result.length,
            companyinfoplacement: result,
            status: "ok",
          });
      } else {
        res.status(200).json({ data: "no data found", status: "ok" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "some problem occured", status: "error" });
  }
});

router.get("/companyinfo", (req, res) => {
  try {
    const sql = "SELECT * FROM `companyinfo` WHERE `status` = ?";
    con.query(sql,[1],(error, result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.json({ data: "no data found", status: "ok" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "some problem occured", status: "error" });
  }
});

module.exports = router;
