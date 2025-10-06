import { faker } from '@faker-js/faker'
import path from 'path'
import { promises as fs } from 'fs'

export function generateBookingData() {
  const now = new Date()

  const firstname = faker.person.firstName()
  const lastname = faker.person.lastName()
  const totalprice = faker.number.int({ min: 2000, max: 10000 })
  const depositpaid = faker.datatype.boolean()
  const additionalneeds = faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner','Cleaning', 'Gardening', 'Chauffeur'])

  const year = String(2026)
  const month = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')
  const day = String(faker.number.int({ min: 1, max: 28 })).padStart(2, '0')
  const checkinDate = `${year}-${month}-${day}`
  const checkin = new Date(`${checkinDate}T00:00:00`)
  const daysToAdd = faker.number.int({ min: 4, max: 30 })
  const checkout = new Date(checkin)
  checkout.setDate(checkin.getDate() + daysToAdd)
  const checkoutDate = checkout.toISOString().split('T')[0]

  console.log(firstname, lastname, totalprice, depositpaid, checkinDate, checkoutDate, additionalneeds)

  return {
    firstname,
    lastname,
    totalprice,
    depositpaid,
    bookingdates: {
      checkin: checkinDate,
      checkout: checkoutDate
    },
    additionalneeds
  }
}

export async function createLogFile(): Promise<string> {
  const now = new Date()

  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const dir = path.join('Evidence', year, month, day)
  await fs.mkdir(dir, { recursive: true })

  const filePath = path.join(dir, `API_E2E_Test_${hours}${minutes}${seconds}.txt`)
  return filePath
}

export async function appendToLogFile(filePath: string, label: string, response: any, content: any ) {
  const logEntry = `\n${label}\n${response}\n${JSON.stringify(content, null, 2)}\n`;
  await fs.appendFile(filePath, logEntry);
}