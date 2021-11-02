const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

//buat
//tambah 2
//tambah 3
//tambah 4
//tambah 5

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to my app school");
});

// app.get ('/teachers',(req,res)=>{
//     let data = JSON.parse(fs.readFileSync('./teachers.json','utf8'))
//     res.send(data)
// })
app.get("/teachers", (req, res) => {
  let teachers = JSON.parse(fs.readFileSync("./teachers.json", "utf8"));

  res.render("teachers", { data: teachers });
});

app.get("/students", (req, res) => {
  let students = JSON.parse(fs.readFileSync("./students.json", "utf8"));
  res.render("students", { data: students });
});

app.get("/students/add", (req, res) => {
  res.render("addFormStudents");
});

app.post("/students/add", (req, res) => {
  // console.log(req.body)
  let data = JSON.parse(fs.readFileSync("./students.json", "utf8"));
  // console.log(data)
  let id;
  if (data.length === 0) {
    id = 0;
  } else {
    id = data[data.length - 1].id + 1;
  }
  let newData = {
    id: id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  // console.log(newData)
  data.push(newData);
  // console.log(data)
  fs.writeFileSync("./students.json", JSON.stringify(data, null, 2));
  res.redirect("/students");
});

app.get("/students/:id/edit", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./students.json", "utf8"));

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === +id) {
      res.render("editStudents", { data: data[i] });
      // console.log(data[i].id)
    }
  }
});

app.post("/students/:id/edit", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./students.json", "utf8"));

  for (let i = 0; i < data.length; i++) {
    if (+id === data[i].id) {
      (data[i].first_name = req.body.first_name),
        (data[i].last_name = req.body.last_name),
        (data[i].email = req.body.email);
    }
  }
  //    console.log(data)
  fs.writeFileSync("./students.json", JSON.stringify(data, null, 2));
  res.redirect("/students");
});

app.get("/students/:id/delete", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./students.json", "utf8"));

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === +id) {
      data.splice(i, 1);
    }
  }
  fs.writeFileSync("./students.json", JSON.stringify(data, null, 2));
  res.redirect("/students");
});
app.get("/subjects", (req, res) => {
  let subjects = JSON.parse(fs.readFileSync("./subjects.json", "utf8"));

  res.render("subjects", { data: subjects });
});

app.get("/teachers/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./teachers.json", "utf8"));

  let output = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === +id) {
      output = data[i];
    }
  }
  if (output) {
    res.send(output);
  } else {
    res.send("data is not exists");
  }
});

app.get("/students/:email", (req, res) => {
  let email = req.params.email;
  let data = JSON.parse(fs.readFileSync("./students.json", "utf8"));

  let output = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].email === email) {
      output = data[i];
    }
  }
  if (output) {
    res.send(output);
  } else {
    res.send("data is not exists");
  }
});

app.get("/subjects/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./subjects.json", "utf8"));

  let output = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === +id) {
      output = data[i];
    }
  }
  if (output) {
    res.send(output);
  } else {
    res.send("data is not exists");
  }
});

app.listen(port, function () {
  console.log("this app running on port " + port);
});
