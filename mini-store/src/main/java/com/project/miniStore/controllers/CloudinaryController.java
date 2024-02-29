package com.project.miniStore.controllers;

import com.project.miniStore.services.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/cloudinary/upload")
@RequiredArgsConstructor
public class CloudinaryController {

    private final CloudinaryService cloudinaryService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("img") MultipartFile multipartFile) {
        return new ResponseEntity<>(cloudinaryService.upload(multipartFile), HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/{publicId}")
    public ResponseEntity<?> destroyImage(@PathVariable("publicId") String publicId) {
        return new ResponseEntity<>(cloudinaryService.destroy(publicId), HttpStatusCode.valueOf(200));
    }
}
