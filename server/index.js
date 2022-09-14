const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Add MySQL database connection. 
const db = mysql.createPool({
    host: 'mysql_db',
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'schedule'
})

// Enable CORS security headers.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// add a route that will process a Select MySQL query to retrieve all the books from the database
app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM schedule";
    db.query(SelectQuery, (err, result) => {
        res.send(result)
    })
})

// an endpoint to process and INSERT SQL command.
app.post("/insert", (req, res) => {
    const lectureCode = req.body.setLectureCode;
    const lectureName = req.body.setLectureName;
    const lecturer = req.body.setLecturer;
    const InsertQuery = "INSERT INTO schedule (lecture_code, lecture_name, lecture_lecturer) VALUES (?, ?, ?)";
    db.query(InsertQuery, [lectureCode, lectureName, lecturer], (err, result) => {
      console.log(result)
    })
  })

// a route that will allow us to delete a book record. This includes a bookId (unique ID for a book) to be deleted.
app.delete("/delete/:lectureId", (req, res) => {
    const lectureId = req.params.lectureId;
    const DeleteQuery = "DELETE FROM schedule WHERE id = ?";
    db.query(DeleteQuery, lectureId, (err, result) => {
        if(err) console.log(err);
    })
})

// a route that will allow us to update a book review. This includes a bookId (unique ID for a book) to be updated.
app.put("/update/:lectureId", (req, res) => {
    const lecturer = req.body.lecturerUpdate;
    const lectureId = req.params.lectureId;
    const UpdateQuery = "UPDATE schedule SET lecture_lecturer = ? WHERE id = ?"
    db.query(UpdateQuery, [lecturer, lectureId], (err, result) => {
    if (err) console.log(err);
})
})

// add a port the will expose the API when the server is running. Here, we expose it to port 3001.
app.listen(3001, () => console.log('Server started on port 3001'));