package com.assignment12.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment12.model.Reviews;

public interface ReviewRepo extends JpaRepository<Reviews, Integer> {
	

}
