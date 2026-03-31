package com.example.iservice;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.entity.Reguser;

public interface iservice {
	boolean login(String email, String pass);
	
	public List<Reguser> searchUsers(String keyword);
	
	public List<Reguser> getuser();
	
	public Reguser adduser(Reguser user);
	
	public Reguser updateuser(Long id, Reguser user);
	
	public void deleteuser(Long id);
	

	
	
	
}
