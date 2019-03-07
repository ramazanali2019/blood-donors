app.get('/api/auth', (req, res) => {
  const userAvail = req.data;
  if(userAvail) {
    const getUser = User.findById(req.data.id, (err, foundUser) => {
      if(err) console.log(err);
      else {
        res.json({
          username: foundUser.username,
          email: foundUser.email
        });
      }
    });
  } else {
    res.json({
      message: 'User not Found'
    })
  }
});

app.get('/api/register', (req, res) => {
  User.find({}).select('-password').exec((err, foundUser) => {
    if(err) res.json(err);
    else {
      foundUser.map(oneUser => oneUser.password);
      res.json(foundUser);
    }
  });
});

app.post('/api/register', (req, res) => {
  let { body } = req;
  const { username } = body;
  console.log(username);
  User.findOne({ username }, (err, foundUser) => {
    if(err) throw err;
    else {
      if(!foundUser) {
        bcrypt.hash(body.password, 12, function(err, hash) {
          if(err) res.json(err);
          else {
            body.password = hash;
            User.create(body, (err, newUser) => {
              if(err) res.json(err);
              else {
                jwt.sign({ userId: newUser._id }, 'secretkey', (err, token) => {
                  if(err) throw err;
                  else {
                    newUser.password = null;
                    console.log('New user created', newUser);
                    return res.json({newUser, token});
                  }
                });
              }
            });
          }
        });
      } else {
        res.json({
          message: 'User Already Exist'
        })
      }
    }
  })
});

app.post('/api/login', (req, res) => {
  let { body } = req;
  const { username, password } = body;
  User.findOne({ username }, (err, foundUser) => {
    if(err) throw err;
    else {
      if(foundUser) {
        bcrypt.compare(password, foundUser.password, (err, hash) => {
          if(hash) {
            jwt.sign({ userId: foundUser._id }, 'secretkey', (err, token) => {
              if(err) throw err;
              else {
                res.json({
                  userId: foundUser._id,
                  token
                });
              }
            });
          } else {
            res.json({
              message: 'Invalid Login Information!'
            });
          }
        });
      } else {
        res.json({
          message: 'User not found!'
        });
      }
    }
  });
});

app.get('/api/donors', (req, res) => {
  Donor.find({}, (err, foundDonor) => {
    res.json(foundDonor);
  })
});

app.post('/api/donors', (req, res) => {
  const { body } = req;
  Donor.create(body, (err, newDonor) => {
    if(err) res.json(err);
    else {
      res.json(newDonor);
    }
  });
});

app.get('/api/patient', (req, res) => {
  Patient.find({}, (err, foundPatient) => {
    res.json(foundPatient);
  })
});

app.post('/api/patient', (req, res) => {
  const { body } = req;
  Patient.create(body, (err, newPatient) => {
    if(err) res.json(err);
    else {
      res.json(newPatient);
    }
  });
});

app.get('/api/logout', (req, res) => {
  res.json({
    message: 'User not found'
  });
});

const bgroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// for(let i = 0; i < 500; i++) {
//   Donor.create({
//     profile: {
//       firstName: faker.name.findName(),
//       middleName: faker.name.findName(),
//       lastName: faker.name.findName(),
//       age: faker.random.number(),
//       location: {
//         place: faker.address.city(),
//         state: faker.address.state(),
//         country: faker.address.country()
//       },
//       bloodGroup: 'O+',
//       phone: faker.phone.phoneNumber()
//     },
//     donatedOnce: ((Math.random() * 10) % 2) === 0,
//     smoke: ((Math.random() * 10) % 2) === 0
//   }, (err, savedUser) => {
//     if(err) throw err;
//     else {
//       console.log(savedUser);
//     };
//   });
// }
