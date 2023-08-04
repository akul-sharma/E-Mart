package com.assignment12.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment12.model.JwtResponse;
import com.assignment12.model.Products;
import com.assignment12.model.Reviews;
import com.assignment12.model.Users;
import com.assignment12.repo.ProductsRepo;
import com.assignment12.repo.ReviewRepo;
import com.assignment12.repo.UsersRepo;
import com.assignment12.services.CustomUserDetailsService;
import com.assignment12.util.JwtUtil;

@RestController
@CrossOrigin(origins="*")
public class MyController {
  
	@Autowired
	UsersRepo usersRepo;
	
	@Autowired
	ProductsRepo productsRepo;
	
	@Autowired
	ReviewRepo reviewsRepo;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;  
	

	
	
	//User Authenticate Api
	@PostMapping("/users")
	public ResponseEntity<?> generateToken(@RequestBody Users user) {
		
		System.out.println(user);
		
		try {
			
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserEmail(), user.getUserPassword()));
			
		}catch(UsernameNotFoundException e) {
			e.printStackTrace();
		}
		
		UserDetails userDetails= this.customUserDetailsService.loadUserByUsername(user.getUserEmail());
		
		System.out.println("User Details are: "+userDetails);
		
		String token=this.jwtUtil.generateToken(userDetails);
		
		System.out.println("JWT: "+ token);
		
		
		return ResponseEntity.ok(new JwtResponse(token));
	} 
	
	//User Registration Api
	@PostMapping("/register")
	public Users createUser(@RequestBody Users user) {
		
	    user.setUserPassword(this.bCryptPasswordEncoder.encode(user.getUserPassword()));
		user.setUserRole("USER");
		 
		
		System.out.println(user);
		
		usersRepo.save(user);
		
		return user;	
		
	}  
	
	//Get the details of the current user
	@PostMapping("/current")
	public Users getCurrentUser(@RequestBody JwtResponse obj) {
		
		
		String userEmail=this.jwtUtil.extractUsername(obj.getToken());
		System.out.println("current user is:"+userEmail); 
		
		Users user=usersRepo.findByUserEmail(userEmail);
		System.out.println(user.getFirstName()+" "+user.getLastName()+" "+user.getUserRole());
		
		return user;
	}
	
	
	//Search Api
	@PostMapping("/products")
	public Set<Products> getProducts(@RequestBody Products product)throws Exception{
		int code=product.getCode();
		String productName=product.getProductName();
		String productBrand=product.getBrand();
	//	List<Products> allProducts= new ArrayList<Products>();
		Set<Products> allProducts = new HashSet<Products>();
		
		if(code!=0)
		{
			Products tempProduct=productsRepo.findByCode(code);
			allProducts.add(tempProduct);
		}
		if(productName!="")
		{
			List<Products> listByName= productsRepo.findByProductName(productName);
			for(Products p: listByName) {
				allProducts.add(p);
			}
			
		}
		if(productBrand!="")
		{
			List<Products> listByBrand= productsRepo.findByBrand(productBrand);
			for(Products p: listByBrand) {
				allProducts.add(p);
			}			
		}
		
		
		return allProducts;
	}  
	
	
	// Get All Products Api
	@GetMapping("/products")
	public List<Products> getAllProducts(){
		return productsRepo.findAll();
	}
	
	//Get All Reviews Api
	@GetMapping("/reviews")
	public List<Reviews> getAllReviews() {
		return reviewsRepo.findAll();
	}
	
	//Post Review Api
	@PostMapping("/reviews")
	public void postReview(@RequestBody Reviews review) {
		reviewsRepo.save(review);
	}
	
	//Approve Review Api
    @PutMapping("/admin")
    public void approveReview(@RequestBody int id) { 
      Reviews review=reviewsRepo.getById(id);
      review.setApproved(true);
      reviewsRepo.save(review);
    }
	
    //Delete Review Api
    @DeleteMapping("/admin/{id}")
    public void deleteReview(@PathVariable int id) {
    	Reviews review=reviewsRepo.getById(id);
        reviewsRepo.delete(review);
    }
    
    //Stats Api
    
    @GetMapping("/ProductsCount")
    public long getProductCount() {
    	return productsRepo.count();
    }
    
    @GetMapping("/UsersCount")
    public long getUsersCount() {
    	return usersRepo.count();
    }
    
    @GetMapping("/ReviewsCount")
    public long getReviewsCount() {
    	long count=0;
    	List<Reviews> reviews=reviewsRepo.findAll();
    	for(Reviews review: reviews) {
    		if(review.isApproved()) {
    			count=count+1;
    		}
    	}
    	return count;
    }
}
