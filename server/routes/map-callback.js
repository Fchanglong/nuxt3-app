export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    console.log('接收到地圖服務數據:', body)
    
    // 構建重定向 URL，包含所有參數
    const params = new URLSearchParams({
      storeid: body.storeid || '',
      storename: body.storename || '',
      storeaddress: body.storeaddress || '',
      outside: body.outside || '',
      ship: body.ship || '',
      TempVar: body.TempVar || '',
      fromMap: 'true'
    })
    
    const redirectUrl = `/cart?${params.toString()}`
    return sendRedirect(event, redirectUrl)
    
  } catch (error) {
    console.error('處理地圖服務回調時出錯:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})