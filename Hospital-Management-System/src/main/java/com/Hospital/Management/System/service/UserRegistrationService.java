package com.Hospital.Management.System.service;

import com.Hospital.Management.System.entity.User;
import com.Hospital.Management.System.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserRegistrationService {

    @Autowired
    private UserRepository userRepository;

    // CREATE
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // READ - All
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // READ - By ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // UPDATE
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            user.setGender(updatedUser.getGender());
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // DELETE
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
