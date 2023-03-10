const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string
  method: string
  body: any
  json: boolean
}) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('API Error')
  }

  if (json) {
    const data = await res.json()

    return data
  }
}

export const register = async (user: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  })
}

export const signin = async (user: { email: string; password: string }) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  })
}

export const signout = async () => {
  return fetcher({
    url: '/api/signout',
    method: 'POST',
    body: '',
    json: false,
  })
}

export const createNewProject = async (name: string) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
    json: false,
  })
}

export const createNewTask = async (
  name: string,
  description: string,
  deleted: boolean,
  status: string
) => {
  return fetcher({
    url: '/api/task',
    method: 'POST',
    body: { name, description, deleted, status },
    json: false,
  })
}
