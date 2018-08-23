package com.archelo.wine.controller;

import com.archelo.wine.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {

    private final StorageService storageService;

    @Autowired
    public ImageController(StorageService storageService) {
        this.storageService = storageService;
    }


    //TODO fix for all mediatypes
    @RequestMapping(value = "wine/image/{imageId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<InputStreamResource> downloadUserAvatarImage(@PathVariable String imageId) {
        try{
            Resource file = storageService.loadAsResource(imageId);
            long contentLength = file.contentLength();
            MediaType contentType = MediaType.IMAGE_JPEG;
            InputStreamResource inputStreamResource = new InputStreamResource(file.getInputStream());
            return ResponseEntity.ok()
                    .contentLength(contentLength)
                    .contentType(contentType)
                    .body(inputStreamResource);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
