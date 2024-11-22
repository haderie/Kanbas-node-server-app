import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", (req, res) => {
    const enrollments = enrollmentsDao.findAllEnrollments();
    res.send(enrollments);
  });

  // Get all currently enrolled courses for a user
  app.get("/api/enrollments/:userId", async (req, res) => {
    const { userId } = req.params;
    const enrollments = await enrollmentsDao.getUserEnrollments(userId);
    if (!enrollments || enrollments.length === 0) {
      return res
        .status(101)
        .send({ message: "No enrollments found for user." });
    }
    res.send(enrollments);
  });

  // Get all unenrolled courses for a user
  app.get("/api/enrollments/:userId/unenrolled", async (req, res) => {
    const { userId } = req.params;
    const unenrolledCourses = await enrollmentsDao.getUnenrolledCourses(userId);
    res.send(unenrolledCourses);
  });

  app.put("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    // Logic to enroll the user in the course
    const currentUser = req.session["currentUser"];

    enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send({ message: "Enrolled successfully" });
  });

  // Unenroll user from course (DELETE request)
  app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    // Logic to unenroll the user from the course
    enrollmentsDao.unenrollUserInCourse(userId, courseId);
    res.send({ message: "Unenrolled successfully" });
  });
}
