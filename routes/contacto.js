var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto');
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tema = req.body.tema;
  var mensaje = req.body.mensaje

  var obj = {
    to: 'martin.n.petterson@gmail.com',
    subject: 'Contacto desde Z computacion',
    html: nombre + " se contacto a traves de la pagina web y quiere mas infomacion a este correo: " + email + " Sobre el siguiente tema: " + tema + "<br> Mensaje: " + mensaje  }

  var transport = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS,
    }

  });
  var info = await transport.sendMail(obj);

  res.render('contacto', {
    message: 'Su mensaje ha sido enviado corectamente'
  });
});

module.exports = router;

