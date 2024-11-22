// enrollmentsDao.js
import Database from "../Database/index.js";
import * as courseDao from "../Courses/dao.js"; // assuming you have this for course details

export function findAllEnrollments() {
  return Database.enrollments;
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const index = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index !== -1) {
    enrollments.splice(index, 1);
    return { message: "Unenrolled successfully" };
  }
  return { message: "Enrollment not found" };
}

export function getUserEnrollments(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function getUnenrolledCourses(userId) {
  const { enrollments } = Database;
  const enrolledCourseIds = enrollments
    .filter((enrollment) => enrollment.user === userId)
    .map((enrollment) => enrollment.course);
  const allCourses = courseDao.findAllCourses();
  return allCourses.filter((course) => !enrolledCourseIds.includes(course._id));
}
