

export function load({ cookies, session }) {
  console.log('load')
  console.log('cookies.get("loggedIn")', cookies.get('loggedIn'))
  return {
    loggedIn: cookies.get('loggedIn') === 'true' ? true : false,
    foo: 'bar'
  }
}
