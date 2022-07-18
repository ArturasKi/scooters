const express = require("express"); // užkrauna biblioteką;
const app = express(); // pasakom, jog biblioteka vadinasi app;
const port = 3003; // pasako kuriam port'e veiks;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  // daromas connection prie DB
  host: "localhost",
  user: "root",
  password: "",
  database: "kolt",
});

app.listen(port, () => {
  console.log(`Raccoon is listening to ${port}`);
});

//READ SCOOTER
// SELECT column_name(s)
// FROM table1
// LEFT JOIN table2
// ON table1.column_name = table2.column_name;
app.get("/kolts", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
    SELECT
    k.id, k.regCode, c.color, isBusy, lastTimeUsed, totalRideKilometres, GROUP_CONCAT(com.comment, '-^o^-') AS comments, GROUP_CONCAT(com.id) AS comments_id
    FROM kolts AS k
    LEFT JOIN colors AS c
    ON k.color_id = c.id
    LEFT JOIN comments AS com
    ON com.kolt_id = k.id
    GROUP BY k.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

    // SELECT
    // k.id, k.regCode, c.color, isBusy, lastTimeUsed, totalRideKilometres
    // FROM kolts AS k
    // LEFT JOIN colors AS c
    // ON k.color_id = c.id

//READ COLOR in BACK
app.get("/colors", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
    SELECT
    c.color, c.id, COUNT(k.id) AS kolts_count
    FROM kolts AS k
    RIGHT JOIN colors AS c
    ON k.color_id = c.id
    GROUP BY c.id
    ORDER BY kolts_count DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//READ COLOR in FRONT
app.get("/front/colors", (req, res) => {
  // get - routeris, paimam info is serverio;
  // GROUP_CONCAT() function returns a string with concatenated non-NULL value from a group. Returns NULL when there are no non-NULL values.
  const sql = `
    SELECT
    c.color, c.id, COUNT(k.id) AS kolts_count, GROUP_CONCAT(k.id) AS kolt_id
    FROM kolts AS k
    RIGHT JOIN colors AS c
    ON k.color_id = c.id
    GROUP BY c.id
    ORDER BY c.color
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//READ SCOOTER in FRONT
app.get("/front/kolts", (req, res) => {
  // get - routeris, paimam info is serverio;
  const sql = `
    SELECT
    k.id, k.regCode, c.color, isBusy, lastTimeUsed, totalRideKilometres, GROUP_CONCAT(com.comment, '-^o^-') AS comments, k.rates, k.rate_sum
    FROM kolts AS k
    LEFT JOIN colors AS c
    ON k.color_id = c.id
    LEFT JOIN comments AS com
    ON com.kolt_id = k.id
    GROUP BY k.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//CREATE SCOOTER
app.post("/kolts", (req, res) => {
  const sql = `
    INSERT INTO kolts
    (regCode, isBusy, lastTimeUsed, totalRideKilometres, color_id)
    VALUES (?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.regCode,
      req.body.isBusy,
      req.body.lastTimeUsed,
      req.body.totalRideKilometres,
      req.body.color !== '0' ? req.body.color : null
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Scooter has been created!", type: "success" },
      }); // gaunamas ats iš serverio;
    }
  );
});

//CREATE COLOR
app.post("/colors", (req, res) => {
  const sql = `
    INSERT INTO colors
    (color)
    VALUES (?)
        `;
  con.query(sql, [req.body.color], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Color has been created!", type: "success" },
    }); // gaunamas ats iš serverio;
  });
});

//CREATE COMMENT
app.post("/front/comments", (req, res) => {
  const sql = `
    INSERT INTO comments
    (comment, kolt_id)
    VALUES (?, ?)
        `;
  con.query(sql, [req.body.comment, req.body.scooterId], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Comment has been created!", type: "success" },
    }); // gaunamas ats iš serverio;
  });
});

//DELETE SCOOTER
app.delete("/kolts/:scooterId", (req, res) => {
  const sql = `
  DELETE FROM kolts
  WHERE id = ?
  `;
  con.query(sql, [req.params.scooterId], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Scooter has been deleted!", type: "success" },
    });
  });
});

//DELETE COLOR
app.delete("/colors/:colorId", (req, res) => {
  const sql = `
  DELETE FROM colors
  WHERE id = ?
  `;
  con.query(sql, [req.params.colorId], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Color has been deleted!", type: "success" },
    });
  });
});

//DELETE COMMENT
app.delete("/comments/:commentId", (req, res) => {
  const sql = `
  DELETE FROM comments
  WHERE id = ?
  `;
  con.query(sql, [req.params.commentId], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Comment has been deleted!", type: "success" },
    });
  });
});

//EDIT SCOOTER
app.put("/kolts/:scooterId", (req, res) => {
  const sql = `
  UPDATE kolts
  SET isBusy = ?, lastTimeUsed = ?, totalRideKilometres = ?, color_id = ?
  WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.isBusy,
      req.body.lastTimeUsed,
      req.body.totalRideKilometres,
      req.body.color,
      req.params.scooterId,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Scooter has been edited!", type: "success" },
      });
    }
  );
});

//EDIT RATE
app.put("/front/rate/:scooterId", (req, res) => {
  const sql = `
  UPDATE kolts
  SET rates = rates + 1, rate_sum = rate_sum + ?
  WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.rate,
      req.params.scooterId,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Thank you for your vote!", type: "success" },
      });
    }
  );
});

// PAYLOAD -> rodo, ką išsiuntėme į serverį;
