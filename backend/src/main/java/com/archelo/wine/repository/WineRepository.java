package com.archelo.wine.repository;

import com.archelo.wine.data.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestController
@CrossOrigin(origins = "http://localhost:4200")
public interface WineRepository extends JpaRepository<Wine,Long> {
}
