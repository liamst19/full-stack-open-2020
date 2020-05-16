const User = require('../../models/user')

const sampleUsers = [
  {
    username: 'testuser1',
    name: 'Test User One',
    passwordHash: '$2b$10$wmPmzzwK0ueB9M02WQdANemZOogz2JuH9UfdV4uNFE.kwFl.Cw8.K',
    password: 'testuserpassword1',
    id: '5eb26c99c1f93b4b22628376'
  },
  {
    username: 'testuser2',
    name: 'Test User Two',
    passwordHash: '$2b$10$odJuDUIYK3aTwULtOfn96.aRLmPQ6YaKqvKM3oYriZd5hdqiQAvBG',
    password: 'testuserpassword2',
    id: '5eb26d6bf9c7334d03e11c76'
  },
  {
    username: 'testuser3',
    name: 'Test User Three',
    passwordHash: '$2b$10$cGhiaRrCLLTGeQ5M4BXcKexPYlfur04hf1JYiN781Cb3jZTQVI2s.',
    password: 'testuserpassword3',
    id: '5eb26ddc55fc944da197e3f2'
  },
  {
    username: 'testuser4',
    name: 'Test User Four',
    passwordHash: '$2b$10$eCDiPUIFImbryHHI/BrKE.y1CImha8Q76stZ8CZkODkNfQhRCcA1S',
    password: 'testuserpassword4',
    id: '5eb28c696f5f3a4e0bebd40d'
  },
  {
    username: 'testuser5',
    name: 'Test User Five',
    passwordHash: '$2b$10$QhwGZyO.zFX1pbrbfSLHFOnhwKrU6VROGP3XClCFBPiW.Ihg/Bs/.',
    password: 'testuserpassword5',
    id: '5eb28c8d6f5f3a4e0bebd40e'
  },
  {
    username: 'testuser6',
    name: 'Test User Six',
    passwordHash: '$2b$10$HbWlZv8iuTvJLHN5XwTEiepRtjtNs/q62kzRJDAdLC0A8PzoyYgVi',
    password: 'testuserpassword6',
    id: '5eb28c9f6f5f3a4e0bebd40f'
  },
  {
    username: 'testuser7',
    name: 'Test User Seven',
    passwordHash: '$2b$10$gV2Y6MjdsSY0eMLkmXX75.OYn.8mtUGlGQJNoFpHcpmWG/i1JuoNq',
    password: 'testuserpassword7',
    id: '5eb28cb06f5f3a4e0bebd410'
  },
  {
    username: 'testuser8',
    name: 'Test User Eight',
    passwordHash: '$2b$10$x5IsqA7pbhUM5MX.FnDabOl.E.I9aKPQKi1sHqVD7csgJWW.BQwdi',
    password: 'testuserpassword8',
    id: '5eb28cbf6f5f3a4e0bebd411'
  },
  {
    username: 'testuser9',
    name: 'Test User Nine',
    passwordHash: '$2b$10$oH5wHU73YIPrOv3qNP5FfOPMNw25Lt0tFDV4c8cH1eJFHtgdHWRue',
    password: 'testuserpassword9',
    id: '5eb28cce6f5f3a4e0bebd412'
  },
  {
    username: 'testuser10',
    name: 'Test User Ten',
    passwordHash: '$2b$10$doNNGmzVQKBC30rQ46Hpi.r3MyU0cyyGxqRgykk0rgXtEUy9BU8e2',
    password: 'testuserpassword10',
    id: '5eb28cdf6f5f3a4e0bebd413'
  }
]

const initialUsers = sampleUsers.map(user => ({
  username: user.username,
  name: user.name,
  passwordHash: user.passwordHash
}))

const sampleNewUser = {
  username: 'samplenewuser',
  name: 'New User Sample',
  password: 'sampleuserpassword'
}

const getNonExistingId = async () => {
  const user = new User({
    username: 'willremove',
    name: 'William Remover',
    password: 'willremovepassword'
  })
  await user.save()
  await user.remove()

  return user._id.toString()
}

const getUsersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  sampleUsers, initialUsers,
  sampleNewUser,
  getUsersInDb,
  getNonExistingId
}
