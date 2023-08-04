package com.assignment12.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.assignment12.config.UserPrincipal;
import com.assignment12.model.Users;
import com.assignment12.repo.UsersRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UsersRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		
	    Users user=userRepo.findByUserEmail(userEmail);
	    if(user==null)
	    	throw new UsernameNotFoundException("User not found");
	    
	    return new UserPrincipal(user);
	    
	    
		
		/*	if(userEmail.equals("akulsharma.sharma@gmail.com"))
		{
			return new User("akulsharma.sharma@gmail.com","Akul@123",new ArrayList<>());
		}else {
			throw new UsernameNotFoundException("User not found");
		}  */
	} 
	
	
	

	
}
