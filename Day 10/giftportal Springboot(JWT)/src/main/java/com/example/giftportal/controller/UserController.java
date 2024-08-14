package com.example.giftportal.controller;


import com.example.giftportal.dto.AuthRequest;
import com.example.giftportal.model.User;
import com.example.giftportal.repository.UserRepository;
import com.example.giftportal.service.JwtService;
import com.example.giftportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // @PostMapping("/register")
    // public User createUser(@RequestBody User user) {
    //     return userService.createUser(user);
    // }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            User stu = userRepository.findByEmail(authRequest.getUsername()).orElse(null);
            if (stu == null) {
                return ResponseEntity.status(404).body("User not found!");  
            }
            String password = stu.getPassword();
            try{
                Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
                System.out.println(authentication);
                if (passwordEncoder.matches(authRequest.getPassword(), password)) {
                    String token = jwtService.generateToken(authRequest.getUsername());
                    return ResponseEntity.ok(token);
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials!");  
                }
            }
            catch(org.springframework.security.core.userdetails.UsernameNotFoundException e){
                return ResponseEntity.status(400).body("Invalid credentials!");  

            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("There was an error processing your request!");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User loginRequest) {
        User user = new User();
        user.setEmail(loginRequest.getEmail());
        user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        user.setRoles("user");
        user.setName(loginRequest.getName());
        User savedLogin = userService.createUser(user);
        return ResponseEntity.ok(savedLogin);
    }

}
