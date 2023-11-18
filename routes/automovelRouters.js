const express = require('express');
const router = express.Router();
const Automovel = require('../models/automovel');

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const automoveis = await Automovel.find();
    res.json(automoveis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um contato por ID
router.get('/:id', getAutomovel, (req, res) => {
  res.json(res.automoveis);
});

// Rota para criar um novo contato
router.post('/', async (req, res) => {
  const automovel = new Automovel({
    tipoAutomovel: req.body.tipoAutomovel,
    placa: req.body.placa,
    cpfcnpj: req.body.cpfcnpj,
    status: req.body.status,
    tempoEntrada: req.body.tempoEntrada,
    data: req.body.data,
    tempoSaida: req.body.tempoSaida,
    valor: req.body.valor,
  });

  try {
    const newAutomovel = await automovel.save();
    res.status(201).json(newAutomovel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um contato por ID
router.put('/:id', getAutomovel, async (req, res) => {
  if (req.body.tipoAutomovel != null) {
    res.automovel.tipoAutomovel = req.body.tipoAutomovel;
  }
  if (req.body.placa != null) {
    res.automovel.placa = req.body.placa;
  }
  if (req.body.cpfcnpj != null) {
    res.automovel.cpfcnpj = req.body.cpfcnpj;
  }
  if (req.body.status != null) {
    res.automovel.status = req.body.status;
  }
  if (req.body.tempoEntrada != null) {
    res.automovel.tempoEntrada = req.body.tempoEntrada;
  }
    if (req.body.data != null) {
    res.automovel.data = req.body.data;
  }

  if (req.body.tempoSaida != null) {
    res.automovel.tempoSaida = req.body.tempoSaida;
  }
  if (req.body.valor != null) {
    res.automovel.valor = req.body.valor;
  }


  try {
    const updatedAutomovel = await res.automovel.save();
    res.json(updatedAutomovel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um contato por ID
router.delete('/:id', getAutomovel, async (req, res) => {
  try {
    await res.automovel.deleteOne();
    res.json({ message: ' excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAutomovel(req, res, next) {
  try {
    const automovel = await Automovel.findById(req.params.id);
    if (automovel == null) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.automovel = automovel;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
