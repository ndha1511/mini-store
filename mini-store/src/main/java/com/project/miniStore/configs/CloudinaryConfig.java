package com.project.miniStore.configs;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary getCloudinary() {

        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "ddzibjsaq",
                "api_key", "927611914839725",
                "api_secret", "uwkT7hdzAbkNGble5b644otd3Pk",
                "secure", true));

    }
}
