export function createTokenPayload(username: string, password: string) {
    return {
        "username" : username,
        "password" : password
    }
}

export function createBookingPayload(data: any) {
  return {
    firstname: data.firstname,
    lastname: data.lastname,
    totalprice: data.totalprice,
    depositpaid: data.depositpaid,
    bookingdates: data.bookingdates,
    additionalneeds: data.additionalneeds,
  }
}

export function updateBookingPayload(data: any) {
  return {
    firstname: `Updated-${data.firstname}`,
    lastname: `Updated-${data.lastname}`,
    totalprice: data.totalprice - 500,
    depositpaid: !data.depositpaid,
    bookingdates: data.bookingdates,
    additionalneeds: `Updated-${data.additionalneeds}`,
  }
}

export function partialUpdateBookingPayload(data: any) {
  return {
    firstname: `Patch-${data.firstname}`,
    lastname: `Patch-${data.lastname}`
  }
}

