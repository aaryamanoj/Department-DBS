const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./model');

const app = express();
// Serve static files from the 'public' directory
app.use(express.static('public'));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for student marks
const marksSchema = new mongoose.Schema({
  username: String,
  email: String,
  subjects: {
    aiml: {
      ia1: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia2: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia3: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      }
    },
    atcd: {
      ia1: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia2: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia3: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      }
    },
    cn: {
      ia1: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia2: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia3: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      }
    },
    dbms: {
      ia1: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia2: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia3: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      }
    },
    rmip: {
      ia1: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia2: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      },
      ia3: {
        marks: { type: Number, max: 30 },
        attendance: { type: Number, max: 100 }
      }
    }
  }
});




  

const Marks = mongoose.model('Marks', marksSchema, 'students');
app.use(express.static('public'));

// Route to serve the fetch.html file and fetch student marks
app.get('/fetch-marks', async (req, res) => {
  const username = req.query.username;
  const email = req.query.email;
  if (!username) {
    // If no username is provided, serve the fetch.html file
    res.sendFile(path.join(__dirname, '/fetch.html'));
    return;
  }

  console.log('Username:', username); // Log the username received from the request
  try {
    const studentMarks = await Marks.findOne({ username });
    console.log('Student marks:', studentMarks); // Log the student marks retrieved from the database
    if (!studentMarks) {
      res.status(404).send('Student not found');
      return;
    }

    // Send the student's marks as HTML response
    res.send(` 
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Dashboard</title>
        <link rel="shortcut icon" href="./images/yen-126x87.png">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet">
        <link rel="stylesheet" href="style1.css">
        <style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
</style>

    </head>
    <body>
        <header>
            <div class="logo" title="University Management System">
                <img src="./images/yen-126x87.png" alt="">
                <h2>Y<span class="danger">I</span>T</h2>
            </div>
            <div class="navbar">
                <a href="index.html" class="active">
                    <span class="material-icons-sharp">home</span>
                    <h3>Home</h3>
                </a>
                <a href="#">
                    <span class="material-icons-sharp" onclick="" href="logout">logout</span>
                    <h3>Logout</h3>
                </a>
            </div>
            <div id="profile-btn">
                <span class="material-icons-sharp">person</span>
            </div>
            <div class="theme-toggler">
                <span class="material-icons-sharp active">light_mode</span>
                <span class="material-icons-sharp">dark_mode</span>
            </div>
            
        </header>
        <div class="container">
            <aside>
                <div class="profile">
                    <div class="top">
                        <div class="profile-photo">
                            <img src="./images/userpng.png" alt="" >
                        </div>
                        <div class="info">
                            <p>Hey, <b id="pname"></b> </p>
                            <small class="text-muted">${username}</small>
                        </div>
                    </div>
                    <div class="about">
                        <h5>Course</h5>
                        <p>BE. Computer Science & Engineering</p>
                        <h5>Email</h5>
                        <p>yit.edu.in</P>
                        
                    </div>
                </div>
            </aside>
    
            <main>
                <h1>Attendance</h1>
                <table border="1">
  <tr>
    <th>Subject</th>
    <th>1st IA Marks</th>
    <th>1st IA Attendance</th>
    <th>2nd IA Marks</th>
    <th>2nd IA Attendance</th>
    <th>3rd IA Marks</th>
    <th>3rd IA Attendance</th>
  </tr>
  <tr>
    <td>AIML</td>
    <td>${studentMarks.subjects.aiml.ia1.marks}</td>
    <td>${studentMarks.subjects.aiml.ia1.attendance}</td>
    <td>${studentMarks.subjects.aiml.ia2.marks}</td>
    <td>${studentMarks.subjects.aiml.ia2.attendance}</td>
    <td>${studentMarks.subjects.aiml.ia3.marks}</td>
    <td>${studentMarks.subjects.aiml.ia3.attendance}</td>
  </tr>
  <tr>
    <td>ATCD</td>
    <td>${studentMarks.subjects.atcd.ia1.marks}</td>
    <td>${studentMarks.subjects.atcd.ia1.attendance}</td>
    <td>${studentMarks.subjects.atcd.ia2.marks}</td>
    <td>${studentMarks.subjects.atcd.ia2.attendance}</td>
    <td>${studentMarks.subjects.atcd.ia3.marks}</td>
    <td>${studentMarks.subjects.atcd.ia3.attendance}</td>
  </tr>
  <tr>
    <td>CN</td>
    <td>${studentMarks.subjects.cn.ia1.marks}</td>
    <td>${studentMarks.subjects.cn.ia1.attendance}</td>
    <td>${studentMarks.subjects.cn.ia2.marks}</td>
    <td>${studentMarks.subjects.cn.ia2.attendance}</td>
    <td>${studentMarks.subjects.cn.ia3.marks}</td>
    <td>${studentMarks.subjects.cn.ia3.attendance}</td>
  </tr>
  <tr>
    <td>DBMS</td>
    <td>${studentMarks.subjects.dbms.ia1.marks}</td>
    <td>${studentMarks.subjects.dbms.ia1.attendance}</td>
    <td>${studentMarks.subjects.dbms.ia2.marks}</td>
    <td>${studentMarks.subjects.dbms.ia2.attendance}</td>
    <td>${studentMarks.subjects.dbms.ia3.marks}</td>
    <td>${studentMarks.subjects.dbms.ia3.attendance}</td>
  </tr>
  <tr>
    <td>RMIP</td>
    <td>${studentMarks.subjects.rmip.ia1.marks}</td>
    <td>${studentMarks.subjects.rmip.ia1.attendance}</td>
    <td>${studentMarks.subjects.rmip.ia2.marks}</td>
    <td>${studentMarks.subjects.rmip.ia2.attendance}</td> 
    <td>${studentMarks.subjects.rmip.ia3.marks}</td>
    <td>${studentMarks.subjects.rmip.ia3.attendance}</td>
  </tr>
</table>

    </main>

              
    
            <div class="right">
                <div class="announcements">
                    <h2>Announcements</h2>
                    <div class="updates">
                        <div class="message">
                            <p> <b>Academic</b> Summer training internship with Live Projects.</p>
                            <small class="text-muted">2 Minutes Ago</small>
                        </div>
                        <div class="message">
                            <p> <b>Co-curricular</b> Global internship oportunity by Student organization.</p>
                            <small class="text-muted">10 Minutes Ago</small>
                        </div>
                        <div class="message">
                            <p> <b>Examination</b> Instructions for Mid Term Examination.</p>
                            <small class="text-muted">Yesterday</small>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
        <script src="app.js"></script>
    </body>
    </html>
    
`);

  
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching student marks');
  }
});


app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/update-data', async (req, res) => {
  const { username, subject, marks, attendance, internal } = req.body;
  try {
    const student = await Marks.findOne({ username });
    if (!student) {
      res.status(404).send('Student not found');
      return;
    }

    // Update the marks and attendance for the specified subject and internal
    const subjectData = student.subjects[subject];
    if (!subjectData || !subjectData[`ia${internal}`]) {
      res.status(400).send('Internal assessment not found');
      return;
    }

    subjectData[`ia${internal}`] = { marks, attendance };
    await student.save();
    return res.status(400).send('<script>alert("Data Updated Succesfully!!!");window.location.href = "/admin.html";</script>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating data');
  }
});

//LOGIN

app.get('/api/data', async (req, res) => {
  try {
    console.log('Fetching data from the database...');

    const data = await User.find();

    console.log('Data fetched successfully:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received request for username:', username);


    const existingUser = await User.findOne({ username });

    if (!existingUser || existingUser.password !== password) {
      console.log('Invalid credentials for username:', username);
      return res.status(400).send({ success: false, message: 'Invalid credentials' });
    }

    // Inside the successful login block
      const token = jwt.sign({ id: existingUser.id, name: existingUser.username }, 'secretkey', { expiresIn: '1h' });
      console.log('Login successful for username:', username);

// Return the token and username in the response
      res.status(200).send({ success: true, token, username, redirect: '/admin.html' });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});


app.all('*',(req,res) =>{
  res.status(404).sendFile(path.join(__dirname,'public','404.html'))
})

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
