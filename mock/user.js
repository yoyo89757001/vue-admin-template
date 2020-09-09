
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/app/loginsss',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          errorCode: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        errorCode: 200,
        errorMsg:'ddd',
        data:{
          result:1,
          token:'admin-token',
          msg:'登陆成功'
        }
      }
    }
  },

  // get user info
  {
    url: '/app/getInfosssss',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          errorCode: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        errorCode: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/app/logout',
    type: 'post',
    response: _ => {
      return {
        errorCode: 200,
        data: 'success'
      }
    }
  }
]
