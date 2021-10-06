export default (req, res) => {

  console.log(req.body.customerData)

  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'mandarina.event.app@gmail.com',
        pass: '#um@#0!D'
    }
  });

  const mailData = {
    from: 'info@toner-srbija.rs',
    to: 'zeliranje@gmail.com',
    subject: `Message From ${req.body.customerData.surname}`,
    text: req.body.customerData.name,
    html: `
      <div>
        <div style="width:90%;margin:auto;max-width:700px;">
          <h3 style="text-transform:uppercase">${'Narudžbenica #1011'}</h3>
        </div>
        <div style="width:90%;margin:auto;max-width:700px;">
            <table style="width:100%;border:1px solid rgba(0,0,0,0.2);border-radius:5px;padding:20px;color:#202124">
                  <tr>
                    <th style="text-align:left;padding-bottom:15px;color:#5f6368">PROIZVOD</th>
                    <th style="text-align:right;padding-bottom:15px;color:#5f6368">KOMADA</th>
                    <th style="text-align:right;padding-bottom:15px;color:#5f6368">CENA</th>
                    <th style="text-align:right;padding-bottom:15px;color:#5f6368">UKUPNO</th>
                  </tr>
                  
                    ${ req.body.cartState.line_items.map( item => {
                      return(
                        `<tr>
                          <td style="text-align:left;font-size:15px;font-weight:bold;">
                            ${item.name}
                          </td>
                          <td style="text-align:right;font-size:15px;font-weight:bold;">
                            ${item.quantity}
                          </td>
                          <td style="text-align:right;font-size:15px;font-weight:bold;">
                            ${item.price.formatted_with_code}
                          </td>
                          <td style="text-align:right;font-size:15px;font-weight:bold;">
                            ${item.line_total.formatted_with_code}
                          </td>
                        </tr>`
                      )
                    })}

                  <tr>
                    <th colspan=3 style="text-align:right;padding-top:25px;color:#5f6368">
                        TOTAL
                    </th>
                    <td style="text-align:right;padding-top:25px;font-size:15px;font-weight:bold;">
                      ${req.body.cartState.subtotal.formatted_with_code}
                    </td>
                  </tr>
              </table>
          </div>
          <div style="margin:auto;margin-top:20px;width:90%;max-width:700px">
            <div style="border:1px solid rgba(0,0,0,0.2);border-radius:5px;padding:20px;color:#202124;">
                <div style="display:flex;">
                  <p style="color:#5f6368;font-size:15px;">Ime i prezime</p>
                  <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.name} ${req.body.customerData.surname}</p>
                </div>
                <div style="display:flex;">
                  <p style="color:#5f6368;font-size:15px;">Email</p>
                  <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.email}</p>
                </div>
                <div style="display:flex;">
                  <p style="color:#5f6368;font-size:15px;">Telefon</p>
                  <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.phone}</p>
                </div>
                <div style="display:flex;">
                  <p style="color:#5f6368;font-size:15px;">Poštanski broj</p>
                  <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.postalCode}</p>
                </div>
                <div style="display:flex;">
                  <p style="color:#5f6368;font-size:15px;">Grad</p>
                  <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.city}</p>
                </div>
                <div style="display:flex;">
                  <p style="color:#5f6368;font-size:15px;">Adresa</p>
                  <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.address} ${req.body.customerData.apartment}</p>
                </div>
                ${ req.body.customerData.invoiceType === 2 ? `<div style="display:flex;"><p style="color:#5f6368;font-size:15px;">Naziv firme</p>
                    <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.companyName}</p>
                  </div>
                  <div style="display:flex;">
                    <p style="color:#5f6368;font-size:15px;">Poreski identifiacioni broj (PIB)</p>
                    <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.companyPib}</p>
                  </div>
                  <div style="display:flex;">
                    <p style="color:#5f6368;font-size:15px;">Matični broj firme</p>
                    <p style="margin-left:10px;font-size:15px;font-weight:bold;">${req.body.customerData.companyNumber}</p></div>` : `` 
                }
            </div>
          </div>
      </div>
    `
  }

  transporter.sendMail( mailData, function (err, info) {
    if(err)
      res.status(200).json({ success: false, message: err })
    else
      res.status(200).json({ success: true, message: info })
  })

}
