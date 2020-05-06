const User = require('../../models/user')

const sampleUsers = [
  {
    username: 'testuser1',
    name: 'Test User One',
    password: '$2b$10$wmPmzzwK0ueB9M02WQdANemZOogz2JuH9UfdV4uNFE.kwFl.Cw8.K',
    passwordUnHashed: 'testuserpassword1',
    id: '5eb26c99c1f93b4b22628376'
  },
  {
    username: 'testuser2',
    name: 'Test User Two',
    password: '$2b$10$odJuDUIYK3aTwULtOfn96.aRLmPQ6YaKqvKM3oYriZd5hdqiQAvBG',
    passwordUnHashed: 'testuserpassword2',
    id: '5eb26d6bf9c7334d03e11c76'
  },
  {
    username: 'testuser3',
    name: 'Test User Three',
    password: '$2b$10$cGhiaRrCLLTGeQ5M4BXcKexPYlfur04hf1JYiN781Cb3jZTQVI2s.',
    passwordUnHashed: 'testuserpassword3',
    id: '5eb26ddc55fc944da197e3f2'
  },
  {
    username: 'testuser4',
    name: 'Test User Four',
    password: '$2b$10$eCDiPUIFImbryHHI/BrKE.y1CImha8Q76stZ8CZkODkNfQhRCcA1S',
    passwordUnHashed: 'testuserpassword4',
    id: '5eb28c696f5f3a4e0bebd40d'
  },
  {
    username: 'testuser5',
    name: 'Test User Five',
    password: '$2b$10$QhwGZyO.zFX1pbrbfSLHFOnhwKrU6VROGP3XClCFBPiW.Ihg/Bs/.',
    passwordUnHashed: 'testuserpassword5',
    id: '5eb28c8d6f5f3a4e0bebd40e'
  },
  {
    username: 'testuser6',
    name: 'Test User Six',
    password: '$2b$10$HbWlZv8iuTvJLHN5XwTEiepRtjtNs/q62kzRJDAdLC0A8PzoyYgVi',
    passwordUnHashed: 'testuserpassword6',
    id: '5eb28c9f6f5f3a4e0bebd40f'
  },
  {
    username: 'testuser7',
    name: 'Test User Seven',
    password: '$2b$10$gV2Y6MjdsSY0eMLkmXX75.OYn.8mtUGlGQJNoFpHcpmWG/i1JuoNq',
    passwordUnHashed: 'testuserpassword7',
    id: '5eb28cb06f5f3a4e0bebd410'
  },
  {
    username: 'testuser8',
    name: 'Test User Eight',
    password: '$2b$10$x5IsqA7pbhUM5MX.FnDabOl.E.I9aKPQKi1sHqVD7csgJWW.BQwdi',
    passwordUnHashed: 'testuserpassword8',
    id: '5eb28cbf6f5f3a4e0bebd411'
  },
  {
    username: 'testuser9',
    name: 'Test User Nine',
    password: '$2b$10$oH5wHU73YIPrOv3qNP5FfOPMNw25Lt0tFDV4c8cH1eJFHtgdHWRue',
    passwordUnHashed: 'testuserpassword9',
    id: '5eb28cce6f5f3a4e0bebd412'
  },
  {
    username: 'testuser10',
    name: 'Test User Ten',
    password: '$2b$10$doNNGmzVQKBC30rQ46Hpi.r3MyU0cyyGxqRgykk0rgXtEUy9BU8e2',
    passwordUnHashed: 'testuserpassword10',
    id: '5eb28cdf6f5f3a4e0bebd413'
  }
]

const initialUsers = sampleUsers.map(user => ({
  username: user.username,
  name: user.name,
  password: user.password
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
