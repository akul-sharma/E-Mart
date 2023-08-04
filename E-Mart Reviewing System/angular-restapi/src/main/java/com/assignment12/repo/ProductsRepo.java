package com.assignment12.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment12.model.Products;

public interface ProductsRepo extends JpaRepository<Products,Integer>{

	List<Products> findByBrand(String brand);
	
	List<Products> findByProductName(String productName);
	
	Products findByCode(int code);
}
