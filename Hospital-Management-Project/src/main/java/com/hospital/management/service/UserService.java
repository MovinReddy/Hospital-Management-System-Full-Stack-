package com.hospital.management.service;

import java.util.List;
import java.util.Optional;

import com.hospital.management.dao.User;
import com.hospital.management.error.GlobalException;

public interface UserService{
	public User getUserById(Integer userId);
	//public User getUserByEmail(String email);
	public Optional<User> getUserByEmail(String email);
	public List<User> getAllUsers();
	public User addUser(User user);
	public void deleteUser(Integer id);
	//public boolean authenticateUser(String email, String password);
	public List<User> addUsers(List<User> users);
	public List<User> findUsersByName(String name) throws GlobalException;
	public User findUserByEmail(String email) throws GlobalException;
	public User updateUser(Integer uid, User user) throws GlobalException;
}
