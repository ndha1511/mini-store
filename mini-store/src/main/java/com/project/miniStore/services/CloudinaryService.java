package com.project.miniStore.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public Map upload(MultipartFile file) {
        try {
            return cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Map destroy(String publicId) {
        try {
            return cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type","image"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
