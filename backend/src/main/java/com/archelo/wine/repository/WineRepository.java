package com.archelo.wine.repository;

import com.archelo.wine.data.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//@RepositoryRestController
@RepositoryRestResource(path = "wine")
@CrossOrigin(origins = "http://localhost:4200")
public interface WineRepository extends JpaRepository<Wine,Long> {
}
