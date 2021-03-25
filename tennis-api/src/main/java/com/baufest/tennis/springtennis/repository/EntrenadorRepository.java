package com.baufest.tennis.springtennis.repository;

import com.baufest.tennis.springtennis.model.Entrenador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntrenadorRepository extends JpaRepository<Entrenador, Long> {

    List<Entrenador> findAllByOrderByNombreAsc();

}
