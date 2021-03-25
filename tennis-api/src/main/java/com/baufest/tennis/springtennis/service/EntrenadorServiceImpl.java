package com.baufest.tennis.springtennis.service;

import com.baufest.tennis.springtennis.dto.EntrenadorDTO;
//import com.baufest.tennis.springtennis.enums.Estado;
import com.baufest.tennis.springtennis.mapper.EntrenadorMapper;
//import com.baufest.tennis.springtennis.model.Entrenador;
//import com.baufest.tennis.springtennis.model.Partido;
import com.baufest.tennis.springtennis.repository.EntrenadorRepository;
//import com.baufest.tennis.springtennis.repository.PartidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EntrenadorServiceImpl implements EntrenadorService {
    public static final String PLAYER_WITH_ID = "Player with id = ";
    public static final String DOES_NOT_EXIST = " does not exist.";
    public static final String ALREADY_EXISTS = " already exists.";
    private final EntrenadorRepository entrenadorRepository;
    private final EntrenadorMapper entrenadorMapper;

    @Autowired
    public EntrenadorServiceImpl(EntrenadorRepository entrenadorRepository,
    		EntrenadorMapper entrenadorMapper) {
        this.entrenadorRepository = entrenadorRepository;
        this.entrenadorMapper = entrenadorMapper;
    }

    @Override
    public List<EntrenadorDTO> listAll() {
        return entrenadorRepository.findAllByOrderByNombreAsc().stream()
                .map(this.entrenadorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EntrenadorDTO getById(Long id) {
        return entrenadorRepository.findById(id).map(this.entrenadorMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException(PLAYER_WITH_ID + id + DOES_NOT_EXIST));
    }

    @Override
    public EntrenadorDTO save(EntrenadorDTO entrenador) {
        boolean exists = entrenador.getId() != null && entrenadorRepository.existsById(entrenador.getId());
        if (exists) {
            throw new IllegalArgumentException(PLAYER_WITH_ID + entrenador.getId() + ALREADY_EXISTS);
        }
        return this.entrenadorMapper.toDTO(entrenadorRepository.save(this.entrenadorMapper.fromDTO(entrenador)));
    }

    @Override
    public EntrenadorDTO update(EntrenadorDTO entrenador) {
        boolean exists = entrenadorRepository.existsById(entrenador.getId());
        if (!exists) {
            throw new NoSuchElementException(PLAYER_WITH_ID + entrenador.getId() + DOES_NOT_EXIST);
        }
        return this.entrenadorMapper.toDTO(entrenadorRepository.save(this.entrenadorMapper.fromDTO(entrenador)));
    }

    @Override
    public void delete(Long id) {
        boolean exists = entrenadorRepository.existsById(id);
        if (!exists) {
            throw new NoSuchElementException(PLAYER_WITH_ID + id + DOES_NOT_EXIST);
        }
        entrenadorRepository.deleteById(id);
    }

}
