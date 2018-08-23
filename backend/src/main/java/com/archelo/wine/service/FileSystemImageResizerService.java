package com.archelo.wine.service;

import com.archelo.wine.storage.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileSystemImageResizerService implements ImageResizerService {
    private final Path rootLocation;

    @Autowired
    public FileSystemImageResizerService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    /*
    * JPG is better for pitures whereas png is better for pictures with text.
    * returns the jpg after it caches a local copy.
    * */
    @Override
    public BufferedImage resizeImage(final File imageFile, int width, int height) throws IOException {
        Image image = ImageIO.read(imageFile);
//        double aspectRatio = (double) image.getWidth(null)/(double) image.getHeight(null);
//        BufferedImage tempJPG = resizeImage(image, 100,(int) (100/aspectRatio));
        BufferedImage tempJPG = resizeImage(image, width,height);
        ImageIO.write(tempJPG, "jpg", new File("C:\\Users\\rtl1e\\IdeaProjects\\WineReviews\\backend\\images\\"+width+"x"+height + imageFile.getName()));
        return tempJPG;
    }

    /**
     * This function resize the image file and returns the BufferedImage object that can be saved to file system.
     */
    @Override
    public BufferedImage resizeImage(final Image image, int width, int height) {
        final BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        final Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.setComposite(AlphaComposite.Src);
        //below three lines are for RenderingHints for better image quality at cost of higher processing time
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION,RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        graphics2D.setRenderingHint(RenderingHints.KEY_RENDERING,RenderingHints.VALUE_RENDER_QUALITY);
        graphics2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
        graphics2D.drawImage(image, 0, 0, width, height, null);
        graphics2D.dispose();
        return bufferedImage;
    }

    @Override
    public BufferedImage resizeImage(final Resource resource, int width, int height) throws IOException{
        return resizeImage(resource.getFile(),width,height);
    }
}
