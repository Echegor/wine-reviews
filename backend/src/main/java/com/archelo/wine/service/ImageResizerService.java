package com.archelo.wine.service;

import org.springframework.core.io.Resource;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public interface ImageResizerService {
    BufferedImage resizeImage(final File filename, int width, int height) throws IOException;
    BufferedImage resizeImage(final Image image, int width, int height);
    BufferedImage resizeImage(final Resource resource, int width, int height) throws IOException;
}
