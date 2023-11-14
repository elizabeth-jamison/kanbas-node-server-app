import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
            c._id === id ? { c, ...course } : c
        );
        res.sendStatus(204);
    });
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        console.log("id: " + id);
        Database.courses = Database.courses
            .filter((c) => c._id !== id);
        console.log("database courses: " + JSON.stringify(Database.courses));
        res.sendStatus(204);
    });
    app.post("/api/courses", (req, res) => {
        const course = {
            ...req.body,
             _id: new Date().getTime().toString(),
         };
        console.log(req.body);
        Database.courses.push(course);
        res.json(course);
    });
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}
export default CourseRoutes;