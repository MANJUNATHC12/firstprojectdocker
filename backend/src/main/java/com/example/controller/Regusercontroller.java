package com.example.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Reguser;
import com.example.iservice.iservice;
import com.example.repository.Regrepo;
import com.example.service.Userservice;

@RestController

@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/Register")
public class Regusercontroller {
	
	@Autowired
	private iservice ser;
	
	@GetMapping
	public List<Reguser> getuser(){
		return ser.getuser(); 
	}
	
	@PostMapping
	public Reguser adduser(@RequestBody Reguser user) {
		System.out.println(user.getEmail());
		return ser.adduser(user);
	}
	
	@PutMapping("/{id}")
	public Reguser updateuser(@PathVariable Long id, @RequestBody Reguser user) {
		System.out.println(user.getEmail());
		user.setId(id);
		return ser.updateuser(id, user);
	}
	
	@DeleteMapping("/{id}")
	public void deleteuser(@PathVariable Long id) {
		ser.deleteuser(id);
	}
	
	@GetMapping("/Login")
	public boolean login(@RequestParam String email, @RequestParam String pass) {
		return ser.login(email, pass);
	}
	
	
	@GetMapping("/search")
	public List<Reguser> searchUsers(String keyword){
		return ser.searchUsers(keyword);
	}	
}
