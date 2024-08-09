import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  res.json(user)
})

app.post('/users', async (req, res) => {
  const { email, name } = req.body
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { email, name } = req.body
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      name,
    },
  })
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  await prisma.user.delete({
    where: {
      id,
    },
  })
  res.json({ message: 'User deleted' })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
