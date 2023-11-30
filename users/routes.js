let currentUser = null;
function UserRoutes(app) {
  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log("username: " + username);
    console.log("password: " + password);
    const currentUser = await dao.findUserByCredentials(username, password);
    console.log("currentUser: " + currentUser);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const account = async (req, res) => {
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
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signup);
  app.post("/api/users/account", account);
}
export default UserRoutes;