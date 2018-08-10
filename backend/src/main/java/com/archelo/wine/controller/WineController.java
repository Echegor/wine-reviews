package com.archelo.wine.controller;

import com.archelo.wine.repository.WineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WineController {

    private final WineRepository wineRepository;

    @Autowired
    public WineController(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }
}
