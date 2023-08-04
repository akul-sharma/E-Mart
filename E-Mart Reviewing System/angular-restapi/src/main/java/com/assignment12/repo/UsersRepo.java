package com.assignment12.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment12.model.Users;

public interface UsersRepo extends JpaRepository<Users,String>{

	Users findByUserEmail(String userEmail);
	
}
