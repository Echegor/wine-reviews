package com.archelo.wine.controller;

import com.archelo.wine.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {

    private final StorageService storageService;

    @Autowired
    public ImageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @RequestMapping(value = "user/avatar/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<InputStreamResource> downloadUserAvatarImage(@PathVariable Long userId) {
//        GridFSDBFile gridFsFile = fileService.findUserAccountAvatarById(userId);
//
//        return ResponseEntity.ok()
//                .contentLength(gridFsFile.getLength())
//                .contentType(MediaType.parseMediaType(gridFsFile.getContentType()))
//                .body(new InputStreamResource(gridFsFile.getInputStream()));

        return null;
    }

}
