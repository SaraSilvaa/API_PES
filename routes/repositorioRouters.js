const express = require('express');
const router = express.Router();
const Repositorio = require('../models/repositorio');

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const repositorios = await Repositorio.find();
    res.json(repositorios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um contato por ID
router.get('/:id', getRepositorio, (req, res) => {
  res.json(res.repositorio);
});

// Rota para criar um novo contato
router.post('/', async (req, res) => {
  const repositorio = new Repositorio({
    tipoAutomovel: req.body.tipoAutomovel,
    placa: req.body.placa,
    cpfcnpj: req.body.cpfcnpj,
    status: req.body.status,
    tempoEntrada: req.body.tempoEntrada,
    tempoSaida: req.body.tempoEntrada,
    valor: req.body.valor,
  });

  try {
    const newRepositorio = await repositorio.save();
    res.status(201).json(newRepositorio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um contato por ID
router.put('/:id', getRepositorio, async (req, res) => {
  if (req.body.tipoAutomovel != null) {
    res.repositorio.tipoAutomovel = req.body.tipoAutomovel;
  }
  if (req.body.placa != null) {
    res.repositorio.placa = req.body.placa;
  }
  if (req.body.cpfcnpj != null) {
    res.repositorio.cpfcnpj = req.body.cpfcnpj;
  }
  if (req.body.status != null) {
    res.repositorio.status = req.body.status;
  }
  if (req.body.tempoEntrada != null) {
    res.repositorio.tempoEntrada = req.body.tempoEntrada;
  }
  if (req.body.tempoSaida != null) {
    res.repositorio.tempoSaida = req.body.tempoSaida;
  }
  if (req.body.valor != null) {
    res.repositorio.valor = req.body.valor;
  }


  try {
    const updatedRepositorio = await res.repositorio.save();
    res.json(updatedRepositorio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um contato por ID
router.delete('/:id', getRepositorio, async (req, res) => {
  try {
    await res.repositorio.deleteOne();
    res.json({ message: ' excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRepositorio(req, res, next) {
  try {
    const repositorio = await Repositorio.findById(req.params.id);
    if (contato == null) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.repositorio = repositorio;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
