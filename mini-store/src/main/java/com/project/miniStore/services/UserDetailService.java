package com.project.miniStore.services;

import com.project.miniStore.configs.UserDetailConfig;
import com.project.miniStore.models.User;
import com.project.miniStore.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByPhoneNumber(username);
        return user.map(UserDetailConfig::new).orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }
}
