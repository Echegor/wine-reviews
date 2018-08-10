package com.archelo.wine.repository;

import com.archelo.wine.data.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface WineRepository extends JpaRepository<Wine,Long> {
}
