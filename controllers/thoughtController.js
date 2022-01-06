const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall
// const headCount = async () =>
//   Student.aggregate()
//     .count('studentCount')
//     .then((numberOfStudents) => numberOfStudents);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: { _id: studentId, overallGrade: { $avg: '$assignments.score' } },
//     },
//   ]);

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thoughts
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought
              // grade: await grade(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      // .then((user) =>
      //   !user
      //     ? res.status(404).json({ message: 'No such user exists' })
      //     : Course.findOneAndUpdate(
      //         { students: req.params.studentId },
      //         { $pull: { students: req.params.studentId } },
      //         { new: true }
      //       )
      // )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'No thought found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // // Add an assignment to a student
  // addAssignment(req, res) {
  //   console.log('You are adding an assignment');
  //   console.log(req.body);
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // Remove assignment from a student
  // removeAssignment(req, res) {
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
