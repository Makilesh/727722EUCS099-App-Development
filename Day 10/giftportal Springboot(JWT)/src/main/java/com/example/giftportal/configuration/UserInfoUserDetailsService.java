//UserInfoUserDetailsService.java

package com.example.giftportal.configuration;
 
import com.example.giftportal.model.User;
import com.example.giftportal.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

// import java.util.List;
import java.util.Optional;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userInfo = repository.findByEmail(username);
        User user = repository.findByEmail(username).orElse(null);
        UserDetails ud = userInfo.map(UserInfoUserDetails::new)
        .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));
        return ud;
    }

    
}