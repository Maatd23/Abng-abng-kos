const UserController = require("../controller/userController");
const { authentication, authorization } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.use("/auth", require("./user"));
router.use("/kosan", require("./kosan"));
router.use("/facility", require("./facility"));
router.post("/transiction", authentication, UserController.addTransaction);
router.get("/transiction", authentication, UserController.getTrasaction);
router.patch(
  "/transiction/:id",
  authentication,
  authorization,
  UserController.gotPayed
);
router.post("/generet-token", authentication, UserController.generetToken);
module.exports = router;
