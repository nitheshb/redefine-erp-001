const axios = require('axios').default

export const sendWhatAppTextSms = (clientNo, msg) => {
  console.log('am i sendWhatAppTextSms')
  // const options = {
  //   method: 'POST',
  //   url: 'https://maytapi-whatsapp.p.rapidapi.com/18762/sendMessage',
  //   headers: {
  //     'content-type': 'application/json',
  //     'x-rapidapi-host': 'maytapi-whatsapp.p.rapidapi.com',
  //     'x-rapidapi-key': '0811fc4e73msh94151d212862c23p18b7d6jsn72ebd5bb0f1a',
  //   },
  //   data: {
  //     to_number: `+91${clientNo}`,
  //     type: 'text',
  //     message: msg,
  //   },
  // }

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data)
  //   })
  //   .catch(function (error) {
  //     console.error(error)
  //   })
  return
}

export const sendWhatAppTextSms1 = (clientNo, msg) => {
  console.log('am i sendWhatAppTextSms')

  const options = {
    method: 'POST',
    url: 'https://api.maytapi.com/api/d3dcc6ea-dec3-410b-8e09-f427f90e8e27/23255/sendMessage',
    headers: {
      'content-type': 'application/json',
      'x-maytapi-key': '1a3becfe-e29e-4efc-b195-e89fe1f370fd',
    },
    data: {
      to_number: `+91${clientNo}`,
      type: 'text',
      message: msg,
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export const sendWhatAppMediaSms = (clientNo) => {
  console.log('am i sendWhatAppMediaSms')
  // const options = {
  //   method: 'POST',
  //   url: 'https://maytapi-whatsapp.p.rapidapi.com/18762/sendMessage',
  //   headers: {
  //     'content-type': 'application/json',
  //     'x-rapidapi-host': 'maytapi-whatsapp.p.rapidapi.com',
  //     'x-rapidapi-key': '0811fc4e73msh94151d212862c23p18b7d6jsn72ebd5bb0f1a',
  //   },
  //   data: {
  //     to_number: `+91${clientNo}`,
  //     text: 'Broucher',
  //     type: 'media',
  //     message:
  //       'https://www.myhomeconstructions.com/brochures/My_Home_Avatar_Brochure.pdf',
  //   },
  // }

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data)
  //   })
  //   .catch(function (error) {
  //     console.error(error)
  //   })
  return
}
