const mongoose = require('mongoose');

const automovelSchema = new mongoose.Schema({
  tipoAutomovel: {
    type: String,
    required: true,
  },
  placa: {
    type: String,
    required: true,
  },
  cpfcnpj: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tempoEntrada: {
    type: String,
    required: true,
  },
    Data: {
    type: String,
    required: true,
  },
  tempoSaida: {
    type: String,
    required: false,
  },
  valor: {
    type: String,
    required: false,
  },
});

const Automovel = mongoose.model('automoveis', automovelSchema);

module.exports = Automovel;
