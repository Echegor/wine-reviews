package com.archelo.wine.controller;

import com.archelo.wine.service.ImageResizerService;
import com.archelo.wine.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {

    private final StorageService storageService;
    private final ImageResizerService imageResizerService;

    @Autowired
    public ImageController(StorageService storageService, ImageResizerService imageResizerService) {
        this.storageService = storageService;
        this.imageResizerService = imageResizerService;
    }


    //TODO fix for all mediatypes
    //TODO cache images
    //TODO actually put thought into this. lol
    @RequestMapping(value = "wine/image/{imageId}",params = {"width", "height"}, method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<InputStreamResource> downloadUserAvatarImage(@PathVariable String imageId, @RequestParam int width, @RequestParam int height) {

        try{
            Resource file = storageService.loadAsResource(imageId);
            long contentLength = file.contentLength();
            MediaType contentType = MediaType.IMAGE_JPEG;
            BufferedImage image = imageResizerService.resizeImage(file,width,height);
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg", os);
            InputStream is = new ByteArrayInputStream(os.toByteArray());
//            InputStreamResource inputStreamResource = new InputStreamResource(file.getInputStream());
            InputStreamResource inputStreamResource = new InputStreamResource(is);
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
