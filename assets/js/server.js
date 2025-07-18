const url = "https://api.jsonbin.io/v3/b/XXXXXXX"; // Replace with your actual URL
const accessKey = "XXXXXX"; // Replace with your actual access key

const secretQuestions = [
  "Mother's city of birth?",
  "Father's middle name?",
  "Oldest sibling's nickname?",
  "First pet's species and name?",
  "City of your first job?",
  "Name of your 3rd-grade teacher?",
  "Model of your first vehicle?",
  "Your childhood hero's name?",
  "Best elementary school friend?",
];

function getSecretQuestions() {
  return secretQuestions;
}

async function getDatabase() {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Access-Key": accessKey,
      "X-Bin-Meta": false,
    },
  });
  if (!response.ok) {
    throw "Network response was not ok";
  }
  const database = await response.json();

  /* 
  // This block is for my testing without connection
  
  await Promise.resolve();

  const database = {
  "users": [
    {
      "username": "user0",
      "password": "0",
      "secretQuestion": "4",
      "secretAnswer": "Milan",
      "firstName": "Mario",
      "lastName": "Rossi",
      "email": "user0@example.com",
      "birthDate": "1990-01-26",
      "maxPoints": 1140,
      "rank": 1,
      "gamesPlayed": 5
    },
    {
      "username": "user1",
      "password": "1",
      "secretQuestion": "6",
      "secretAnswer": "Fiat",
      "firstName": "Federica",
      "lastName": "Bianchi",
      "email": "user1@example.com",
      "birthDate": "1988-09-19",
      "maxPoints": 200,
      "rank": 17,
      "gamesPlayed": 1
    },
    {
      "username": "user2",
      "password": "2",
      "secretQuestion": "7",
      "secretAnswer": "Spiderman",
      "firstName": "Paolo",
      "lastName": "Marrone",
      "email": "user2@example.com",
      "birthDate": "1995-07-16",
      "maxPoints": 1060,
      "rank": 2,
      "gamesPlayed": 11
    },
    {
      "username": "user3",
      "password": "3",
      "secretQuestion": "1",
      "secretAnswer": "Cesare",
      "firstName": "Vittoria",
      "lastName": "Adamo",
      "email": "user3@example.com",
      "birthDate": "2005-06-20",
      "maxPoints": 1015,
      "rank": 3,
      "gamesPlayed": 3
    }
  ],
  "scores": [
    {
      "username": "user0",
      "points": 1140,
      "matched": 8,
      "combo": 4,
      "attempts": 2,
      "time": 32
    },
    {
      "username": "user2",
      "points": 1060,
      "matched": 8,
      "combo": 2,
      "attempts": 3,
      "time": 38
    },
    {
      "username": "user3",
      "points": 1015,
      "matched": 8,
      "combo": 3,
      "attempts": 7,
      "time": 27
    },
    {
      "username": "user0",
      "points": 1005,
      "matched": 8,
      "combo": 2,
      "attempts": 5,
      "time": 31
    },
    {
      "username": "user3",
      "points": 975,
      "matched": 8,
      "combo": 2,
      "attempts": 7,
      "time": 29
    },
    {
      "username": "user2",
      "points": 920,
      "matched": 8,
      "combo": 1,
      "attempts": 6,
      "time": 26
    },
    {
      "username": "user2",
      "points": 915,
      "matched": 8,
      "combo": 1,
      "attempts": 7,
      "time": 27
    },
    {
      "username": "User2",
      "points": 840,
      "matched": 8,
      "combo": 1,
      "attempts": 12,
      "time": 22
    },
    {
      "username": "user0",
      "points": 825,
      "matched": 8,
      "combo": 1,
      "attempts": 11,
      "time": 17
    },
    {
      "username": "user2",
      "points": 785,
      "matched": 8,
      "combo": 1,
      "attempts": 15,
      "time": 17
    },
    {
      "username": "user2",
      "points": 755,
      "matched": 8,
      "combo": 0,
      "attempts": 13,
      "time": 17
    },
    {
      "username": "user2",
      "points": 740,
      "matched": 7,
      "combo": 2,
      "attempts": 6,
      "time": 0
    },
    {
      "username": "user2",
      "points": 650,
      "matched": 8,
      "combo": 2,
      "attempts": 25,
      "time": 0
    },
    {
      "username": "user2",
      "points": 645,
      "matched": 8,
      "combo": 1,
      "attempts": 21,
      "time": 1
    },
    {
      "username": "user3",
      "points": 540,
      "matched": 6,
      "combo": 0,
      "attempts": 6,
      "time": 0
    },
    {
      "username": "user0",
      "points": 390,
      "matched": 4,
      "combo": 1,
      "attempts": 6,
      "time": 0
    },
    {
      "username": "user1",
      "points": 200,
      "matched": 2,
      "combo": 0,
      "attempts": 0,
      "time": 0
    },
    {
      "username": "user2",
      "points": 160,
      "matched": 2,
      "combo": 0,
      "attempts": 4,
      "time": 0
    },
    {
      "username": "user2",
      "points": 0,
      "matched": 0,
      "combo": 0,
      "attempts": 0,
      "time": 0
    },
    {
      "username": "user0",
      "points": -20,
      "matched": 2,
      "combo": 0,
      "attempts": 22,
      "time": 0
    }
  ]
}
*/
  if ("users" in database && "scores" in database) return database;
  else throw "Database corrupted";
}

async function updateDatabase(database) {
  console.log(JSON.stringify(database));

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": accessKey,
      "X-Bin-Meta": false,
    },
    body: JSON.stringify(database),
  });
  if (!response.ok) {
    throw "Network response was not ok";
  }
}

async function login(username, password) {
  // Returns a boolean True or False if login is valid or not
  const database = await getDatabase();
  let isLoginValid = false;
  for (let i = 0; i < database.users.length; i++) {
    if (
      username.toLowerCase() === database.users[i].username.toLowerCase() &&
      password === database.users[i].password
    )
      isLoginValid = true;
  }
  return isLoginValid;
}

async function checkUserExist(username) {
  // Returns a boolean True or False if user exists or not
  const database = await getDatabase();
  let userExist = false;
  for (let i = 0; i < database.users.length; i++) {
    if (username.toLowerCase() === database.users[i].username.toLowerCase())
      userExist = true;
  }
  return userExist;
}

async function insertUser(user) {
  const database = await getDatabase();
  user.maxPoints = 0;
  user.rank = 0;
  user.gamesPlayed = 0;
  database.users.push(user);
  await updateDatabase(database);
}

function getUserId(database, username) {
  // Returns user id, -1 if not found
  for (let i = 0; i < database.users.length; i++) {
    if (username.toLowerCase() === database.users[i].username.toLowerCase())
      return i;
  }
  return -1; // if not found
}

async function insertScore(score) {
  /* Insert a score and returns a report object for scoring message containing:
  - previousMaxPoints
  - previousPlace
  - newMaxPoints
  - scorePlace
  */
  const database = await getDatabase();
  const userId = getUserId(database, score.username);
  if (userId >= 0) {
    const targetUser = database.users[userId];
    const insertReport = {
      previousMaxPoints: targetUser.maxPoints,
      previousPlace: targetUser.rank,
    };
    let rank = 0;
    let i = 0;
    let isInserted = false;
    while (i < database.scores.length && !isInserted) {
      if (score.points > database.scores[i].points) {
        rank = i + 1;
        database.scores.splice(i, 0, score); // Insert in position i, 0 = without removing elements
        isInserted = true;
      } else i++;
    }
    if (rank === 0) {
      database.scores.push(score);
      rank = database.scores.length;
    }
    if (score.points > targetUser.maxPoints)
      targetUser.maxPoints = score.points;
    if (rank < targetUser.rank || targetUser.rank === 0) targetUser.rank = rank;
    insertReport.newMaxPoints = targetUser.maxPoints;
    insertReport.scorePlace = rank;
    // Reorder ranking of other users
    for (let i = 0; i < database.users.length; i++) {
      const user = database.users[i];
      if (targetUser === user) continue; // Skip the targetUser
      if (user.rank >= rank) {
        user.rank++;
      }
    }
    targetUser.gamesPlayed = targetUser.gamesPlayed + 1;
    await updateDatabase(database);
    return insertReport;
  } else throw "User not found";
}

async function getUser(username) {
  // Returns the user
  const database = await getDatabase();
  const userId = getUserId(database, username);
  if (userId >= 0) return database.users[userId];
  else return {};
}

async function getScores(username) {
  // Returns the scores of a user
  const database = await getDatabase();
  const userId = getUserId(database, username);
  if (userId >= 0) {
    let rank = 0;
    if (database.users[userId].rank > 0) {
      rank = database.users[userId].rank - 1;
      database.scores[rank].isUserRank = true;
    }
    return database.scores;
  } else throw "Username not found";
}

async function getSecretQFromData(username, email, birthDate) {
  // Returns the secret question by some data of the user (for password reset)
  const user = await getUser(username);
  if (
    email.toLowerCase() === user.email.toLowerCase() &&
    birthDate === user.birthDate
  )
    return secretQuestions[user.secretQuestion];
  else return "";
}

async function checkSecretAnswer(username, answer) {
  // Returns true is secret answer is ok, else false
  const user = await getUser(username);
  if (answer.toLowerCase() === user.secretAnswer.toLowerCase()) return true;
  else return false;
}

async function updatePassword(username, password) {
  const database = await getDatabase();
  const userId = getUserId(database, username);
  if (userId >= 0) {
    const targetUser = database.users[userId];
    targetUser.password = password;
    await updateDatabase(database);
  } else throw "User not found";
}

async function updateUser(user) {
  const database = await getDatabase();
  const userId = getUserId(database, user.username);
  if (userId >= 0) {
    database.users[userId] = user;
    await updateDatabase(database);
  } else throw "User not found";
}
