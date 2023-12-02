let currentUser = null;
import * as dao from "./dao.js";
function UserRoutes(app) {
  
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser == null) {
      res.status(400).json(
        { message: "Invalid Login. Try again." });
    } else {
      req.session['currentUser'] = currentUser;
      console.log("account in sign in: " + req.session['currentUser']);
      res.json(currentUser);
    }
  };

  const account = async (req, res) => {
    console.log("account: " + req.session['currentUser']);
    res.json(req.session['currentUser']);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken. Try again." });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session['currentUser'] = currentUser;
      res.json(currentUser);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const createUser = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken. Try again." });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session['currentUser'] = currentUser;
      res.json(currentUser);
    }
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const findUserByUsername = async (req, res) => {
    const user = await dao.findUserByUsername(req.params.username);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };


  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.get("/api/users", findAllUsers);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users", createUser);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/byUsername/:username", findUserByUsername);
  app.delete("/api/users/:userId", deleteUser);

}
export default UserRoutes;