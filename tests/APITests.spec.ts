import { test, expect, request } from '@playwright/test';
import {generateBookingData, createLogFile, appendToLogFile } from '../test-data/BookingsDataHelper'
import {createTokenPayload, createBookingPayload, updateBookingPayload, partialUpdateBookingPayload} from '../test-data/BookingsPayloadBuilder'

test.describe.configure({ mode: 'parallel' })
test.describe('Smoke Test - Daily @Smoke', () =>{
    test('Booking E2E Test', async ({request}) => {
        //Dynamic Variables
        let createBookingResponseBody: any
        let createTokenResponseBody: any
        let LogFilePath: string 
        
        const bookingData = generateBookingData()
        LogFilePath = await createLogFile()
        await appendToLogFile(LogFilePath, 'Test Data Generated', '-------------------', bookingData)



        await test.step('API Health Check', async() => {
        const pingResponse = await request.get('/ping')

        expect(pingResponse.status()).toEqual(201)
        const pingResponseBody = await pingResponse.text()
        expect(pingResponseBody).toContain('Created')
        await appendToLogFile(LogFilePath, 'API Health Check Response', pingResponse.status(), pingResponseBody)
        })



        await test.step('Create Token', async () => {
        const createTokenResponse = await request.post('/auth', {
            data: createTokenPayload('admin', 'password123'),
            headers: {'Content-Type': 'application/json'}
        })

        createTokenResponseBody = await createTokenResponse.json()
        expect(createTokenResponse.status()).toEqual(200)
        await appendToLogFile(LogFilePath, 'Create Token Response', createTokenResponse.status(), createTokenResponseBody)
        })



        await test.step('Create booking', async () => {
        const createBookingResponse = await request.post('/booking', {
            data: createBookingPayload(bookingData),
            headers: {'Content-Type': 'application/json'}
        })

        createBookingResponseBody = await createBookingResponse.json()
        expect(createBookingResponse.status()).toEqual(200)
        await appendToLogFile(LogFilePath, 'Create booking Response', createBookingResponse.status(), createBookingResponseBody)
        })



        await test.step('Read bookings by query parameters', async () => {
        const readAllBookingsResponse = await request.get('/booking', {
            params: {
                firstname: bookingData.firstname,
                lastname: bookingData.lastname,
            }
        })

        const readAllBookingsResponseBody = await readAllBookingsResponse.json()
        expect(readAllBookingsResponse.status()).toEqual(200)
        expect(readAllBookingsResponseBody[0].bookingid).toEqual(createBookingResponseBody.bookingid)
        await appendToLogFile(LogFilePath, 'Read bookings by query parameters Response', readAllBookingsResponse.status(), readAllBookingsResponseBody)
        })



        await test.step('Read booking by ID', async () => {
        const response = await request.get(`/booking/${createBookingResponseBody.bookingid}`)

        const responseBody = await response.json()
        expect(response.status()).toEqual(200)
        await appendToLogFile(LogFilePath, 'Read booking by ID Response', response.status(), responseBody)
        })



        await test.step('Update full booking by ID', async () => {
        const updateBookingResponse = await request.put(`/booking/${createBookingResponseBody.bookingid}`, {
            data: updateBookingPayload(bookingData),
            headers: {'Content-Type': 'application/json',
                Cookie: `token=${createTokenResponseBody.token}`}
        })
        
        const updateBookingResponseBody = await updateBookingResponse.json()
        expect(updateBookingResponse.status()).toEqual(200)
        expect(updateBookingResponseBody.firstname).toContain('Updated-')
        expect(updateBookingResponseBody.lastname).toContain('Updated-')
        expect(updateBookingResponseBody.additionalneeds).toContain('Updated-')
        await appendToLogFile(LogFilePath, 'Update full booking by ID Response', updateBookingResponse.status(), updateBookingResponseBody)
        })



        await test.step('Read booking by ID', async () => {
        const response = await request.get(`/booking/${createBookingResponseBody.bookingid}`)

        const responseBody = await response.json()
        expect(response.status()).toEqual(200)
        expect(responseBody.firstname).toContain('Updated-')
        expect(responseBody.lastname).toContain('Updated-')
        expect(responseBody.additionalneeds).toContain('Updated-')
        await appendToLogFile(LogFilePath, 'Read booking by ID Response', response.status(), responseBody)
        })



        await test.step('Update partial booking by ID', async () => {
        const updateBookingResponse = await request.patch(`/booking/${createBookingResponseBody.bookingid}`, {
            data: partialUpdateBookingPayload(bookingData),
            headers: {'Content-Type': 'application/json',
                Cookie: `token=${createTokenResponseBody.token}`}
        })
        
        const updateBookingResponseBody = await updateBookingResponse.json()
        expect(updateBookingResponse.status()).toEqual(200)
        expect(updateBookingResponseBody.firstname).toContain('Patch-')
        expect(updateBookingResponseBody.lastname).toContain('Patch-')
        await appendToLogFile(LogFilePath, 'Update partial booking by ID Response', updateBookingResponse.status(), updateBookingResponseBody)
        })



        await test.step('Read booking by ID', async () => {
        const response = await request.get(`/booking/${createBookingResponseBody.bookingid}`)

        const responseBody = await response.json()
        expect(response.status()).toEqual(200)
        expect(responseBody.firstname).toContain('Patch-')
        expect(responseBody.lastname).toContain('Patch-')
        await appendToLogFile(LogFilePath, 'Read booking by ID Response', response.status(), responseBody)
        })



        await test.step('Delete booking by ID', async () => {
        const updateBookingResponse = await request.delete(`/booking/${createBookingResponseBody.bookingid}`, {
            headers: {'Content-Type': 'application/json',
                Cookie: `token=${createTokenResponseBody.token}`}
        })
        
        expect(updateBookingResponse.status()).toEqual(201)
        const updateBookingResponseBody = await updateBookingResponse.text()
        expect(updateBookingResponseBody).toContain('Created')
        await appendToLogFile(LogFilePath, 'Delete booking by ID Response', updateBookingResponse.status(), updateBookingResponseBody)
        })

        

        await test.step('Verify booking is deleted by ID', async () => {
        const response = await request.get(`/booking/${createBookingResponseBody.bookingid}`)

        const responseBody = await response.text()
        expect(response.status()).toEqual(404)
        await appendToLogFile(LogFilePath, 'Verify booking is deleted by ID Response', response.status(), responseBody)
        })

        await test.step('Verify booking is deleted by query parameters', async () => {
        const readAllBookingsResponse = await request.get('/booking', {
            params: {
                firstname: bookingData.firstname,
                lastname: bookingData.lastname,
            }
        })

        const readAllBookingsResponseBody = await readAllBookingsResponse.json()
        expect(readAllBookingsResponse.status()).toEqual(200)
        expect(readAllBookingsResponseBody).toEqual([])
        await appendToLogFile(LogFilePath, 'Verify booking is deleted by query parameters Response', readAllBookingsResponse.status(), readAllBookingsResponseBody)
        })

    })
})