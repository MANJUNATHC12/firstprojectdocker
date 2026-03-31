package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Reguser;

public interface Regrepo extends JpaRepository<Reguser, Long>{
	
	Optional<Reguser> findByEmail(String email);
	
	List<Reguser> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
	
	List<Reguser> findAll();
}
