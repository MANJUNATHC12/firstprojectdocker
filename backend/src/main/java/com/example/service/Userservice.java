package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Reguser;
import com.example.iservice.iservice;
import com.example.repository.Regrepo;

@Service
public class Userservice implements iservice {
	
	@Autowired
	private Regrepo repo;

	@Override
	public boolean login(String email, String pass) {
		// TODO Auto-generated method stub
		Optional<Reguser> useropt = repo.findByEmail(email);
		
		System.out.println(useropt);
		
		if(useropt.isPresent()) {
			Reguser use = useropt.get();
			
			if(use.getPass().equals(pass)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public List<Reguser> searchUsers(String keyword) {
		// TODO Auto-generated method stub
		return repo.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
	}

	@Override
	public List<Reguser> getuser() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Reguser adduser(Reguser user) {
		// TODO Auto-generated method stub
		return repo.save(user);
	}

	@Override
	public Reguser updateuser(Long id, Reguser user) {
		// TODO Auto-generated method stub
		user.getId();
		return repo.save(user);
	}

	@Override
	public void deleteuser(Long id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}
}
